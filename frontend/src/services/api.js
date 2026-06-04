import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      
      window.dispatchEvent(new Event('auth-session-expired'));
    }
    return Promise.reject(error);
  }
);



export const getMenu = async () => {
  const response = await api.get('/menu');
  return response.data;
};


export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};


export const createPaymentOrder = async (amount) => {
  const response = await api.post('/payments/create-order', {
    amount
  });
  return response.data;
};


export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

/**
 * Get all customer orders (Admin only)
 * @param {string} [status] Optional filter by status
 */
export const getOrders = async (status) => {
  const params = {};
  if (status && status !== 'All') {
    params.status = status;
  }
  const response = await api.get('/orders', { params });
  return response.data;
};


export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/orders/${id}/status`, { status });
  return response.data;
};


export const getMenuItems = async () => {
  const response = await api.get('/menu');
  return response.data;
};


export const createMenuItem = async (itemData) => {
  const response = await api.post('/menu', itemData);
  return response.data;
};


export const updateMenuItem = async (id, itemData) => {
  const response = await api.put(`/menu/${id}`, itemData);
  return response.data;
};


export const deleteMenuItem = async (id) => {
  const response = await api.delete(`/menu/${id}`);
  return response.data;
};

export default api;
