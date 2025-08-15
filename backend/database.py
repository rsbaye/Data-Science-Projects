from motor.motor_asyncio import AsyncIOMotorClient
import os
from models import *

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

class DatabaseManager:
    def __init__(self):
        self.db = db
    
    # Company Info
    async def get_company_info(self):
        company = await self.db.company_info.find_one()
        if company:
            return CompanyInfo(**company)
        return None
    
    async def create_company_info(self, company_data: CompanyInfo):
        result = await self.db.company_info.insert_one(company_data.dict())
        return result.inserted_id
    
    # Services
    async def get_services(self):
        services = await self.db.services.find().to_list(100)
        return [Service(**service) for service in services]
    
    async def create_service(self, service_data: Service):
        result = await self.db.services.insert_one(service_data.dict())
        return result.inserted_id
    
    # Team Members
    async def get_team_members(self):
        members = await self.db.team_members.find().to_list(100)
        return [TeamMember(**member) for member in members]
    
    async def create_team_member(self, member_data: TeamMember):
        result = await self.db.team_members.insert_one(member_data.dict())
        return result.inserted_id
    
    # Industries
    async def get_industries(self):
        industries = await self.db.industries.find().to_list(100)
        return [Industry(**industry) for industry in industries]
    
    async def create_industry(self, industry_data: Industry):
        result = await self.db.industries.insert_one(industry_data.dict())
        return result.inserted_id
    
    # Case Studies
    async def get_case_studies(self):
        cases = await self.db.case_studies.find().to_list(100)
        return [CaseStudy(**case) for case in cases]
    
    async def create_case_study(self, case_data: CaseStudy):
        result = await self.db.case_studies.insert_one(case_data.dict())
        return result.inserted_id
    
    # Testimonials
    async def get_testimonials(self):
        testimonials = await self.db.testimonials.find().to_list(100)
        return [Testimonial(**testimonial) for testimonial in testimonials]
    
    async def create_testimonial(self, testimonial_data: Testimonial):
        result = await self.db.testimonials.insert_one(testimonial_data.dict())
        return result.inserted_id
    
    # Job Openings
    async def get_job_openings(self, active_only: bool = True):
        query = {"isActive": True} if active_only else {}
        jobs = await self.db.job_openings.find(query).to_list(100)
        return [JobOpening(**job) for job in jobs]
    
    async def create_job_opening(self, job_data: JobOpening):
        result = await self.db.job_openings.insert_one(job_data.dict())
        return result.inserted_id
    
    # Blog Posts
    async def get_blog_posts(self, published_only: bool = True):
        query = {"isPublished": True} if published_only else {}
        posts = await self.db.blog_posts.find(query).sort("publishedAt", -1).to_list(100)
        return [BlogPost(**post) for post in posts]
    
    async def create_blog_post(self, post_data: BlogPost):
        result = await self.db.blog_posts.insert_one(post_data.dict())
        return result.inserted_id
    
    # Contact Submissions
    async def create_contact_submission(self, submission_data: ContactSubmissionCreate):
        contact = ContactSubmission(**submission_data.dict())
        result = await self.db.contact_submissions.insert_one(contact.dict())
        return result.inserted_id
    
    async def get_contact_submissions(self):
        submissions = await self.db.contact_submissions.find().sort("submittedAt", -1).to_list(100)
        return [ContactSubmission(**submission) for submission in submissions]
    
    # Newsletter Subscriptions
    async def create_newsletter_subscription(self, subscription_data: NewsletterSubscriptionCreate):
        # Check if email already exists
        existing = await self.db.newsletter_subscriptions.find_one({"email": subscription_data.email})
        if existing:
            return None  # Already subscribed
        
        subscription = NewsletterSubscription(**subscription_data.dict())
        result = await self.db.newsletter_subscriptions.insert_one(subscription.dict())
        return result.inserted_id
    
    async def get_newsletter_subscriptions(self):
        subscriptions = await self.db.newsletter_subscriptions.find({"isActive": True}).to_list(1000)
        return [NewsletterSubscription(**sub) for sub in subscriptions]

# Global database manager instance
db_manager = DatabaseManager()