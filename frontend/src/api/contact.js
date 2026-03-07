import api from './index';

export const submitContact = (data) => api.post('/contact', data);
export const subscribe = (email) => api.post('/subscribe', { email });

// Admin
export const getContacts = () => api.get('/contact');
export const markAsRead = (id) => api.put(`/contact/${id}/read`);
export const deleteContact = (id) => api.delete(`/contact/${id}`);
export const getSubscribers = () => api.get('/subscribe');
