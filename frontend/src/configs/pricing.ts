export interface CheckoutRequest {
    planName: String;
}

export interface CheckoutResponse {
    url?: string;
    error?: string;
}

export interface VerifySessionResponse {
    verified: boolean;
    customer_email?: string;
    error?: string;
}

export const createCheckoutSession = async (planName: string): Promise<CheckoutResponse> => {
    try {
        const response = await fetch('http://localhost:5000/create-checkout-session', {
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

export const verifySession = async (sessionId: string): Promise<VerifySessionResponse> => {
    try {
        const response = await fetch(`http://localhost:5000/verify-session/${sessionId}`, {
            method: 'GET',
        });

        const data: VerifySessionResponse = await response.json();

        if (!response.ok) {
            return {
                verified: false,
                error: data.error || 'Unable to verify payment session.',
            };
        }

        return data;

    } catch (error) {
        console.error('[Session Verification Error]:', error);
        return {
            verified: false,
            error: 'Unable to connect to the payment gateway. Please verify your connection.',
        };
    }
};