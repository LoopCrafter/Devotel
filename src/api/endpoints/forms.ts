import { api } from '../client';

export const fetchFormStructure = () => api.get('/api/insurance/forms');

export const submitForm = (data: any) => api.post('/api/insurance/forms/submit', data);