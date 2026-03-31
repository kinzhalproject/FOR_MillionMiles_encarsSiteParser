"""Standalone scraper script — exports cars.json for the frontend.

Usage:
    python export_cars.py

Outputs:
    frontend/public/data/cars.json
"""

import asyncio
import json
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).parent / "backend"))

from app.scraper.encar import fetch_cars  # noqa: E402
from app.translations import format_price_krw  # noqa: E402


async def main():
    print("Fetching cars from Encar...")
    cars = await fetch_cars()
    print(f"Fetched {len(cars)} cars")

    # Add price_display
    for car in cars:
        car["price_display"] = format_price_krw(car["price"])

    output_dir = Path(__file__).parent / "frontend" / "public" / "data"
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / "cars.json"

    payload = {
        "count": len(cars),
        "cars": cars,
    }

    output_file.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Exported {len(cars)} cars to {output_file}")


if __name__ == "__main__":
    asyncio.run(main())
