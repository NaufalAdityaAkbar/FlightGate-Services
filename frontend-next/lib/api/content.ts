import { fetcher } from './index';

export interface ContentSection {
    section_key: string;
    title: string;
    content: string;
    image_path: string | null;
}

export const contentApi = {
    getAll: async (): Promise<Record<string, ContentSection>> => {
        return fetcher('/content');
    },

    update: async (key: string, formData: FormData) => {
        // Note: For FormData, we don't set Content-Type manually in fetcher
        return fetcher(`/content/${key}`, {
            method: 'POST',
            body: formData,
        });
    }
};
