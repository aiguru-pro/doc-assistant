from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from models import DocumentationRequest, DocumentationResponse
from prompt_templates import PromptTemplates

app = FastAPI(title="Documentation Assistant")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Documentation Assistant API"}

@app.post("/generate-docs", response_model=DocumentationResponse)
async def generate_documentation(request: DocumentationRequest):
    # Create the documentation prompt
    prompt = PromptTemplates.create_documentation_prompt(
        content=request.content,
        doc_type=request.doc_type,
        style_guide=request.style_guide,
        context=request.context,
        examples=request.examples
    )
    
    # For now, return a mock response
    return DocumentationResponse(
        documentation="# Generated Documentation\n\nThis is a placeholder.",
        metadata={"status": "success"}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
