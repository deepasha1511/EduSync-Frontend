import API from '../services/apiService';

const studentService = {
    getAllCourses: async () => {
        const res = await API.get('/courses');
        return res.data;
    },

    enrollInCourse: async (courseId) => {
        const res = await API.post(`/courses/enroll/${courseId}`);
        return res.status === 200 || res.status === 201;
    },

    getEnrolledCourses: async (userId) => {
        try {
            const res = await API.get(`/enrollments/user/${userId}`);
            return res.data;
        } catch (error) {
            console.error('Failed to load enrolled courses:', error);
            throw error;
        }
    },

    getCourseDetails: async (courseId) => {
        const res = await API.get(`/courses/${courseId}`);
        return res.data; // includes assessments[]
    },

    getAssessment: async (assessmentId) => {
        try {
            const res = await API.get(`/assessments/${assessmentId}`);
            return res.data;
        } catch (error) {
            console.error('Failed to load assessment:', error);
            throw error;
        }
    },

    submitQuiz: async (assessmentId, resultPayload) => {
        try {
            const res = await API.post(`/results/submit`, resultPayload);
            return res.status === 200;
        } catch (err) {
            console.error('Quiz submission error:', err.response?.data || err.message);
            return false;
        }
    },

    getMyResults: async () => {
        const res = await API.get('/results/my');
        return res.data;
    }
};

export default studentService;
