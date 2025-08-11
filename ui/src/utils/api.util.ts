/**
 * API utility functions for making HTTP requests
 */

/**
 * Type for HTTP request options
 */
export interface HttpOptions extends RequestInit {
  // Additional custom options can be added here
}

/**
 * API error class for handling HTTP errors
 */
export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Get authentication headers
 */
const getAuthHeaders = (): HeadersInit => {
  // In a production environment, this should use a more secure approach
  // such as fetching from environment variables or a secure storage
  return {
    'Authorization': `Basic ${btoa('admin:esther@2025')}`,
  };
};

/**
 * Parse response based on content type
 */
const parseResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  
  if (!response.ok) {
    let errorData;
    try {
      if (contentType?.includes('application/json')) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }
    } catch (e) {
      errorData = 'Error parsing response';
    }
    
    throw new ApiError(
      response.status,
      response.statusText || 'Request failed',
      errorData
    );
  }

  if (contentType?.includes('application/json')) {
    return response.json();
  }
  
  if (contentType?.includes('text/')) {
    return response.text();
  }
  
  return response;
};

/**
 * Make an HTTP call with proper error handling
 */
export const makeHttpCall = async <T = unknown>(
  url: string, 
  method: string, 
  body?: Record<string, unknown>, 
  options: HttpOptions = {}
): Promise<T> => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return parseResponse(response) as Promise<T>;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle network or other errors
    throw new ApiError(
      0, 
      error instanceof Error ? error.message : 'Unknown error occurred',
      error
    );
  }
};

/**
 * HTTP method wrappers
 */
export const post = <T = unknown>(url: string, body: Record<string, unknown>, options?: HttpOptions) => 
  makeHttpCall<T>(url, 'POST', body, options);

export const get = <T = unknown>(url: string, options?: HttpOptions) => 
  makeHttpCall<T>(url, 'GET', undefined, options);

export const put = <T = unknown>(url: string, body?: Record<string, unknown>, options?: HttpOptions) => 
  makeHttpCall<T>(url, 'PUT', body, options);

export const del = <T = unknown>(url: string, options?: HttpOptions) => 
  makeHttpCall<T>(url, 'DELETE', undefined, options);

/**
 * Add additional HTTP methods as needed
 */
export const patch = <T = unknown>(url: string, body?: Record<string, unknown>, options?: HttpOptions) => 
  makeHttpCall<T>(url, 'PATCH', body, options);