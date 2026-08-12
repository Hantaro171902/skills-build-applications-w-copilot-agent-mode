// Get API base URL based on environment (Codespaces or localhost)
export const getApiBaseUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    return `http://localhost:${process.env.PORT || 8000}`;
};
// Get CORS allowed origins based on environment
export const getCorsOrigins = () => {
    const origins = ['http://localhost:5173', 'http://localhost:3000'];
    if (process.env.CODESPACE_NAME) {
        // Add Codespaces frontend URL
        origins.push(`https://${process.env.CODESPACE_NAME}-5173.app.github.dev`);
    }
    return origins;
};
//# sourceMappingURL=apiConfig.js.map