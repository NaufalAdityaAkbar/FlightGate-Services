import { fetcher } from './index';

export interface User {
    id: number;
    name: string;
    email: string;
}

export const authApi = {
    login: async (credentials: { email: string; password: string }) => {
        return fetcher('/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
        });
    },

    logout: async () => {
        return fetcher('/logout', {
            method: 'POST',
        });
    },

    getUser: async () => {
        return fetcher('/user');
    }
};
