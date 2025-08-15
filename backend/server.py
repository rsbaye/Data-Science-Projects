from fastapi import FastAPI
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
import os
import logging
from pathlib import Path
from api_routes import api_router

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Create the main app
app = FastAPI(
    title="Evidentia Research Consultancy API",
    description="Backend API for Evidentia Research Consultancy website",
    version="1.0.0"
)

# Include the API router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    logger.info("🚀 Evidentia API server starting up...")
    
    # Seed database on startup
    try:
        from seed_data import seed_database
        await seed_database()
        logger.info("✅ Database seeded successfully")
    except Exception as e:
        logger.error(f"❌ Error seeding database: {str(e)}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("🛑 Evidentia API server shutting down...")
    from database import client
    client.close()