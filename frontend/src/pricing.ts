import { API_URL } from "./api";

export interface CheckoutRequest {
    planName: string;
}

export interface CheckoutResponse {
    url?: string;
    error?: string;
}

export interface CheckoutVerificationResponse {
    verified?: boolean;
    error?: string;
}

export const createCheckoutSession = async (planName: string): Promise<CheckoutResponse> => {
    try {
        const response = await fetch(`${API_URL}/create-checkout-session`, {
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

export const verifyCheckoutSession = async (
    sessionId: string,
    signal?: AbortSignal,
): Promise<CheckoutVerificationResponse> => {
    try {
        const response = await fetch(`${API_URL}/checkout-session-status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId }),
            signal,
        });
        const data: CheckoutVerificationResponse = await response.json();

        if (!response.ok) {
            return {
                error: data.error || "Unable to verify payment.",
            };
        }

        return { verified: data.verified === true };
    } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
            return {};
        }
        return {
            error: "Unable to verify payment.",
        };
    }
};