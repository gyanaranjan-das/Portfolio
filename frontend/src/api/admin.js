import api from './index';

// Auth
export const login = (email, password) => api.post('/auth/login', { email, password });
export const getMe = () => api.get('/auth/me');

// Site Config
export const getSiteConfig = () => api.get('/config');
export const updateSiteConfig = (data) => api.put('/config', data);

// Upload
export const uploadImage = (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};
