from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime
import uuid


# Database Models
class Value(BaseModel):
    title: str
    description: str

class Stats(BaseModel):
    projects: int
    clients: int
    countries: int
    teamMembers: int
    yearsExperience: int

class CompanyInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    tagline: str
    mission: str
    vision: str
    culture: str
    values: List[Value]
    stats: Stats
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class Service(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    icon: str
    features: List[str]
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class TeamMember(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    position: str
    bio: str
    image: str
    expertise: List[str]
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class Industry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    projects: int
    image: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class CaseStudy(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    sector: str
    description: str
    impact: str
    duration: str
    image: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    quote: str
    author: str
    position: str
    organization: str
    image: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class JobOpening(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    department: str
    location: str
    type: str
    experience: str
    description: str
    requirements: List[str] = []
    isActive: bool = True
    createdAt: datetime = Field(default_factory=datetime.utcnow)

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str = ""
    author: str
    category: str
    readTime: str
    image: str
    publishedAt: datetime = Field(default_factory=datetime.utcnow)
    isPublished: bool = True

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    organization: Optional[str] = None
    inquiryType: str
    message: str
    status: str = "new"
    submittedAt: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribedAt: datetime = Field(default_factory=datetime.utcnow)
    isActive: bool = True


# Request Models
class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    organization: Optional[str] = None
    inquiryType: str
    message: str

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr