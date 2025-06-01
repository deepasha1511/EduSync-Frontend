import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import assessmentService from '../../services/assessmentService';

function AssessmentList() {
    const [assessments, setAssessments] = useState([]);

    useEffect(() => {
        assessmentService.getInstructorAssessments().then(setAssessments);
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">
                    <i className="bi bi-clipboard-check-fill text-warning me-2"></i>Your Assessments
                    {assessments.length > 0 && (
                        <span className="badge bg-secondary ms-2">{assessments.length}</span>
                    )}
                </h3>
                <Link to="/instructor/assessments/new" className="btn btn-success">
                    <i className="bi bi-plus-circle me-2"></i>Create Assessment
                </Link>
            </div>

            {assessments.length === 0 ? (
                <div className="alert alert-info text-center">
                    <i className="bi bi-info-circle me-2"></i>No assessments created yet.
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {assessments.map(a => (
                        <div key={a.assessmentId} className="col">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">
                                        <i className="bi bi-journal-text me-2 text-primary"></i>
                                        {a.title}
                                    </h5>
                                    <p className="card-text text-muted">
                                        View student submissions and quiz status.
                                    </p>
                                    <Link
                                        to={`/instructor/assessments/${a.assessmentId}/submissions`}
                                        className="btn btn-outline-primary mt-auto"
                                    >
                                        <i className="bi bi-eye me-1"></i>View Submissions
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AssessmentList;
