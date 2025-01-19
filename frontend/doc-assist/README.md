# Documentation Assistant - Frontend

A modern React application that helps generate professional documentation for your code using AI. Built with React, TypeScript, and Vite.

## Features

- Generate documentation for various code types (Functions, APIs, Error Handling, etc.)
- Multiple documentation style guides (Google, NumPy, Sphinx)
- Real-time preview
- Responsive design
- Dark mode interface

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- Git

## Setup Instructions

1. Clone the repository from root of the repo, if not already done:
```bash
cd doc-assistant/frontend/doc-assist
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory:
```bash
echo "VITE_API_URL=http://localhost:8000" > .env
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application should now be running at `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── components/    # React components
│   ├── config/        # Configuration files
│   ├── lib/           # Utility functions and API clients
│   ├── types/         # TypeScript type definitions
│   └── env.d.ts       # Environment variable types
├── .env              # Environment variables
├── vite.config.ts    # Vite configuration
└── tsconfig.json     # TypeScript configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:8000)

## Troubleshooting

Common issues and solutions:

1. **"Module not found" errors**
   - Ensure all dependencies are installed
   - Try deleting `node_modules` and running `npm install` again

2. **Environment variable issues**
   - Make sure `.env` file exists and has the correct values
   - Restart the development server after changing environment variables

3. **CORS errors**
   - Ensure the backend server is running
   - Check that the `VITE_API_URL` matches your backend URL

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add YourFeature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

[MIT]
