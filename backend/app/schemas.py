"""Pydantic schemas for request/response validation."""

from datetime import datetime

from pydantic import BaseModel


class CarOut(BaseModel):
    id: int
    manufacturer: str
    model: str
    badge: str
    badge_detail: str
    year: int
    mileage: int
    price: int
    price_display: str
    fuel: str
    transmission: str
    photo: str | None
    url: str
    updated_at: datetime

    model_config = {"from_attributes": True}


class CarsResponse(BaseModel):
    total: int
    page: int
    limit: int
    cars: list[CarOut]


class ScrapeResponse(BaseModel):
    status: str
    count: int
