export interface ApiResponse<T> {
    status: ApiResponseStatus;
    message: string;
    body: T;
}

export enum ApiResponseStatus {
    OK = "OK",
    BAD_REQUEST = "BAD_REQUEST",
    CREATED = "CREATED",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    NOT_FOUND = "NOT_FOUND",
    ERROR = "ERROR",
    UNAUTHORIZED = "UNAUTHORIZED"
}

const makeHttpRequest = async <T>(url: string, method: string, body?: unknown): Promise<ApiResponse<T>> => {
    const response = await fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.json();
};

export const makeGetRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
    return makeHttpRequest<T>(url, 'GET');
};

export const makePostRequest = async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    return makeHttpRequest<T>(url, 'POST', body);
};