import API from '../services/apiService';

const assessmentService = {
    getInstructorAssessments: async () => {
        const res = await API.get('/assessments/my');
        return res.data;
    },

    getSubmissions: async (assessmentId) => {
        const res = await API.get(`/results/byAssessment/${assessmentId}`);
        return res.data;
    },

    createAssessment: async (assessment) => {
        const res = await API.post('/assessments', assessment);
        return res.status === 200 || res.status === 201;
    },

    getResultById: async (resultId) => {
        const res = await API.get(`/results/${resultId}`);
        return res.data;
    }
};

export default assessmentService;
