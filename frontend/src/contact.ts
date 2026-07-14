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
        const response = await fetch('http://127.0.0.1:5000/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

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



    } catch (error) {
        console.error('[Contact Service Error]:', error);
        return {
            success: false,
            message: 'Unable to connect to security servers. Please try again later.',
        };
    }
}