import axios from 'axios';

// Load base API URL from Vite environment variables (fallback to localhost:5000)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Inject JWT token into header if cached
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Response Interceptor: Catch 401 Unauthorized errors to handle session expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid/expired
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Dispatch a custom event to notify AuthContext to update state
      window.dispatchEvent(new Event('auth-session-expired'));
    }
    return Promise.reject(error);
  }
);

// --- Customer-Facing Endpoints ---

/**
 * Fetch all available menu items
 */
export const getMenu = async () => {
  const response = await api.get('/menu');
  return response.data;
};

/**
 * Place a new order
 */
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// --- Admin Panel Endpoints ---

/**
 * Authenticate administrator
 */
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

/**
 * Update an order's status (Admin only)
 */
export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/orders/${id}/status`, { status });
  return response.data;
};

/**
 * Fetch all menu items for administration list (Admin only)
 */
export const getMenuItems = async () => {
  const response = await api.get('/menu');
  return response.data;
};

/**
 * Add a new item to the menu (Admin only)
 */
export const createMenuItem = async (itemData) => {
  const response = await api.post('/menu', itemData);
  return response.data;
};

/**
 * Edit an existing menu item (Admin only)
 */
export const updateMenuItem = async (id, itemData) => {
  const response = await api.put(`/menu/${id}`, itemData);
  return response.data;
};

/**
 * Delete a menu item (Admin only)
 */
export const deleteMenuItem = async (id) => {
  const response = await api.delete(`/menu/${id}`);
  return response.data;
};

export default api;
