import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import courseService from '../../services/courseService';

function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        courseService.getMyCourses().then(data => setCourses(data));
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold">
                    <i className="bi bi-easel-fill me-2 text-primary"></i>Your Courses
                    {courses.length > 0 && (
                        <span className="badge bg-secondary ms-2">{courses.length}</span>
                    )}
                </h3>
                <Link to="/instructor/courses/new" className="btn btn-success">
                    <i className="bi bi-plus-circle me-2"></i>Add Course
                </Link>
            </div>

            {courses.length === 0 ? (
                <div className="alert alert-warning text-center">
                    <i className="bi bi-emoji-frown me-2"></i>No courses found.
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {courses.map(course => (
                        <div key={course.courseId} className="col">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">
                                        <i className="bi bi-journal-text me-2 text-info"></i>
                                        {course.title}
                                    </h5>
                                    <p className="card-text text-muted flex-grow-1">{course.description}</p>
                                    <Link
                                        to={`/instructor/courses/edit/${course.courseId}`}
                                        className="btn btn-outline-primary mt-auto"
                                    >
                                        <i className="bi bi-pencil-square me-1"></i>Edit Course
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

export default CourseList;
