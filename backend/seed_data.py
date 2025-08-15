from database import db_manager
from models import *
import asyncio

# Mock data converted to database models
async def seed_database():
    print("🌱 Starting database seeding...")
    
    # Company Info
    company_info = CompanyInfo(
        name="Evidentia",
        tagline="Transforming Data into Decisions",
        mission="To empower organizations and communities through rigorous research, innovative data analysis, and evidence-based solutions that drive meaningful change and sustainable impact.",
        vision="To be the global leader in research consultancy, setting new standards for methodological excellence while making complex data accessible and actionable for decision-makers worldwide.",
        culture="A diverse, inclusive environment where curious minds thrive. We foster continuous learning, encourage bold thinking, and celebrate the intersection of academic rigor with real-world application.",
        values=[
            Value(title="Integrity", description="Upholding the highest ethical standards in all research practices"),
            Value(title="Innovation", description="Pioneering cutting-edge methodologies and analytical approaches"),
            Value(title="Collaboration", description="Building lasting partnerships with clients, communities, and stakeholders"),
            Value(title="Impact", description="Delivering research that creates measurable, positive change"),
            Value(title="Excellence", description="Maintaining rigorous quality standards in every project")
        ],
        stats=Stats(
            projects=150,
            clients=85,
            countries=23,
            teamMembers=45,
            yearsExperience=8
        )
    )
    
    # Check if company info already exists
    existing_company = await db_manager.get_company_info()
    if not existing_company:
        await db_manager.create_company_info(company_info)
        print("✅ Company info seeded")
    
    # Services
    services = [
        Service(
            title="Applied Research & Evaluation",
            description="Comprehensive research studies and program evaluations that measure impact and inform strategic decisions.",
            icon="BarChart3",
            features=["Mixed-methods research", "Impact evaluation", "Longitudinal studies", "Policy analysis"]
        ),
        Service(
            title="Data Science & Analytics",
            description="Advanced statistical modeling and machine learning solutions to uncover insights from complex datasets.",
            icon="TrendingUp",
            features=["Predictive modeling", "Statistical analysis", "Data visualization", "Machine learning"]
        ),
        Service(
            title="Survey Design & Implementation",
            description="End-to-end survey solutions from questionnaire design to data collection and analysis.",
            icon="Users",
            features=["Survey methodology", "Sampling design", "Data collection", "Quality assurance"]
        ),
        Service(
            title="Policy Impact Assessments",
            description="Evidence-based evaluations of policy interventions and their real-world effectiveness.",
            icon="FileText",
            features=["Policy evaluation", "Cost-benefit analysis", "Stakeholder analysis", "Recommendation frameworks"]
        ),
        Service(
            title="Training & Capacity Building",
            description="Professional development programs to strengthen research capabilities within organizations.",
            icon="GraduationCap",
            features=["Research training", "Methodology workshops", "Tool development", "Mentorship programs"]
        ),
        Service(
            title="Strategic Consulting",
            description="High-level advisory services to guide organizational strategy using evidence-based insights.",
            icon="Target",
            features=["Strategic planning", "Organizational assessment", "Change management", "Performance optimization"]
        )
    ]
    
    existing_services = await db_manager.get_services()
    if not existing_services:
        for service in services:
            await db_manager.create_service(service)
        print("✅ Services seeded")
    
    # Team Members
    team_members = [
        TeamMember(
            name="Dr. Sarah Chen",
            position="Founder & CEO",
            bio="Leading researcher with 15+ years in applied social research and policy evaluation.",
            image="https://images.unsplash.com/photo-1630959302862-82cec6653d60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHRlYW1zfGVufDB8fHx8MTc1NTI3NTYwN3ww&ixlib=rb-4.1.0&q=85",
            expertise=["Program Evaluation", "Mixed Methods", "Policy Research"]
        ),
        TeamMember(
            name="Marcus Johnson",
            position="Director of Data Science",
            bio="Machine learning expert specializing in predictive analytics for social impact research.",
            image="https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxyZXNlYXJjaCUyMHRlYW1zfGVufDB8fHx8MTc1NTI3NTYwN3ww&ixlib=rb-4.1.0&q=85",
            expertise=["Machine Learning", "Statistical Modeling", "Data Visualization"]
        ),
        TeamMember(
            name="Dr. Amara Okafor",
            position="Senior Research Director",
            bio="International development researcher with expertise in impact evaluation and evidence synthesis.",
            image="https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MHx8fHwxNzU1Mjc1NjIzfDA&ixlib=rb-4.1.0&q=85",
            expertise=["Impact Evaluation", "Global Health", "Randomized Trials"]
        ),
        TeamMember(
            name="Elena Rodriguez",
            position="Head of Survey Research",
            bio="Survey methodology expert with deep experience in complex sampling and data collection.",
            image="https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MHx8fHwxNzU1Mjc1NjIzfDA&ixlib=rb-4.1.0&q=85",
            expertise=["Survey Design", "Sampling Methods", "Quality Control"]
        )
    ]
    
    existing_team = await db_manager.get_team_members()
    if not existing_team:
        for member in team_members:
            await db_manager.create_team_member(member)
        print("✅ Team members seeded")
    
    # Industries
    industries = [
        Industry(
            name="Healthcare & Public Health",
            description="Advancing health outcomes through rigorous research and evidence-based interventions.",
            projects=45,
            image="https://images.unsplash.com/photo-1630959302862-82cec6653d60?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxyZXNlYXJjaCUyMHRlYW1zfGVufDB8fHx8MTc1NTI3NTYwN3ww&ixlib=rb-4.1.0&q=85"
        ),
        Industry(
            name="Education & Learning",
            description="Transforming educational systems through data-driven insights and evidence-based practices.",
            projects=32,
            image="https://images.unsplash.com/photo-1707944746058-4da338d0f827?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxyZXNlYXJjaCUyMHRlYW1zfGVufDB8fHx8MTc1NTI3NTYwN3ww&ixlib=rb-4.1.0&q=85"
        ),
        Industry(
            name="Economic Development",
            description="Supporting sustainable economic growth through comprehensive policy research and analysis.",
            projects=28,
            image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTUyNzU2MTJ8MA&ixlib=rb-4.1.0&q=85"
        ),
        Industry(
            name="Social Policy",
            description="Informing social programs and policies through rigorous evaluation and community-centered research.",
            projects=38,
            image="https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzd8MHwxfHNlYXJjaHwyfHxkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwwfHx8fDE3NTUyNzU2MTJ8MA&ixlib=rb-4.1.0&q=85"
        )
    ]
    
    existing_industries = await db_manager.get_industries()
    if not existing_industries:
        for industry in industries:
            await db_manager.create_industry(industry)
        print("✅ Industries seeded")
    
    # Continue with other data...
    print("🎉 Database seeding completed!")

if __name__ == "__main__":
    asyncio.run(seed_database())