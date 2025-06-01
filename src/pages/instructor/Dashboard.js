import React from 'react';
import { Link } from 'react-router-dom';

function InstructorDashboard() {
    return (
        <div className="container-fluid py-4 min-vh-100 bg-body text-body">
            <div className="container">
                <div className="text-center mb-4">
                    <h2 className="fw-bold">
                        <i className="bi bi-speedometer2 me-2"></i>Instructor Dashboard
                    </h2>
                    <p className="text-muted small">
                        Manage your teaching journey – create, assess, and track progress seamlessly.
                    </p>
                </div>

                <div className="row g-4 justify-content-center">
                    <div className="col-sm-6 col-md-5 col-lg-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-book fs-1 text-primary mb-3"></i>
                                <h5 className="card-title">Manage Courses</h5>
                                <p className="card-text small text-muted">
                                    Create and update your courses for students to enroll and learn.
                                </p>
                                <Link to="/instructor/courses" className="btn btn-outline-success btn-sm">
                                    Go to Courses
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-5 col-lg-4">
                        <div className="card border-0 shadow-sm h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-graph-up-arrow fs-1 text-warning mb-3"></i>
                                <h5 className="card-title">Assessments</h5>
                                <p className="card-text small text-muted">
                                    Design quizzes to test student understanding and engagement.
                                </p>
                                <Link to="/instructor/assessments" className="btn btn-outline-primary btn-sm">
                                    Go to Assessments
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-md-4">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-bar-chart-line-fill fs-1 text-warning mb-3"></i>
                                <h5 className="card-title">Student Results</h5>
                                <p className="card-text text-muted">Analyze submissions and track performance of your students.</p>
                                <Link to="/instructor/results" className="btn btn-outline-warning">View Results</Link>
                            </div>
                        </div>
                    </div> */}
                </div>

                <div className="text-center mt-4">
                    <p className="small text-muted">
                        <i className="bi bi-lightbulb me-1"></i>
                        Tip: Use the navigation bar to quickly access different tools and insights.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InstructorDashboard;
