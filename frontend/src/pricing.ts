export interface CheckoutRequest {
    planName: String;
}

export interface CheckoutResponse {
    url?: string;
    error?: string;
}

const API_URL = "http://localhost:5000";

export const createCheckoutSession = async (planName: string): Promise<CheckoutResponse> => {
    try {
        const response = await fetch(`${API_URL}/api/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ planName } satisfies CheckoutRequest),
        });

        const data: CheckoutResponse = await response.json();

        if (!response.ok) {
            return {
                error: data.error || 'Failed to initialize session. Please try again.',
            };
        }

        return { url: data.url };

    } catch (error) {
        console.error('[Pricing Service Error]:', error);
        return {
            error: 'Unable to connect to the payment gateway. Please verify your connection.',
        };
    }
};