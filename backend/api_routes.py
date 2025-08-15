from fastapi import APIRouter, HTTPException
from database import db_manager
from models import ContactSubmissionCreate, NewsletterSubscriptionCreate
from typing import List
import logging

logger = logging.getLogger(__name__)

# Create API router
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {"message": "Evidentia Research Consultancy API", "version": "1.0.0"}

@api_router.get("/company")
async def get_company_info():
    """Get company information including mission, vision, values, and stats"""
    try:
        company = await db_manager.get_company_info()
        if not company:
            raise HTTPException(status_code=404, detail="Company information not found")
        return company
    except Exception as e:
        logger.error(f"Error fetching company info: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/services")
async def get_services():
    """Get all available services"""
    try:
        services = await db_manager.get_services()
        return services
    except Exception as e:
        logger.error(f"Error fetching services: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/team")
async def get_team_members():
    """Get all team members"""
    try:
        team = await db_manager.get_team_members()
        return team
    except Exception as e:
        logger.error(f"Error fetching team members: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/industries")
async def get_industries():
    """Get all industries served"""
    try:
        industries = await db_manager.get_industries()
        return industries
    except Exception as e:
        logger.error(f"Error fetching industries: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/case-studies")
async def get_case_studies():
    """Get all case studies"""
    try:
        cases = await db_manager.get_case_studies()
        return cases
    except Exception as e:
        logger.error(f"Error fetching case studies: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/testimonials")
async def get_testimonials():
    """Get all client testimonials"""
    try:
        testimonials = await db_manager.get_testimonials()
        return testimonials
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/jobs")
async def get_job_openings():
    """Get all active job openings"""
    try:
        jobs = await db_manager.get_job_openings(active_only=True)
        return jobs
    except Exception as e:
        logger.error(f"Error fetching job openings: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/insights")
async def get_blog_posts():
    """Get all published blog posts/insights"""
    try:
        posts = await db_manager.get_blog_posts(published_only=True)
        return posts
    except Exception as e:
        logger.error(f"Error fetching blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/contact")
async def submit_contact_form(submission: ContactSubmissionCreate):
    """Submit a contact form"""
    try:
        result = await db_manager.create_contact_submission(submission)
        if result:
            return {"success": True, "message": "Contact form submitted successfully", "id": str(result)}
        else:
            raise HTTPException(status_code=400, detail="Failed to submit contact form")
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.post("/newsletter")
async def subscribe_newsletter(subscription: NewsletterSubscriptionCreate):
    """Subscribe to newsletter"""
    try:
        result = await db_manager.create_newsletter_subscription(subscription)
        if result:
            return {"success": True, "message": "Successfully subscribed to newsletter"}
        else:
            return {"success": False, "message": "Email already subscribed"}
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

# Admin endpoints (for future use)
@api_router.get("/admin/contacts")
async def get_contact_submissions():
    """Get all contact form submissions (admin only)"""
    try:
        submissions = await db_manager.get_contact_submissions()
        return submissions
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/admin/newsletter")
async def get_newsletter_subscriptions():
    """Get all newsletter subscriptions (admin only)"""
    try:
        subscriptions = await db_manager.get_newsletter_subscriptions()
        return subscriptions
    except Exception as e:
        logger.error(f"Error fetching newsletter subscriptions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")