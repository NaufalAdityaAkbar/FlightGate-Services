import { fetcher } from './index';

export interface InfoSection {
    id: number;
    title: string;
    content: string;
    image_path?: string;
    position: 'left' | 'right';
    order: number;
    is_active: boolean;
}

export const infoSectionApi = {
    getAll: async (): Promise<InfoSection[]> => {
        return fetcher('/info-sections');
    },

    create: async (formData: FormData): Promise<InfoSection> => {
        return fetcher('/info-sections', {
            method: 'POST',
            body: formData,
        });
    },

    update: async (id: number, formData: FormData): Promise<InfoSection> => {
        return fetcher(`/info-sections/${id}`, {
            method: 'POST',
            body: formData,
        });
    },

    delete: async (id: number): Promise<void> => {
        return fetcher(`/info-sections/${id}`, {
            method: 'DELETE',
        });
    },
};
