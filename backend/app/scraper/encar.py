"""ENCAR.com scraper — fetches listings via public API, parses with BS4 fallback."""

import json
import logging
from datetime import datetime, timezone

import httpx
from bs4 import BeautifulSoup
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import async_session
from app.models import Car
from app.translations import (
    parse_year,
    translate_fuel,
    translate_manufacturer,
    translate_transmission,
)

logger = logging.getLogger(__name__)

ENCAR_API_URL = "http://api.encar.com/search/car/list/general"
ENCAR_PHOTO_BASE = "https://ci.encar.com/carpicture"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    ),
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Referer": "https://www.encar.com/",
}

DEFAULT_PARAMS = {
    "count": "true",
    "q": "(And.Hidden.N._.CarType.Y.)",
    "sr": "|ModifiedDate|0|200",
    "inav": "|Metadata|Sort",
}


def _photo_url(path: str | None) -> str | None:
    if not path:
        return None
    p = path.strip()
    if p.startswith("http"):
        url = p
    else:
        url = f"{ENCAR_PHOTO_BASE}{p}"
    # Encar photo URLs end with "ID_" — append "001.jpg" for the main photo
    if url.endswith("_"):
        url += "001.jpg"
    return url


def _parse_car(raw: dict) -> dict:
    """Extract fields from a single API result item."""
    return {
        "id": raw.get("Id"),
        "manufacturer": translate_manufacturer(raw.get("Manufacturer", "")),
        "model": raw.get("Model", ""),
        "badge": raw.get("Badge", ""),
        "badge_detail": raw.get("BadgeDetail", ""),
        "year": parse_year(raw.get("Year", 0)),
        "mileage": raw.get("Mileage", 0),
        "price": raw.get("Price", 0),
        "fuel": translate_fuel(raw.get("FuelType", "")),
        "transmission": translate_transmission(raw.get("Transmission", "")),
        "photo": _photo_url(raw.get("Photo")),
        "url": f"https://www.encar.com/dc/dc_cardetailview.do?carid={raw.get('Id', '')}",
    }


def _parse_html_fallback(html: str) -> list[dict]:
    """Fallback: parse HTML search results with BeautifulSoup."""
    soup = BeautifulSoup(html, "html.parser")
    cars: list[dict] = []

    for item in soup.select("tr.search_result, div.search_item, li.car_item"):
        try:
            title_el = item.select_one(".title, .car_name, .tit")
            price_el = item.select_one(".price, .prc")
            img_el = item.select_one("img")

            title = title_el.get_text(strip=True) if title_el else "Unknown"
            price_text = price_el.get_text(strip=True) if price_el else "0"
            price_num = int("".join(c for c in price_text if c.isdigit()) or "0")
            photo = img_el.get("src") or img_el.get("data-src") if img_el else None

            cars.append({
                "id": hash(title + str(price_num)) & 0x7FFFFFFF,
                "manufacturer": title.split()[0] if title else "",
                "model": " ".join(title.split()[1:]) if title else "",
                "badge": "",
                "badge_detail": "",
                "year": 0,
                "mileage": 0,
                "price": price_num,
                "fuel": "",
                "transmission": "",
                "photo": photo,
                "url": "",
            })
        except Exception:
            continue

    return cars


async def fetch_cars() -> list[dict]:
    """Fetch car listings from ENCAR API."""
    page_size = settings.SCRAPE_PAGE_SIZE
    max_pages = settings.SCRAPE_MAX_PAGES
    cars: list[dict] = []

    async with httpx.AsyncClient(headers=HEADERS, timeout=30.0, follow_redirects=True) as client:
        for page in range(max_pages):
            offset = page * page_size
            params = {
                **DEFAULT_PARAMS,
                "sr": f"|ModifiedDate|{offset}|{page_size}",
            }
            try:
                resp = await client.get(ENCAR_API_URL, params=params)
                resp.raise_for_status()
                data = resp.json()
            except httpx.HTTPError as exc:
                logger.error("HTTP error on page %d: %s", page, exc)
                break
            except json.JSONDecodeError:
                # Fallback to HTML parsing
                logger.warning("JSON decode failed on page %d, trying HTML parse", page)
                cars.extend(_parse_html_fallback(resp.text))
                break

            results = data.get("SearchResults", [])
            if not results:
                break

            for item in results:
                cars.append(_parse_car(item))

            total = data.get("Count", 0)
            if offset + page_size >= total:
                break

            logger.info("Page %d done (%d cars)", page + 1, len(cars))

    logger.info("Total fetched: %d cars", len(cars))
    return cars


async def upsert_cars(session: AsyncSession, cars: list[dict]) -> int:
    """Upsert cars into SQLite via merge (select + insert/update)."""
    if not cars:
        return 0

    now = datetime.now(timezone.utc)

    for car_data in cars:
        car_id = car_data["id"]
        result = await session.execute(select(Car).where(Car.id == car_id))
        existing = result.scalar_one_or_none()

        if existing:
            for key, value in car_data.items():
                if key not in ("id", "created_at"):
                    setattr(existing, key, value)
            existing.updated_at = now
        else:
            car_data["created_at"] = now
            car_data["updated_at"] = now
            session.add(Car(**car_data))

    await session.commit()
    return len(cars)


async def scrape_and_save() -> int:
    """Full scrape cycle: fetch → upsert into DB."""
    cars = await fetch_cars()
    async with async_session() as session:
        count = await upsert_cars(session, cars)
    logger.info("Scrape complete: %d cars upserted", count)
    return count
