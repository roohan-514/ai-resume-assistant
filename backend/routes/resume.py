from fastapi import APIRouter, HTTPException
from backend.models.schemas import ResumeRequest, ParseResumeRequest, OptimizeResumeRequest, ResumeResponse
from backend.services.resume_builder import build_resume, parse_resume, optimize_resume

router = APIRouter(prefix="/api/resume", tags=["Resume"])


@router.post("/generate", response_model=ResumeResponse)
async def generate_resume(request: ResumeRequest):
    try:
        result = build_resume(
            job_title=request.job_title,
            experience=request.experience,
            skills=request.skills,
            achievements=request.achievements,
        )
        return ResumeResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/parse")
async def parse_resume_endpoint(request: ParseResumeRequest):
    try:
        result = parse_resume(request.resume_text)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/optimize")
async def optimize_resume_endpoint(request: OptimizeResumeRequest):
    try:
        result = optimize_resume(request.resume_text, request.job_description)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
