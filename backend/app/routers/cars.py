"""Cars API router — paginated list with filtering, sorting, caching."""

import hashlib
import logging

from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.cache import cache_delete_pattern, cache_get, cache_set
from app.database import get_db
from app.models import Car
from app.schemas import CarOut, CarsResponse, ScrapeResponse
from app.scraper.encar import scrape_and_save
from app.translations import format_price_krw

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["cars"])


def _car_to_out(car: Car) -> CarOut:
    return CarOut(
        id=car.id,
        manufacturer=car.manufacturer,
        model=car.model,
        badge=car.badge,
        badge_detail=car.badge_detail,
        year=car.year,
        mileage=car.mileage,
        price=car.price,
        price_display=format_price_krw(car.price),
        fuel=car.fuel,
        transmission=car.transmission,
        photo=car.photo,
        url=car.url,
        updated_at=car.updated_at,
    )


@router.get("/cars", response_model=CarsResponse)
async def list_cars(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    search: str = Query("", max_length=120),
    sort: str = Query("price_asc"),
    year_from: int = Query(0, ge=0),
    year_to: int = Query(0, ge=0),
    price_from: int = Query(0, ge=0),
    price_to: int = Query(0, ge=0),
    db: AsyncSession = Depends(get_db),
):
    # Build cache key
    raw_key = f"cars:{page}:{limit}:{search}:{sort}:{year_from}:{year_to}:{price_from}:{price_to}"
    cache_key = "cars:" + hashlib.md5(raw_key.encode()).hexdigest()

    cached = await cache_get(cache_key)
    if cached:
        return CarsResponse(**cached)

    # Build query
    query = select(Car)

    if search:
        pattern = f"%{search}%"
        query = query.where(
            Car.manufacturer.ilike(pattern)
            | Car.model.ilike(pattern)
            | Car.badge.ilike(pattern)
        )

    if year_from:
        query = query.where(Car.year >= year_from)
    if year_to:
        query = query.where(Car.year <= year_to)
    if price_from:
        query = query.where(Car.price >= price_from)
    if price_to:
        query = query.where(Car.price <= price_to)

    # Count
    count_q = select(func.count()).select_from(query.subquery())
    total = (await db.execute(count_q)).scalar() or 0

    # Sort
    sort_map = {
        "price_asc": Car.price.asc(),
        "price_desc": Car.price.desc(),
        "year_desc": Car.year.desc(),
        "year_asc": Car.year.asc(),
        "mileage_asc": Car.mileage.asc(),
    }
    order = sort_map.get(sort, Car.price.asc())
    query = query.order_by(order)

    # Paginate
    offset = (page - 1) * limit
    query = query.offset(offset).limit(limit)

    result = await db.execute(query)
    cars = [_car_to_out(c) for c in result.scalars().all()]

    response = CarsResponse(total=total, page=page, limit=limit, cars=cars)

    # Cache
    await cache_set(cache_key, response.model_dump())

    return response


@router.post("/scrape", response_model=ScrapeResponse)
async def trigger_scrape():
    """Manually trigger a scrape cycle."""
    count = await scrape_and_save()
    await cache_delete_pattern("cars:*")
    return ScrapeResponse(status="ok", count=count)
