import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import studentService from '../../services/studentService';

function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        studentService.getAllCourses().then(setCourses);
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-center mb-5 display-5 fw-semibold">
                <i className="bi bi-mortarboard-fill me-2 text-primary"></i>
                Discover Your Next Skill
            </h2>

            <div className="row g-4 justify-content-center">
                {courses.map(course => (
                    <div key={course.courseId} className="col-sm-10 col-md-6 col-lg-4">
                        <Link to={`/student/course/${course.courseId}`} className="text-decoration-none">
                            <div className="card h-100 p-3 shadow-lg border-0 rounded-4 position-relative overflow-hidden bg-light">
                                <div className="card-body">
                                    <h4 className="card-title mb-3 text-dark">
                                        <i className="bi bi-book-half me-2 text-info"></i>
                                        {course.title}
                                    </h4>

                                    {/* Description (truncated but expands on hover) */}
                                    <div className="description-container text-secondary">
                                        <div className="description-content">
                                            {course.description}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-transparent border-0 pt-0">
                                    <span className="text-primary fw-medium">
                                        <i className="bi bi-box-arrow-up-right me-1"></i>
                                        Learn More
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Inline style block to handle truncation + hover expansion */}
            <style>{`
                .description-container {
                    max-height: 80px;
                    overflow: hidden;
                    transition: max-height 0.4s ease;
                }
                .card:hover .description-container {
                    max-height: 300px; /* reveal more smoothly */
                }
                .description-content {
                    transition: color 0.3s ease;
                }
                .card:hover .description-content {
                    color: #343a40;
                }
            `}</style>
        </div>
    );
}

export default CourseList;
