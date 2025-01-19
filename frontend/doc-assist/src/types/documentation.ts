// src/types/documentation.ts
export type DocType = 'function' | 'api' | 'error_handling' | 'database' | 'workflow';
export type StyleGuide = 'google' | 'numpy' | 'sphinx' | 'custom';

export interface DocumentationRequest {
  content: string;
  doc_type: DocType;
  style_guide: StyleGuide;
  context?: Record<string, any>;
  examples?: string[];
}

export interface DocumentationResponse {
  documentation: string;
  metadata: Record<string, any>;
}

export interface APIError {
  message: string;
  status?: number;
}
