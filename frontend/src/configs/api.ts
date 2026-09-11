function resolveApiUrl(): string {
    const fromEnv = import.meta.env.VITE_API_URL;
    if (typeof fromEnv === "string" && fromEnv.trim() !== "") {
        return fromEnv.trim().replace(/\/$/, "");
    }

    // Local Vite talks to Flask on port 5000. Production uses same-origin
    // paths so Vercel can rewrite /contact (and related routes) to Flask.
    if (import.meta.env.DEV) {
        return "http://127.0.0.1:5000";
    }

    return "";
}

export const API_URL = resolveApiUrl();
