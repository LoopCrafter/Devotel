import { api } from '../client';

export const fetchFormStructure = () => api.get('/forms');

export const submitForm = (data: any) => api.post('/forms/submit', data);