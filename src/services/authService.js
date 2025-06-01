import API from '../services/apiService';

const authService = {
    login: async (email, password) => {
        try {
            const res = await API.post('/auth/login', { email, password });

            return {
                success: true,
                token: res.data.token,
                role: res.data.role,
                userId: res.data.userId,
                name: res.data.name
            };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || 'Login failed'
            };
        }
    },

    register: async (user) => {
        try {
            await API.post('/auth/register', user);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || 'Registration failed'
            };
        }
    },
};

export default authService;
