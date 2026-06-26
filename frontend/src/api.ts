// In production (Vercel), frontend and API share the same domain — use relative paths.
// In local dev, Vite runs on :5173 and Flask on :5000, so we point at localhost unless overridden.
export const API_URL =
    import.meta.env.VITE_API_URL ??
    (import.meta.env.DEV ? "http://localhost:5000" : "");



    