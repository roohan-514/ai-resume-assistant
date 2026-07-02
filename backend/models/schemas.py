from pydantic import BaseModel, Field
from typing import Optional, List


class ResumeRequest(BaseModel):
    job_title: str
    experience: str
    skills: List[str]
    achievements: Optional[List[str]] = None


class ResumeResponse(BaseModel):
    summary: str
    experience_section: str
    skills_section: List[str]
    achievements_section: List[str]


class ParseResumeRequest(BaseModel):
    resume_text: str


class OptimizeResumeRequest(BaseModel):
    resume_text: str
    job_description: str


class InterviewQuestionRequest(BaseModel):
    job_title: str
    experience_level: str = "mid"
    question_types: Optional[List[str]] = None


class InterviewQuestionResponse(BaseModel):
    questions: List[dict]


class FeedbackRequest(BaseModel):
    question: str
    answer: str
    job_title: str


class FeedbackResponse(BaseModel):
    score: int
    strengths: List[str]
    improvements: List[str]
    sample_answer: str


class CareerPathRequest(BaseModel):
    current_role: str
    skills: List[str]
    interests: Optional[List[str]] = None
    experience_years: int = 0


class CareerPathResponse(BaseModel):
    recommended_roles: List[dict]
    skill_gaps: List[str]
    learning_resources: List[str]
