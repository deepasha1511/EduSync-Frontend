import API from '../services/apiService';

const courseService = {
    getMyCourses: async () => {
        const res = await API.get('/courses/my');
        return res.data;
    },

    createCourse: async (course) => {
        const res = await API.post('/courses', course);
        return res.status === 200 || res.status === 201;
    },

    updateCourse: async (id, course) => {
        const res = await API.put(`/courses/${id}`, course);
        return res.status === 200 || res.status === 204;
    },
};

export default courseService;
