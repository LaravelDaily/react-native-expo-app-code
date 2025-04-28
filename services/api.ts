import axios from 'axios';

const API_BASE_URL = 'https://b051-78-58-236-130.ngrok-free.app/api';

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

export default api;