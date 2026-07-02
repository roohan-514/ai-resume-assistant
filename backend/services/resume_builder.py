from backend.services.openai_service import chat_completion


def build_resume(job_title: str, experience: str, skills: list, achievements: list = None) -> dict:
    skills_text = ", ".join(skills)
    achievements_text = ""
    if achievements:
        achievements_text = "\n".join(f"- {a}" for a in achievements)

    prompt = f"""Create a professional resume summary and structure for a {job_title} role.

Experience: {experience}
Skills: {skills_text}
{achievements_text}

Provide:
1. A professional summary paragraph
2. An experience section with bullet points
3. A skills section
4. An achievements section
"""
    system_prompt = "You are an expert resume writer and career coach. Create ATS-friendly, impactful resume content."

    result = chat_completion(prompt, system_prompt, max_tokens=1500)
    sections = result.split("\n\n")
    return {
        "summary": sections[0] if len(sections) > 0 else "",
        "experience_section": sections[1] if len(sections) > 1 else "",
        "skills_section": skills,
        "achievements_section": achievements or [],
    }


def parse_resume(resume_text: str) -> dict:
    prompt = f"""Parse the following resume and extract structured information:

{resume_text}

Return the information in this format:
- Name:
- Email:
- Phone:
- Skills:
- Experience:
- Education:
- Certifications:
"""
    system_prompt = "You are a resume parsing expert. Extract structured data from resumes accurately."
    result = chat_completion(prompt, system_prompt, max_tokens=1000)
    return {"parsed_data": result}


def optimize_resume(resume_text: str, job_description: str) -> dict:
    prompt = f"""Optimize the following resume for the given job description:

RESUME:
{resume_text}

JOB DESCRIPTION:
{job_description}

Provide:
1. An optimized version of the resume
2. Key changes made
3. Suggestions for further improvement
4. ATS compatibility score (out of 100)
"""
    system_prompt = "You are an ATS optimization expert. Tailor resumes to job descriptions for maximum match rate."
    result = chat_completion(prompt, system_prompt, max_tokens=1500)
    return {"optimization_result": result}
