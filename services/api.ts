import axios from 'axios';
import { getSession, clearSession } from '@/services/auth';
import * as Device from 'expo-device';

const API_BASE_URL = 'https://37ed-78-58-236-130.ngrok-free.app/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        if (session) {
            config.headers.Authorization = `Bearer ${session}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            clearSession();
        }

        if (error.response.status === 422) {
            // Return validation errors for further handling
            return Promise.reject({ validationErrors: error.response.data.errors });
        }
        
        return Promise.reject(error);
    }
);

// Example API call
export const fetchCategories = async () => {
    const response = await api.get('/categories');

    if (response.status !== 200) {
        throw new Error('Failed to fetch categories');
    }

    return response.data;
};

export const fetchCategoryById = async (id: Number) => {
    const response = await api.get(`/categories/${id}`);

    if (response.status !== 200) {
        throw new Error('Failed to fetch category');
    }

    return response.data;
}

export const updateCategory = async (id: Number, data: any) => {
    const response = await api.put(`/categories/${id}`, data);

    if (response.status !== 200) {
        throw new Error('Failed to update category');
    }

    return response.data;
};

export const createCategory = async (data: any) => {
    const response = await api.post('/categories', data);

    if (response.status !== 201) {
        throw new Error('Failed to create category');
    }

    return response.data;
}

export const deleteCategory = async (id: Number) => {
    const response = await api.delete(`/categories/${id}`);

    if (response.status !== 200) {
        throw new Error('Failed to delete category');
    }

    return response.data;
};

export const login = async (data: any) => {
    const response = await api.post('/auth/login', {
        ...data,
        device_name: Device.deviceName
    });

    if (response.status !== 200) {
        throw new Error('Failed to login');
    }

    return response.data;
};

export const register = async (data: any) => {
    const response = await api.post('/auth/register', {
        ...data,
        password_confirmation: data.passwordConfirmation,
        device_name: Device.deviceName
    });

    if (response.status !== 200) {
        throw new Error('Failed to register');
    }

    return response.data;
}


export const fetchTransactions = async () => {
    const response = await api.get('/transactions');

    if (response.status !== 200) {
        throw new Error('Failed to fetch transactions');
    }

    return response.data;
}

export const fetchTransactionById = async (id: Number) => {
    const response = await api.get(`/transactions/${id}`);

    if (response.status !== 200) {
        throw new Error('Failed to fetch transaction');
    }

    return response.data;
}

export const updateTransaction = async (id: Number, data: any) => {
    const response = await api.put(`/transactions/${id}`, data);

    if (response.status !== 200) {
        throw new Error('Failed to update transaction');
    }

    return response.data;
}

export const deleteTransaction = async (id: Number) => {
    const response = await api.delete(`/transactions/${id}`);

    if (response.status !== 200) {
        throw new Error('Failed to delete transaction');
    }

    return response.data;
}

export const createTransaction = async (data: any) => {
    const response = await api.post('/transactions', data);

    if (response.status !== 201) {
        throw new Error('Failed to create transaction');
    }

    return response.data;
}

export default api;