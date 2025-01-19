from typing import Dict, Optional, Any
from models import DocType, StyleGuide

class PromptTemplates:
    @staticmethod
    def get_style_guide_instructions(style: StyleGuide) -> str:
        guides = {
            StyleGuide.GOOGLE: """
                Follow Google's Python style guide:
                - Start with a one-line summary
                - Add an extended description if needed
                - List Args, Returns, Raises with proper indentation
                - Include Examples section for complex functions
            """,
            StyleGuide.NUMPY: """
                Follow NumPy documentation style:
                - Parameters section instead of Args
                - Use dashed lines for section separation
                - Include Examples in doctest format
            """,
            StyleGuide.SPHINX: """
                Follow Sphinx documentation style:
                - Use :param: for parameters
                - Use :type: for type hints
                - Use :return: for return values
                - Use :raises: for exceptions
            """
        }
        return guides.get(style, guides[StyleGuide.GOOGLE])

    @staticmethod
    def get_base_template(doc_type: DocType, style_guide: StyleGuide) -> str:
        style_instructions = PromptTemplates.get_style_guide_instructions(style_guide)

        templates = {
            DocType.FUNCTION: f"""
                Act as an expert technical writer specializing in Python documentation.
                Document the following function according to these guidelines:

                {style_instructions}

                Additional requirements:
                - Include type hints
                - Document all exceptions
                - Add security considerations if relevant
                - Provide usage examples
            """,
            DocType.API: """
                Act as an API documentation specialist.
                Document the following API endpoint using OpenAPI 3.0 style:

                Include:
                - Endpoint description
                - Request/Response schemas
                - Status codes
                - Error responses
                - Authentication requirements
                - Rate limiting details
                - Example requests/responses
            """,
            DocType.ERROR_HANDLING: """
                Act as a senior software architect.
                Document the following error handling pattern:

                Include:
                - Error categorization
                - Logging requirements
                - Recovery strategies
                - Client retry recommendations
                - Example scenarios
            """
        }
        return templates.get(doc_type)

    @staticmethod
    def create_documentation_prompt(
        content: str,
        doc_type: DocType,
        style_guide: StyleGuide,
        context: Optional[Dict[str, Any]] = None,
        examples: Optional[list[str]] = None
    ) -> str:
        base_template = PromptTemplates.get_base_template(doc_type, style_guide)

        prompt = f"{base_template}\n\nContent to document:\n{content}\n"

        if context:
            prompt += f"\nAdditional context:\n{context}\n"

        if examples:
            prompt += "\nReference examples:\n"
            for i, example in enumerate(examples, 1):
                prompt += f"\nExample {i}:\n{example}\n"

        return prompt
