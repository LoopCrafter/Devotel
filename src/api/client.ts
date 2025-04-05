import axiosInstance from './axios';

export const api = {
  get: async (url: string, config = {}) => {
    try {
      const response = await axiosInstance.get(url, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
  post: async (url: string, data: any, config = {}) => {
    try {
      const response = await axiosInstance.post(url, data, config);
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },
};

function handleError(error: any) {
  if (error.response) {
    console.error('API Error:', error.response.data);
  } else {
    console.error('Network Error:', error.message);
  }
  throw error;
}