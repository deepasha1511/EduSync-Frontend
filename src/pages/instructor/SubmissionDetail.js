import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import assessmentService from '../../services/assessmentService';

function SubmissionDetail() {
    const { resultId } = useParams();
    const [result, setResult] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const res = await assessmentService.getResultById(resultId);
                setResult(res);
                setAnswers(res?.answers || []);
            } catch (err) {
                console.error(err);
                setError('Failed to load result.');
            } finally {
                setLoading(false);
            }
        };

        fetchResult();
    }, [resultId]);

    if (loading) return (
        <div className="container mt-4 text-center">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="container mt-4">
            <div className="alert alert-danger">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {error}
            </div>
        </div>
    );

    if (!result) return (
        <div className="container mt-4">
            <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                No result found.
            </div>
        </div>
    );

    return (
        <div className="container mt-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">
                    <i className="bi bi-file-earmark-text-fill text-primary me-2"></i>
                    Submission Review
                </h3>
                <Link to="/instructor/assessments" className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left-circle me-1"></i> Back
                </Link>
            </div>

            {/* Student Info Card */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className="card-title mb-3">
                                <i className="bi bi-person-circle text-secondary me-2"></i>
                                Student Information
                            </h5>
                            <p className="mb-2"><strong>Name:</strong> {result.studentName || 'N/A'}</p>
                            <p className="mb-2"><strong>ID:</strong> {result.studentId}</p>
                            <p className="mb-0">
                                <strong>Attempted:</strong> {new Date(result.attemptDate).toLocaleString()}
                            </p>
                        </div>
                        <div className="col-md-6">
                            <h5 className="card-title mb-3">
                                <i className="bi bi-journal-text text-secondary me-2"></i>
                                Assessment Details
                            </h5>
                            <p className="mb-2"><strong>Title:</strong> {result.assessmentTitle}</p>
                            <p className="mb-2">
                                <strong>Score:</strong>
                                <span className={`badge ms-2 ${result.score >= 70 ? 'bg-success' : 'bg-warning'}`}>
                                    {result.score}%
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Questions and Answers Section */}
            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h5 className="card-title mb-4">
                        <i className="bi bi-question-circle-fill text-info me-2"></i>
                        Questions & Answers
                    </h5>

                    {answers.length === 0 ? (
                        <div className="alert alert-info">
                            <i className="bi bi-info-circle me-2"></i>
                            No answers available for this submission.
                        </div>
                    ) : (
                        <div className="accordion" id="answersAccordion">
                            {answers.map((a, i) => {
                                const isCorrect = a.studentAnswer?.trim().toLowerCase() === a.correctAnswer?.trim().toLowerCase();

                                return (
                                    <div className="accordion-item border-0 mb-3 shadow-sm" key={i}>
                                        <h2 className="accordion-header" id={`heading${i}`}>
                                            <button
                                                className={`accordion-button ${i !== 0 ? 'collapsed' : ''}`}
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#collapse${i}`}
                                            >
                                                <div className="d-flex align-items-center w-100">
                                                    <span className="me-3">Question {i + 1}</span>
                                                    {/* {isCorrect ? (
                                                        <span className="badge bg-success ms-auto">Correct</span>
                                                    ) : (
                                                        <span className="badge bg-danger ms-auto">Incorrect</span>
                                                    )} */}
                                                </div>
                                            </button>
                                        </h2>
                                        <div
                                            id={`collapse${i}`}
                                            className={`accordion-collapse collapse ${i === 0 ? 'show' : ''}`}
                                            data-bs-parent="#answersAccordion"
                                        >
                                            <div className="accordion-body">
                                                <div className="mb-3">
                                                    <h6 className="fw-bold mb-2">Question:</h6>
                                                    <p className="mb-3">{a.question}</p>
                                                </div>

                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="card bg-light">
                                                            <div className="card-body">
                                                                <h6 className="card-title">
                                                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                                    Correct Answer
                                                                </h6>
                                                                <p className="card-text text-success fw-bold mb-0">
                                                                    {a.correctAnswer}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="card bg-light">
                                                            <div className="card-body">
                                                                <h6 className="card-title">
                                                                    <i className="bi bi-pencil-fill text-primary me-2"></i>
                                                                    Student's Answer
                                                                </h6>
                                                                <p className={`card-text fw-bold mb-0 ${isCorrect ? 'text-success' : 'text-danger'}`}>
                                                                    {a.studentAnswer || 'No Answer'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SubmissionDetail;
