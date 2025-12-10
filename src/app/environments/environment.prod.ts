export const environment = {
    production: true,
    apiUrl: (window as any)['env']?.['apiUrl'] || 'https://cross.aqlaan.com/api',
};
