import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import courseService from '../../services/courseService';
import assessmentService from '../../services/assessmentService';

function AssessmentForm() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({
        courseId: '',
        title: '',
        maxScore: 100,
    });
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        text: '',
        options: ['', '', '', ''],
        correctAnswer: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        courseService.getMyCourses().then(setCourses);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleQuestionChange = (e) => {
        setCurrentQuestion({ ...currentQuestion, [e.target.name]: e.target.value });
    };

    const handleOptionChange = (index, value) => {
        const newOptions = [...currentQuestion.options];
        newOptions[index] = value;
        setCurrentQuestion({ ...currentQuestion, options: newOptions });
    };

    const addQuestion = () => {
        if (!currentQuestion.text || !currentQuestion.correctAnswer) {
            alert('Please fill in the question text and correct answer');
            return;
        }
        setQuestions([...questions, currentQuestion]);
        setCurrentQuestion({
            text: '',
            options: ['', '', '', ''],
            correctAnswer: ''
        });
    };

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (questions.length === 0) {
            alert('Please add at least one question');
            return;
        }

        try {
            const assessmentData = {
                ...form,
                questions: JSON.stringify(questions.map(q => ({
                    question: q.text,
                    options: q.options.filter(opt => opt !== ''),
                    answer: q.correctAnswer
                })))
            };

            const ok = await assessmentService.createAssessment(assessmentData);
            if (ok) navigate('/instructor/assessments');
            else alert('Failed to create assessment');
        } catch (error) {
            alert('Error creating assessment');
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h3 className="card-title mb-4">
                                <i className="bi bi-plus-circle-fill text-primary me-2"></i>
                                Create Assessment
                            </h3>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Course</label>
                                    <select 
                                        name="courseId" 
                                        className="form-select" 
                                        onChange={handleChange} 
                                        required
                                        value={form.courseId}
                                    >
                                        <option value="">-- Select Course --</option>
                                        {courses.map(c => (
                                            <option key={c.courseId} value={c.courseId}>{c.title}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Assessment Title</label>
                                    <input 
                                        type="text" 
                                        name="title" 
                                        className="form-control" 
                                        onChange={handleChange} 
                                        value={form.title}
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Max Score</label>
                                    <input 
                                        type="number" 
                                        name="maxScore" 
                                        className="form-control" 
                                        onChange={handleChange} 
                                        value={form.maxScore}
                                        min="1"
                                        required 
                                    />
                                </div>

                                <hr className="my-4" />

                                <h5 className="mb-3">
                                    <i className="bi bi-question-circle-fill text-success me-2"></i>
                                    Questions
                                </h5>

                                {/* Question List */}
                                {questions.map((q, index) => (
                                    <div key={index} className="card mb-3 bg-light">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h6 className="card-title">Question {index + 1}</h6>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeQuestion(index)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                            <p className="mb-2">{q.text}</p>
                                            <ul className="list-unstyled ms-3">
                                                {q.options.filter(opt => opt !== '').map((opt, i) => (
                                                    <li key={i} className={opt === q.correctAnswer ? 'text-success fw-bold' : ''}>
                                                        {opt === q.correctAnswer ? '✓ ' : '○ '}
                                                        {opt}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}

                                {/* Add New Question Form */}
                                <div className="card mb-4">
                                    <div className="card-body">
                                        <h6 className="card-title mb-3">Add New Question</h6>
                                        
                                        <div className="mb-3">
                                            <label className="form-label">Question Text</label>
                                            <input
                                                type="text"
                                                name="text"
                                                className="form-control"
                                                value={currentQuestion.text}
                                                onChange={handleQuestionChange}
                                                placeholder="Enter your question"
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Options</label>
                                            {currentQuestion.options.map((option, index) => (
                                                <div key={index} className="input-group mb-2">
                                                    <span className="input-group-text">
                                                        {String.fromCharCode(65 + index)}
                                                    </span>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                                        placeholder={`Option ${index + 1}`}
                                                    />
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">Correct Answer</label>
                                            <select
                                                name="correctAnswer"
                                                className="form-select"
                                                value={currentQuestion.correctAnswer}
                                                onChange={handleQuestionChange}
                                            >
                                                <option value="">Select correct answer</option>
                                                {currentQuestion.options.map((option, index) => (
                                                    option && (
                                                        <option key={index} value={option}>
                                                            {option}
                                                        </option>
                                                    )
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-outline-success"
                                            onClick={addQuestion}
                                        >
                                            <i className="bi bi-plus-circle me-2"></i>
                                            Add Question
                                        </button>
                                    </div>
                                </div>

                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-primary">
                                        <i className="bi bi-check-circle me-2"></i>
                                        Create Assessment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssessmentForm;
