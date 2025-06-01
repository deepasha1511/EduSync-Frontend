import API from '../services/apiService';


const EnrollmentService = {
    // Enroll a student in a course
    enrollStudent: async (courseId, userId) => {
        try {
            const response = await API.post('/enrollments', {
                courseId,
                userId
            });
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            if (error.response?.status === 409) {
                return {
                    success: false,
                    error: "You are already enrolled in this course."
                };
            }
            console.error('Enrollment failed:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data || 'Failed to enroll in course'
            };
        }
    },

    // Get all enrollments for a specific user
    getUserEnrollments: async (userId) => {
        try {
            const response = await API.get(`/enrollments/user/${userId}`);
            return {
                success: true,
                enrollments: response.data
            };
        } catch (error) {
            console.error('Failed to fetch user enrollments:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data || 'Failed to fetch enrollments'
            };
        }
    },

    // Get all enrollments for a specific course
    getCourseEnrollments: async (courseId) => {
        try {
            const response = await API.get(`/enrollments/course/${courseId}`);
            return {
                success: true,
                enrollments: response.data
            };
        } catch (error) {
            console.error('Failed to fetch course enrollments:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data || 'Failed to fetch course enrollments'
            };
        }
    },

    // Get a specific enrollment by ID
    getEnrollment: async (enrollmentId) => {
        try {
            const response = await API.get(`/enrollments/${enrollmentId}`);
            return {
                success: true,
                enrollment: response.data
            };
        } catch (error) {
            console.error('Failed to fetch enrollment:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data || 'Failed to fetch enrollment'
            };
        }
    },

    // Mark an enrollment as completed
    markAsCompleted: async (enrollmentId) => {
        try {
            const response = await API.patch(`/enrollments/${enrollmentId}/complete`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Failed to mark as completed:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data || 'Failed to update enrollment'
            };
        }
    },

    // Delete an enrollment
    deleteEnrollment: async (enrollmentId) => {
        try {
            const response = await API.delete(`/enrollments/${enrollmentId}`);
            return {
                success: true,
                data: response.data
            };
        } catch (error) {
            console.error('Failed to delete enrollment:', error.response?.data || error.message);
            return {
                success: false,
                error: error.response?.data || 'Failed to delete enrollment'
            };
        }
    },

    // Check if a user is enrolled in a course
    checkEnrollment: async (courseId, userId) => {
        try {
            const { success, enrollments } = await EnrollmentService.getUserEnrollments(userId);
            if (success) {
                const isEnrolled = enrollments.some(enrollment =>
                    enrollment.courseId === courseId && !enrollment.isCompleted
                );
                return {
                    success: true,
                    isEnrolled
                };
            }
            return {
                success: false,
                error: 'Failed to check enrollment status'
            };
        } catch (error) {
            console.error('Failed to check enrollment:', error);
            return {
                success: false,
                error: 'Failed to check enrollment status'
            };
        }
    }
};

export default EnrollmentService;