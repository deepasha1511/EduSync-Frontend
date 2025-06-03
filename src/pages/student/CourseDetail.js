import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import studentService from '../../services/studentService';
import EnrollmentService from '../../services/EnrollmentService';
import { jwtDecode } from 'jwt-decode';

function CourseDetail() {
    const { courseId } = useParams();
    const [course, setCourse] = useState({});
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [enrolled, setEnrolled] = useState(false);
    const [error, setError] = useState('');

    const getUserIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (!token) return null;

        try {
            const decoded = jwtDecode(token);
            return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        } catch {
            return null;
        }
    };

    useEffect(() => {
        const userId = getUserIdFromToken();

        if (!userId) {
            setError("User not logged in. Please log in again.");
            setLoading(false);
            return;
        }

        studentService
            .getCourseDetails(courseId)
            .then((data) => {
                setCourse(data);
                setAssessments(data.assessments || []);
            })
            .catch(() => setError('Course not found.'));

        EnrollmentService.checkEnrollment(courseId, userId)
            .then(({ success, isEnrolled }) => {
                if (success) setEnrolled(isEnrolled);
            })
            .finally(() => setLoading(false));

    }, [courseId]);

    const handleEnroll = async () => {
        const userId = getUserIdFromToken();
        if (!userId) return alert('User ID missing. Please log in again.');

        try {
            const response = await EnrollmentService.enrollStudent(courseId, userId);
            if (response.success) {
                setEnrolled(true);
            } else {
                alert(response.error);
            }
        } catch {
            alert('Something went wrong during enrollment.');
        }

    };

    if (loading) return <div className="container mt-5 text-center">Loading course details...</div>;

    return (
        <div className="container mt-4">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-4">
                <h2 className="fw-bold">
                    <i className="bi bi-camera-reels-fill text-danger me-2"></i>
                    {course.title}
                </h2>
                <p className="text-muted">{course.description}</p>
            </div>

            <div className="row g-4">
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            {course.mediaUrl ? (
                                <div className="ratio ratio-16x9">{course.mediaUrl.includes('youtube.com') || course.mediaUrl.includes('youtu.be') ? ( <iframe className="rounded" src={ course.mediaUrl.includes('playlist?') ? course.mediaUrl.replace('playlist?', 'embed/videoseries?') : course.mediaUrl.replace('/watch?v=', '/embed/') } title="YouTube Playlist" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen ></iframe> ) : ( <video className="rounded" controls> <source src={course.mediaUrl} type="video/mp4" /> Your browser does not support the video tag. </video> )} </div> ) : ( <div className="alert alert-warning text-center"> <i className="bi bi-exclamation-triangle me-2"></i> No media available for this course. </div> )}
                            )}
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-primary text-white d-flex align-items-center">
                            <i className="bi bi-list-task me-2"></i>
                            Assessments
                        </div>
                        <div className="card-body p-2">

                            {!enrolled && (
                                <div className="text-center mb-3">
                                    <button onClick={handleEnroll} className="btn btn-success w-100">
                                        <i className="bi bi-box-arrow-in-right me-2"></i>Enroll to Access Quizzes
                                    </button>
                                </div>
                            )}

                            {assessments.length === 0 ? (
                                <p className="text-muted text-center">No assessments yet.</p>
                            ) : (
                                <ul className="list-group list-group-flush">
                                    {assessments.map(a => (
                                        <li
                                            key={a.assessmentId}
                                            className="list-group-item d-flex justify-content-between align-items-center"
                                        >
                                            <span>
                                                <i className="bi bi-question-circle me-2 text-success"></i>
                                                {a.title}
                                            </span>
                                            {enrolled ? (
                                                <Link
                                                    to={`/student/quiz/${a.assessmentId}`}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    <i className="bi bi-play-circle me-1"></i>
                                                    Quiz
                                                </Link>
                                            ) : (
                                                <button className="btn btn-sm btn-outline-secondary" disabled>
                                                    <i className="bi bi-lock-fill me-1"></i>
                                                    Locked
                                                </button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;
