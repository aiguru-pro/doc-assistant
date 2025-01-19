import React, { useState } from 'react';
import { generateDocs } from '@/lib/api';
import { DocType, StyleGuide, APIError } from '@/types/documentation';

export default function DocAssistant() {
  const [input, setInput] = useState('');
  const [docType, setDocType] = useState('function');
  const [styleGuide, setStyleGuide] = useState('google');
  const [documentation, setDocumentation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await generateDocs({
        content: input,
        doc_type: docType,
        style_guide: styleGuide,
      });
      setDocumentation(response.documentation);
    } catch (err) {
      const apiError = err as APIError;
      setError(apiError.message || 'An unexpected error occurred');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">Documentation Assistant</h1>
          <p className="text-gray-400 mt-2">Generate professional documentation for your code</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Input */}
          <div className="space-y-6">
            {/* Controls */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Documentation Type
                </label>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="function">Function</option>
                  <option value="api">API</option>
                  <option value="error_handling">Error Handling</option>
                  <option value="database">Database</option>
                  <option value="workflow">Workflow</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Style Guide
                </label>
                <select
                  value={styleGuide}
                  onChange={(e) => setStyleGuide(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="google">Google</option>
                  <option value="numpy">NumPy</option>
                  <option value="sphinx">Sphinx</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            {/* Code Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input Code/Content
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-[calc(100vh-380px)] min-h-[300px] bg-gray-800 border border-gray-700 text-gray-100 rounded-lg py-3 px-4 font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your code or content here..."
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </span>
              ) : (
                'Generate Documentation'
              )}
            </button>
          </div>

          {/* Right Panel - Output */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 h-[calc(100vh-180px)] overflow-auto">
            <h2 className="text-xl font-semibold mb-4 text-white">Generated Documentation</h2>
            {documentation ? (
              <pre className="whitespace-pre-wrap bg-gray-900 p-4 rounded-lg border border-gray-700 text-gray-300 font-mono text-sm h-[calc(100%-60px)] overflow-auto">
                {documentation}
              </pre>
            ) : (
              <div className="flex items-center justify-center h-[calc(100%-60px)] text-gray-500">
                Documentation will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
