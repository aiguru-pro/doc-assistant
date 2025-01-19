# Documentation Assistant - Backend

A FastAPI backend service that generates code documentation using OpenAI's GPT models.

## Features

- AI-powered documentation generation
- Multiple documentation styles (Google, NumPy, Sphinx)
- Support for various code types (Functions, APIs, Error Handling)
- RESTful API design
- CORS support

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.9 or higher
- pip (Python package manager)
- OpenAI API key

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd doc-assistant/backend
```

2. Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the root directory:
```bash
echo "OPENAI_API_KEY=your_api_key_here" > .env
```

5. Start the server:
```bash
python main.py
```

The server should now be running at `http://localhost:8000`

## Project Structure

```
backend/
├── models.py           # Pydantic models
├── prompt_templates.py # Documentation templates
├── main.py            # FastAPI application
├── requirements.txt   # Python dependencies
└── .env              # Environment variables
```

## API Endpoints

### Generate Documentation
- URL: `/generate-docs`
- Method: `POST`
- Request Body:
```json
{
  "content": "string",
  "doc_type": "function|api|error_handling|database|workflow",
  "style_guide": "google|numpy|sphinx|custom",
  "context": {},
  "examples": []
}
```
- Response:
```json
{
  "documentation": "string",
  "metadata": {}
}
```

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key
- Other configuration options can be added to `.env`

## Dependencies

Key dependencies and their versions:
```
fastapi==0.109.2
uvicorn==0.27.0
python-dotenv==1.0.1
openai==1.12.0
pydantic==2.6.1
```

## Troubleshooting

Common issues and solutions:

1. **OpenAI API errors**
   - Verify your API key is correct
   - Check your OpenAI account has sufficient credits

2. **CORS issues**
   - Check the CORS configuration in `main.py`
   - Verify the frontend URL is correctly listed in allowed origins

3. **Import errors**
   - Ensure your virtual environment is activated
   - Verify all dependencies are installed correctly

## Development

To contribute:

1. Set up a development environment:
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Run tests (if available):
```bash
pytest
```

3. Make your changes and test thoroughly

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

[MIT]
