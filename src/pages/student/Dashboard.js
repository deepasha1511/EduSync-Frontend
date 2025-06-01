import React from 'react';
import { Link } from 'react-router-dom';

function StudentDashboard() {
    return (
        <div className="container mt-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold">
                    <i className="bi bi-mortarboard text-info me-2"></i>
                    Student Dashboard
                </h2>
                <p className="text-muted">Welcome! View courses, take assessments, and track your progress with ease.</p>
            </div>

            <div className="row g-4 justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center">
                            <i className="bi bi-book-half fs-1 text-primary mb-3"></i>
                            <h5 className="card-title">My Courses</h5>
                            <p className="card-text text-muted">Access your enrolled courses and explore new learning material.</p>
                            <Link to="/student/courses" className="btn btn-outline-primary">View Courses</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm border-0 h-100">
                        <div className="card-body text-center">
                            <i className="bi bi-graph-up-arrow fs-1 text-warning mb-3"></i>
                            <h5 className="card-title">Track Progress</h5>
                            <p className="card-text text-muted">Keep track of your scores, completed quizzes, and improvements.</p>
                            <Link to="/student/results" className="btn btn-outline-warning">View Progress</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <p className="text-secondary">
                    <i className="bi bi-lightbulb me-2"></i>
                    Tip: Stay consistent and explore all your courses for the best results!
                </p>
            </div>
        </div>
    );
}

export default StudentDashboard;
