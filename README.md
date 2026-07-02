# AI Resume & Career Assistant

An AI-powered career assistant that helps job seekers build ATS-optimized resumes, prepare for interviews with personalized questions and feedback, and discover career paths tailored to their skills and experience.

Built with **Python (FastAPI)**, **React**, and **OpenAI's GPT-4 API**.

---

## Tech Stack

| Layer       | Technology                              |
| ----------- | --------------------------------------- |
| Backend     | Python 3.11+, FastAPI, Uvicorn          |
| Frontend    | React 18, React Router, Vite            |
| Styling     | TailwindCSS 3, @heroicons/react         |
| AI          | OpenAI GPT-4 API                        |
| HTTP Client | Axios                                   |
| Auth        | API key via `.env`                      |

---

## Features

### Resume Builder
- **Resume Generation** — Enter your job title, experience, skills, and achievements to get a professionally written resume summary and structure.
- **Resume Parsing** — Paste any resume text and extract structured information like name, email, skills, experience, and education.
- **Resume Optimization** — Provide your resume and a target job description to receive an ATS-optimized version with match score and improvement suggestions.

### Interview Coach
- **Question Generator** — Generate behavioral, technical, and situational interview questions tailored to a specific role and experience level.
- **Answer Feedback** — Submit your answers and receive a score, strengths, weaknesses, and a sample strong answer.

### Career Advisor
- **Path Recommendations** — Get recommended next roles, salary ranges, skill gaps to fill, and learning resources based on your current profile.

---

## Project Structure

```
ai-resume-assistant/
├── .gitignore
├── README.md
├── backend/
│   ├── .env.example
│   ├── requirements.txt
│   ├── config.py
│   ├── main.py
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── resume.py
│   │   ├── interview.py
│   │   └── career.py
│   └── services/
│       ├── __init__.py
│       ├── openai_service.py
│       ├── resume_builder.py
│       └── interview_coach.py
└── frontend/
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    ├── index.html
    ├── public/
    │   └── index.html
    └── src/
        ├── index.jsx
        ├── index.css
        ├── App.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   └── Footer.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── ResumeBuilder.jsx
        │   ├── InterviewPrep.jsx
        │   └── CareerPaths.jsx
        └── services/
            └── api.js
```

---

## Installation

### Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- An OpenAI API key

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000` with API requests proxied to `http://localhost:8000`.

---

## API Endpoints

| Method | Endpoint                   | Description                     |
| ------ | -------------------------- | ------------------------------- |
| GET    | `/`                        | API health check                |
| GET    | `/health`                  | Health check                    |
| POST   | `/api/resume/generate`     | Generate resume content         |
| POST   | `/api/resume/parse`        | Parse resume text               |
| POST   | `/api/resume/optimize`     | Optimize resume for a job       |
| POST   | `/api/interview/questions` | Generate interview questions    |
| POST   | `/api/interview/feedback`  | Get feedback on interview answer|
| POST   | `/api/career/recommend`    | Get career path recommendations |

### Example: Generate Resume

```bash
curl -X POST http://localhost:8000/api/resume/generate \
  -H "Content-Type: application/json" \
  -d '{
    "job_title": "Senior Software Engineer",
    "experience": "5 years building web applications with React and Node.js",
    "skills": ["React", "Node.js", "TypeScript", "AWS"],
    "achievements": ["Led team of 5 engineers", "Reduced deployment time by 40%"]
  }'
```

---

## Environment Variables

| Variable          | Description                  | Default            |
| ----------------- | ---------------------------- | ------------------ |
| `OPENAI_API_KEY`  | Your OpenAI API key          | (required)         |
| `APP_NAME`        | Application name             | AI Resume Assistant|
| `DEBUG`           | Enable debug mode            | true               |
| `HOST`            | Server host                  | 0.0.0.0            |
| `PORT`            | Server port                  | 8000               |

---

## Usage Guide

1. **Start the backend** (port 8000) and **frontend** (port 3000).
2. Open `http://localhost:3000` in your browser.
3. Navigate to **Resume Builder** to generate, parse, or optimize resumes.
4. Use **Interview Prep** to practice with tailored questions and receive feedback.
5. Explore **Career Paths** to discover your next career move.

---

## License

MIT
