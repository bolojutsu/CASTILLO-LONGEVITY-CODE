import { postJson } from "./api";

export interface CheckoutRequest {
    planName: string;
}

export interface CheckoutResponse {
    url?: string;
    error?: string;
}

export const createCheckoutSession = async (planName: string): Promise<CheckoutResponse> => {
    try {
        const response = await postJson('/create-checkout-session', { planName } satisfies CheckoutRequest);

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