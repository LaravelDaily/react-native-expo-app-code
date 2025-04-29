import axios from 'axios';

const API_BASE_URL = 'https://ced1-78-58-236-130.ngrok-free.app/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export default api;