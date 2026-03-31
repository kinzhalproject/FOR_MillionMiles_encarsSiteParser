"""FastAPI application entry point."""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger

from app.cache import cache_delete_pattern
from app.config import settings
from app.database import init_db
from app.routers.cars import router as cars_router
from app.scraper.encar import scrape_and_save

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()


async def _scheduled_scrape():
    """Scheduled scrape job — fetch + upsert + bust cache."""
    try:
        count = await scrape_and_save()
        await cache_delete_pattern("cars:*")
        logger.info("Scheduled scrape done: %d cars", count)
    except Exception:
        logger.exception("Scheduled scrape failed")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting up — init DB + scheduling daily scrape every %d hours", settings.SCRAPE_INTERVAL_HOURS)
    await init_db()

    scheduler.add_job(
        _scheduled_scrape,
        trigger=IntervalTrigger(hours=settings.SCRAPE_INTERVAL_HOURS),
        id="daily_scrape",
        replace_existing=True,
    )
    scheduler.start()

    # Run initial scrape in background
    try:
        await scrape_and_save()
    except Exception:
        logger.exception("Initial scrape failed — will retry on next schedule")

    yield

    # Shutdown
    scheduler.shutdown(wait=False)
    logger.info("Shutdown complete")


app = FastAPI(
    title="Encar Catalog API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cars_router)


@app.get("/health")
async def health():
    return {"status": "ok"}
