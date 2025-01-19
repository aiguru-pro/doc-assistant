from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from enum import Enum

class DocType(str, Enum):
    FUNCTION = "function"
    API = "api"
    ERROR_HANDLING = "error_handling"
    DATABASE = "database"
    WORKFLOW = "workflow"

class StyleGuide(str, Enum):
    GOOGLE = "google"
    NUMPY = "numpy"
    SPHINX = "sphinx"
    CUSTOM = "custom"

class DocumentationRequest(BaseModel):
    content: str = Field(..., description="Code or content to document")
    doc_type: DocType
    style_guide: StyleGuide = StyleGuide.GOOGLE
    context: Optional[Dict[str, Any]] = None
    examples: Optional[List[str]] = None

class DocumentationResponse(BaseModel):
    documentation: str
    metadata: Dict[str, Any] = Field(default_factory=dict)
