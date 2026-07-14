// Shared API client utilities.
// Centralizes the backend base URL and the JSON POST pattern that was
// previously duplicated across chatbot.ts, contact.ts and pricing.ts.

const env = import.meta.env as Record<string, string | undefined>;

export const API_URL = (env.VITE_API_URL ?? "http://localhost:5000").replace(/\/+$/, "");

/**
 * POST a JSON payload to an API endpoint.
 * @param path Endpoint path beginning with "/" (e.g. "/contact").
 * @param body Value to serialize as the JSON request body.
 */
export const postJson = (path: string, body: unknown): Promise<Response> =>
    fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
