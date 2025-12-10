export const environment = {
    production: false,
    apiUrl: (window as any)['env']?.['apiUrl'] || 'http://localhost:8001/api',
};
