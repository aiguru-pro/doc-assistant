from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
import os
from models import DocumentationRequest, DocumentationResponse
from prompt_templates import PromptTemplates

# Load environment variables from .env file
load_dotenv()

app = FastAPI(title="Documentation Assistant")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

@app.get("/")
def read_root():
    return {"message": "Documentation Assistant API"}

@app.post("/generate-docs", response_model=DocumentationResponse)
async def generate_documentation(request: DocumentationRequest):
    try:
        # Create the documentation prompt
        prompt = PromptTemplates.create_documentation_prompt(
            content=request.content,
            doc_type=request.doc_type,
            style_guide=request.style_guide,
            context=request.context,
            examples=request.examples
        )
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4-0125-preview",  # Using the latest GPT-4 model
            messages=[
                {"role": "system", "content": "You are an expert technical writer specializing in software documentation."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1500
        )
        
        # Extract the generated documentation
        documentation = response.choices[0].message.content

        return DocumentationResponse(
            documentation=documentation,
            metadata={
                "status": "success",
                "model": "gpt-4-0125-preview",
                "doc_type": request.doc_type,
                "style_guide": request.style_guide
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
