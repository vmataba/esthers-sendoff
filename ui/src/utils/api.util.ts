export interface ApiResponse<T> {
    status: ApiResponseStatus;
    message: string;
    body: T;
}

export enum ApiResponseStatus {
    OK = "OK",
    BAD_REQUEST = "BAD_REQUEST",
    CREATED = "CREATED",
    NO_CONTENT = "NO_CONTENT",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    NOT_FOUND = "NOT_FOUND",
    ERROR = "ERROR",
    UNAUTHORIZED = "UNAUTHORIZED"
}

import {getAuthToken} from '../services/auth.service';

const makeHttpRequest = async <T>(url: string, method: string, body?: unknown): Promise<ApiResponse<T>> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    const authToken = getAuthToken();
    if (authToken) {
        headers['Authorization'] = `Basic ${authToken}`;
    }

    const response = await fetch(url, {
        method: method,
        body: body ? JSON.stringify(body) : null,
        headers: headers
    });
    return response.json();
};

export const makeGetRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
    return makeHttpRequest<T>(url, 'GET');
};

export const makePostRequest = async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    return makeHttpRequest<T>(url, 'POST', body);
};

export const makePutRequest = async <T>(url: string, body: unknown): Promise<ApiResponse<T>> => {
    return makeHttpRequest<T>(url, 'PUT', body);
};

export const makeDeleteRequest = async <T>(url: string): Promise<ApiResponse<T>> => {
    return makeHttpRequest<T>(url, 'DELETE');
};