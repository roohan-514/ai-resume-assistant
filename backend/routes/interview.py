from fastapi import APIRouter, HTTPException
from backend.models.schemas import InterviewQuestionRequest, FeedbackRequest, InterviewQuestionResponse, FeedbackResponse
from backend.services.interview_coach import generate_questions, analyze_answer

router = APIRouter(prefix="/api/interview", tags=["Interview"])


@router.post("/questions", response_model=InterviewQuestionResponse)
async def get_interview_questions(request: InterviewQuestionRequest):
    try:
        questions = generate_questions(
            job_title=request.job_title,
            experience_level=request.experience_level,
            question_types=request.question_types,
        )
        return InterviewQuestionResponse(questions=questions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/feedback", response_model=FeedbackResponse)
async def get_feedback(request: FeedbackRequest):
    try:
        result = analyze_answer(
            question=request.question,
            answer=request.answer,
            job_title=request.job_title,
        )
        return FeedbackResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
