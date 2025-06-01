import React, { useEffect, useState } from 'react';
import studentService from '../../services/studentService';
import { Spinner } from 'react-bootstrap';

function Results() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        studentService.getMyResults()
            .then(data => setResults(data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container mt-5">
            <div className="text-center mb-4">
                <h3 className="fw-bold">
                    <i className="bi bi-bar-chart-line text-success me-2"></i>
                    My Quiz Results
                </h3>
                <p className="text-muted">Here’s how you’ve performed in your assessments.</p>
            </div>

            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            ) : results.length === 0 ? (
                <div className="alert alert-info text-center">
                    No results found yet. Take a quiz to see your progress!
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th scope="col"><i className="bi bi-journal-text me-1"></i> Assessment</th>
                                <th scope="col"><i className="bi bi-percent me-1"></i> Score</th>
                                <th scope="col"><i className="bi bi-calendar-date me-1"></i> Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(r => (
                                <tr key={r.resultId}>
                                    <td>{r.assessmentTitle || 'Quiz'}</td>
                                    <td><span className="fw-semibold">{r.score}</span></td>
                                    <td>{new Date(r.attemptDate).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Results;
