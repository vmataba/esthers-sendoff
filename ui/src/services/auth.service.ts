import {type ApiResponse, ApiResponseStatus, makeGetRequest} from '../utils/api.util';

export interface AuthUser {
    username: string;
    password: string;
}

// Store auth token in session storage
export const storeAuthToken = (username: string, password: string): void => {
    const token = btoa(`${username}:${password}`);
    sessionStorage.setItem('auth_token', token);
};

// Get the auth token from session storage
export const getAuthToken = (): string | null => {
    return sessionStorage.getItem('auth_token');
};

// Remove the auth token from session storage (logout)
export const removeAuthToken = (): void => {
    sessionStorage.removeItem('auth_token');
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
    return getAuthToken() !== null;
};

// Login function - will attempt to make a request to a protected endpoint to verify credentials
export const login = async (username: string, password: string): Promise<ApiResponse<boolean>> => {
    // Store credentials first
    storeAuthToken(username, password);

    // Try to access a protected endpoint to verify credentials
    try {
        const response = await makeGetRequest<void>('/api/v1/invitation-cards');

        // If request was successful, user is authenticated
        if (response.status === ApiResponseStatus.OK) {
            return {
                status: ApiResponseStatus.OK,
                body: true,
                message: 'Authentication successful'
            };
        } else {
            // If request failed, remove the auth token and return error
            removeAuthToken();
            return {
                status: ApiResponseStatus.UNAUTHORIZED,
                body: false,
                message: response.message || 'Authentication failed'
            };
        }
    } catch (error) {
        // If request failed, remove the auth token and return error
        removeAuthToken();
        console.error('An error occurred while logging in ', error);
        return {
            status: ApiResponseStatus.UNAUTHORIZED,
            body: false,
            message: 'Authentication failed'
        };
    }
};

// Logout function
export const logout = (): void => {
    removeAuthToken();
};
