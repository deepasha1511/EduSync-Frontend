import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import assessmentService from '../../services/assessmentService';

function SubmissionsView() {
    const { assessmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        assessmentService.getSubmissions(assessmentId)
            .then(setSubmissions)
            .catch(err => console.error("Failed to fetch submissions:", err))
            .finally(() => setLoading(false));
    }, [assessmentId]);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">
                    <i className="bi bi-card-checklist me-2 text-primary"></i>Submissions
                </h3>
                <Link to="/instructor/assessments" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left-circle me-1"></i> Back to Assessments
                </Link>
            </div>

            {loading ? (
                <div className="text-center text-muted">Loading submissions...</div>
            ) : submissions.length === 0 ? (
                <div className="alert alert-info text-center">
                    <i className="bi bi-info-circle me-2"></i>
                    No submissions found yet.
                </div>
            ) : (
                <div className="card shadow-sm border-0">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table align-middle table-hover">
                                <thead className="table-light">
                                    <tr>
                                        <th><i className="bi bi-person-fill me-1"></i>Student</th>
                                        <th><i className="bi bi-award-fill me-1"></i>Score</th>
                                        <th><i className="bi bi-calendar2-week me-1"></i>Attempt Date</th>
                                        <th><i className="bi bi-eye me-1"></i>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.map(s => (
                                        <tr key={s.resultId}>
                                            <td className="fw-semibold text-dark">
                                                <i className="bi bi-person-circle me-2 text-secondary"></i>
                                                {s.userName || s.userId}
                                            </td>
                                            <td>
                                                <span className="badge bg-success fs-6">{s.score}%</span>
                                            </td>
                                            <td>{new Date(s.attemptDate).toLocaleString()}</td>
                                            <td>
                                                <Link
                                                    to={`/instructor/results/${s.resultId}`}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    <i className="bi bi-eye me-1"></i>
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SubmissionsView;
