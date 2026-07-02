import openai
from backend.config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY


def chat_completion(prompt: str, system_prompt: str = None, model: str = "gpt-4", temperature: float = 0.7, max_tokens: int = 1024) -> str:
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})

    response = openai.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature,
        max_tokens=max_tokens,
    )
    return response.choices[0].message.content.strip()
