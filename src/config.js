export const SERVER_URL =
    import.meta.env.VITE_API_NODE_ENVIRONMENT === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : "http://localhost:5000";