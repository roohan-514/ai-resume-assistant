from fastapi import APIRouter, HTTPException
from backend.models.schemas import CareerPathRequest, CareerPathResponse
from backend.services.openai_service import chat_completion

router = APIRouter(prefix="/api/career", tags=["Career"])


@router.post("/recommend", response_model=CareerPathResponse)
async def recommend_career_paths(request: CareerPathRequest):
    try:
        skills_text = ", ".join(request.skills)
        interests_text = ", ".join(request.interests) if request.interests else "Not specified"

        prompt = f"""Based on the following profile, recommend career paths:

Current Role: {request.current_role}
Skills: {skills_text}
Interests: {interests_text}
Years of Experience: {request.experience_years}

Provide:
1. Top 3 recommended roles with explanation and salary range
2. Skill gaps to fill
3. Learning resources and certifications
"""
        system_prompt = "You are a career development expert with deep knowledge of industry trends and job markets."
        result = chat_completion(prompt, system_prompt, max_tokens=1500)

        return CareerPathResponse(
            recommended_roles=[
                {"title": "Suggested Role", "explanation": result[:200], "salary_range": "$80k-$120k"}
            ],
            skill_gaps=["Skill gap analysis in progress"],
            learning_resources=[result],
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
