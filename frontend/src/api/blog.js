import api from './index';

export const getPosts = (all = false) => api.get(`/blog${all ? '?all=true' : ''}`);
export const getPost = (slug) => api.get(`/blog/${slug}`);

// Admin
export const createPost = (data) => api.post('/blog', data);
export const updatePost = (id, data) => api.put(`/blog/${id}`, data);
export const deletePost = (id) => api.delete(`/blog/${id}`);
