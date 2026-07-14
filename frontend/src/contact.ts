import { postJson } from "./api";

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface APIResponse {
    success: boolean;
    message: string;
    error?: string;
}

export const submitContactForm = async (formData: ContactFormData): Promise<APIResponse> => {
    try {
        const response = await postJson('/contact', formData);

        const data  = await response.json();
        if (!response.ok) {
            return {
                success: false,
                message: data.error || 'Transmission faild. please check inputs.',
            };
        }

        return {
            success: true,
            message: data.message || 'submission successfull.',
        };



    } catch {
        return {
            success: false,
            message: 'Unable to connect to security servers. Please try again later.',
        };
    }
}