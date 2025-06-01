import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import studentService from '../../services/studentService';

function QuizPage() {
    const { assessmentId } = useParams();
    const [assessment, setAssessment] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);

    useEffect(() => {
        const loadAssessment = async () => {
            try {
                const data = await studentService.getAssessment(assessmentId);
                const parsed = typeof data.questions === 'string' ? JSON.parse(data.questions) : data.questions;

                setAssessment(data);
                setQuestions(parsed || []);
            } catch (err) {
                console.error('Failed to load assessment:', err);
            }
        };

        loadAssessment();
    }, [assessmentId]);

    const handleChange = (qIndex, selectedOption) => {
        setAnswers((prev) => ({ ...prev, [qIndex]: selectedOption }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let correct = 0;
        questions.forEach((q, i) => {
            if (answers[i] === q.answer) correct++;
        });

        const total = questions.length;
        const calculatedScore = Math.round((correct / total) * 100);
        setScore(calculatedScore);

        const resultPayload = {
            assessmentId,
            answers: Object.entries(answers).map(([index, answer]) => ({
                questionIndex: parseInt(index),
                answer
            })),
            score: calculatedScore
        };

        const ok = await studentService.submitQuiz(assessmentId, resultPayload);
        if (ok) setSubmitted(true);
    };

    if (!assessment) return <div className="container mt-4">Loading quiz...</div>;

    return (
        <div className="container mt-4">
            <h4>{assessment.title} - Quiz</h4>
            <form onSubmit={handleSubmit}>
                {questions.map((q, i) => (
                    <div key={i} className="mb-4">
                        <strong>{i + 1}. {q.question}</strong>
                        <div className="ms-3 mt-2">
                            {q.options.map((option, j) => {
                                const isSelected = answers[i] === option;
                                const isCorrect = submitted && option === q.answer;
                                const isWrong = submitted && isSelected && option !== q.answer;

                                return (
                                    <div
                                        key={j}
                                        className={`form-check ${isCorrect ? 'bg-success text-white p-2 rounded' : isWrong ? 'bg-danger text-white p-2 rounded' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            name={`question-${i}`}
                                            value={option}
                                            checked={isSelected}
                                            onChange={() => handleChange(i, option)}
                                            disabled={submitted}
                                        />
                                        <label className="form-check-label">{option}</label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
                {!submitted && <button className="btn btn-primary">Submit Quiz</button>}
                {submitted && (
                    <div className="alert alert-info mt-4">
                        <h5>Quiz Submitted Successfully!</h5>
                        <p>Your Score: <strong>{score}%</strong></p>
                    </div>
                )}
            </form>
        </div>
    );
}

export default QuizPage;
