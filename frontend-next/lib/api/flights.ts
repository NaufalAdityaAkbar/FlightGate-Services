import { fetcher } from './index';

export interface Flight {
    id: number;
    type: 'DEPARTURE' | 'ARRIVAL';
    scheduled_time: string;
    airline: string;
    flight_code: string;
    destination: string;
    gate: string;
    terminal: string;
    check_in_counter?: string | null;
    status: string;
    remarks?: string | null;
}

export const flightApi = {
    getAll: async (): Promise<Flight[]> => {
        return fetcher('/flights');
    },

    getOne: async (id: number): Promise<Flight> => {
        return fetcher(`/flights/${id}`);
    },

    create: async (data: Partial<Flight>) => {
        return fetcher('/flights', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    update: async (id: number, data: Partial<Flight>) => {
        return fetcher(`/flights/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    },

    delete: async (id: number) => {
        return fetcher(`/flights/${id}`, {
            method: 'DELETE',
        });
    }
};
