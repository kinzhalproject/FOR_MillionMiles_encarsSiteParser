"""Async SQLAlchemy engine & session factory (SQLite)."""

from pathlib import Path

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

# Ensure data directory exists for SQLite file
_db_path = settings.DATABASE_URL.replace("sqlite+aiosqlite:///", "")
Path(_db_path).parent.mkdir(parents=True, exist_ok=True)

engine = create_async_engine(settings.DATABASE_URL, echo=False)
async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def init_db() -> None:
    """Create all tables if they don't exist (used on startup)."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_db() -> AsyncSession:  # type: ignore[misc]
    async with async_session() as session:
        yield session
