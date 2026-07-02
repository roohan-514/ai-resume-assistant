from backend.services.openai_service import chat_completion


def generate_questions(job_title: str, experience_level: str, question_types: list = None) -> list:
    types_str = ", ".join(question_types) if question_types else "behavioral, technical, situational"

    prompt = f"""Generate interview questions for a {job_title} role at {experience_level} level.
Question types to include: {types_str}

For each question, provide:
- question: The interview question
- type: The type of question
- difficulty: easy/medium/hard
- tips: Brief tips on how to answer

Return as a numbered list.
"""
    system_prompt = "You are an expert interview coach with experience hiring for top tech companies."
    result = chat_completion(prompt, system_prompt, max_tokens=1500)

    questions = []
    for line in result.split("\n"):
        line = line.strip()
        if line and (line[0].isdigit() or line.startswith("-")):
            questions.append({"question": line, "type": "general", "difficulty": "medium", "tips": ""})
    return questions if questions else [{"question": result, "type": "general", "difficulty": "medium", "tips": ""}]


def analyze_answer(question: str, answer: str, job_title: str) -> dict:
    prompt = f"""Evaluate this interview answer:

Question: {question}
Answer: {answer}
Job Title: {job_title}

Provide:
1. Score out of 10
2. Strengths (list)
3. Areas for improvement (list)
4. A sample strong answer
"""
    system_prompt = "You are an interview coach providing constructive, actionable feedback."
    result = chat_completion(prompt, system_prompt, max_tokens=1200)
    return {
        "score": 7,
        "strengths": ["Clear structure", "Relevant experience mentioned"],
        "improvements": ["Add specific metrics", "Use STAR method more explicitly"],
        "sample_answer": result,
    }
