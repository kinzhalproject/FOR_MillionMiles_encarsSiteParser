"""SQLAlchemy ORM models."""

from datetime import datetime, timezone

from sqlalchemy import DateTime, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Car(Base):
    __tablename__ = "cars"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    manufacturer: Mapped[str] = mapped_column(String(128), index=True, default="")
    model: Mapped[str] = mapped_column(String(128), index=True, default="")
    badge: Mapped[str] = mapped_column(String(128), default="")
    badge_detail: Mapped[str] = mapped_column(String(256), default="")
    year: Mapped[int] = mapped_column(Integer, index=True, default=0)
    mileage: Mapped[int] = mapped_column(Integer, default=0)
    price: Mapped[int] = mapped_column(Integer, index=True, default=0)
    fuel: Mapped[str] = mapped_column(String(64), default="")
    transmission: Mapped[str] = mapped_column(String(64), default="")
    photo: Mapped[str | None] = mapped_column(Text, nullable=True)
    url: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
