from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.config import APP_NAME, DEBUG
from backend.routes.resume import router as resume_router
from backend.routes.interview import router as interview_router
from backend.routes.career import router as career_router

app = FastAPI(title=APP_NAME, debug=DEBUG)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(interview_router)
app.include_router(career_router)


@app.get("/")
async def root():
    return {"message": f"{APP_NAME} API is running", "status": "healthy"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
