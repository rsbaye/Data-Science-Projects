# Evidentia Research Consultancy - Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for transforming the frontend mock data into a fully functional backend system.

## Current Mock Data Structure (frontend/src/mock.js)
- Company information (mission, vision, values)
- Services (6 research services with descriptions and features)
- Team members (4 leadership profiles)
- Industries (4 sectors with project counts)
- Case studies (3 featured projects)
- Testimonials (3 client testimonials)
- Job openings (3 career positions)
- Insights/Blog posts (3 articles)
- Contact information and company stats

## Required Database Models

### 1. Company Information
```
- mission: String
- vision: String  
- culture: String
- values: Array of {title, description}
- stats: {projects, clients, countries, teamMembers, yearsExperience}
```

### 2. Services
```
- title: String
- description: String
- icon: String
- features: Array of Strings
- createdAt: Date
```

### 3. Team Members
```
- name: String
- position: String
- bio: String
- image: String (URL)
- expertise: Array of Strings
- createdAt: Date
```

### 4. Industries
```
- name: String
- description: String
- projects: Number
- image: String (URL)
- createdAt: Date
```

### 5. Case Studies
```
- title: String
- sector: String
- description: String
- impact: String
- duration: String
- image: String (URL)
- createdAt: Date
```

### 6. Testimonials
```
- quote: String
- author: String
- position: String
- organization: String
- image: String (URL)
- createdAt: Date
```

### 7. Job Openings
```
- title: String
- department: String
- location: String
- type: String (Full-time, Part-time, Fellowship)
- experience: String
- description: String
- requirements: Array of Strings
- isActive: Boolean
- createdAt: Date
```

### 8. Blog Posts/Insights
```
- title: String
- excerpt: String
- content: String (full article content)
- author: String
- category: String
- readTime: String
- image: String (URL)
- publishedAt: Date
- isPublished: Boolean
```

### 9. Contact Form Submissions
```
- name: String
- email: String
- organization: String (optional)
- inquiryType: String
- message: String
- status: String (new, in-progress, responded)
- submittedAt: Date
```

### 10. Newsletter Subscriptions
```
- email: String
- subscribedAt: Date
- isActive: Boolean
```

## API Endpoints to Implement

### Public Endpoints (No Authentication Required)
- `GET /api/company` - Get company information and stats
- `GET /api/services` - Get all services
- `GET /api/team` - Get team members
- `GET /api/industries` - Get industries served
- `GET /api/case-studies` - Get case studies
- `GET /api/testimonials` - Get client testimonials
- `GET /api/jobs` - Get active job openings
- `GET /api/insights` - Get published blog posts/articles
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter

### Frontend Integration Plan

#### Replace Mock Data with API Calls
1. **Home Page**: 
   - Replace `companyInfo`, `services`, `testimonials`, `caseStudies`, `stats` imports
   - Add API calls in useEffect hooks

2. **About Page**:
   - Replace `companyInfo`, `team`, `stats` imports
   - Add API calls for dynamic content

3. **Services Page**:
   - Replace `services` import
   - Add API call for services data

4. **Industries Page**:
   - Replace `industries`, `caseStudies` imports
   - Add API calls for dynamic content

5. **Insights Page**:
   - Replace `insights` import
   - Add API call with search/filter functionality

6. **Careers Page**:
   - Replace `jobOpenings` import
   - Add API call for active positions

7. **Contact Page**:
   - Replace mock form submission with real API call
   - Add form validation and success/error handling

#### API Integration Steps
1. Install axios (already installed)
2. Create API service functions in `src/services/api.js`
3. Update each page component to use API calls
4. Add loading states and error handling
5. Remove mock.js imports and replace with API calls

## Backend Implementation Tasks

### Phase 1: Database Setup
- Define MongoDB models using Mongoose/Motor
- Create database indexes for performance
- Seed database with current mock data

### Phase 2: API Development
- Implement CRUD endpoints for all models
- Add input validation using Pydantic
- Implement proper error handling
- Add CORS configuration

### Phase 3: Frontend Integration
- Create API service layer
- Replace mock data with API calls
- Add loading states and error handling
- Test all form submissions and data display

### Phase 4: Testing & Optimization
- Test all endpoints
- Optimize database queries
- Add proper logging
- Verify all features work end-to-end

## Success Criteria
- All pages load data from database instead of mock.js
- Contact form submissions are saved to database
- Newsletter subscriptions work
- All interactive elements function properly
- No breaking changes to existing UI/UX
- Fast page load times with proper error handling