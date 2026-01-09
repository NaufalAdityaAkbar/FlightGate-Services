const API_BASE = '/api';

const getHeaders = (isFormData = false) => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = {
        'Authorization': token ? `Bearer ${token}` : '',
    };

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    return headers;
};

export const fetcher = async (endpoint: string, options: RequestInit = {}) => {
    const isFormData = options.body instanceof FormData;

    const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            ...getHeaders(isFormData),
            ...options.headers,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'API Error');
    }

    return data;
};
