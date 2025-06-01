import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import courseService from '../../services/courseService';
import API from '../../services/apiService';

function CourseForm() {
    const { courseId } = useParams();
    const isEdit = !!courseId;
    const [form, setForm] = useState({ title: '', description: '', mediaUrl: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (isEdit) {
            API.get(`/courses/${courseId}`)
                .then((res) => setForm(res.data))
                .catch((err) => console.error('Error loading course:', err));
        }
    }, [isEdit, courseId]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = isEdit
            ? await courseService.updateCourse(courseId, form)
            : await courseService.createCourse(form);
        if (success) navigate('/instructor/courses');
    };

    return (
        <div className="container mt-4 col-md-6">
            <h3>{isEdit ? 'Edit' : 'Create'} Course</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Media URL</label>
                    <input
                        type="text"
                        name="mediaUrl"
                        className="form-control"
                        value={form.mediaUrl}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn btn-primary">{isEdit ? 'Update' : 'Create'} Course</button>
            </form>
        </div>
    );
}

export default CourseForm;
