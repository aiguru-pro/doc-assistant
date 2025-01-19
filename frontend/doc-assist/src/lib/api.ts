// src/lib/api.ts
import { DocumentationRequest, DocumentationResponse, APIError } from '../types/documentation';
import { API_BASE_URL } from '@/config/api';

export async function generateDocs(payload: DocumentationRequest): Promise<DocumentationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-docs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to generate documentation');
    }

    return response.json();
  } catch (error) {
    const apiError: APIError = {
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
      status: error instanceof Response ? error.status : undefined,
    };
    throw apiError;
  }
}
