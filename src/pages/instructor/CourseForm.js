import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import courseService from '../../services/courseService';
import API from '../../services/apiService';

function CourseForm() {
    const { courseId } = useParams();
    const isEdit = !!courseId;
    const navigate = useNavigate();

    const [form, setForm] = useState({ title: '', description: '', mediaUrl: '' });
    const [uploadOption, setUploadOption] = useState('youtube');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEdit) {
            API.get(/courses/$, { courseId })
                .then(res => {
                    setForm(res.data);
                    setUploadOption(res.data.mediaUrl?.includes('youtube') ? 'youtube' : 'file');
                })
                .catch(err => console.error('Error loading course:', err));
        }
    }, [isEdit, courseId]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await API.post('/courses/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setForm((prev) => ({ ...prev, mediaUrl: res.data.mediaUrl }));
        } catch (err) {
            setError('Upload failed.');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = isEdit
            ? await courseService.updateCourse(courseId, form)
            : await courseService.createCourse(form);
        if (success) navigate('/instructor/courses');
    };

    return (
        <div className="container mt-4 col-md-8 col-lg-6">
            <h3 className="mb-4">{isEdit ? 'Edit' : 'Create'} Course</h3>

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

                <div className="form-group mb-2">
                    <label className="form-label">Media Source</label>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="optionYoutube"
                            checked={uploadOption === 'youtube'}
                            onChange={() => setUploadOption('youtube')}
                        />
                        <label htmlFor="optionYoutube" className="form-check-label">YouTube Playlist URL</label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="optionFile"
                            checked={uploadOption === 'file'}
                            onChange={() => setUploadOption('file')}
                        />
                        <label htmlFor="optionFile" className="form-check-label">Upload File to Blob</label>
                    </div>
                </div>

                {uploadOption === 'youtube' ? (
                    <div className="form-group mb-3">
                        <label>YouTube Playlist URL</label>
                        <input
                            type="text"
                            name="mediaUrl"
                            className="form-control"
                            value={form.mediaUrl}
                            onChange={handleChange}
                            placeholder="https://www.youtube.com/playlist?list=..."
                            required
                        />
                    </div>
                ) : (
                    <div className="form-group mb-3">
                        <label>Upload File (MP4, PDF, etc.)</label>
                        <input type="file" className="form-control" onChange={handleFileUpload} />
                        {uploading && <small className="text-muted">Uploading...</small>}
                        {form.mediaUrl && !uploading && (
                            <div className="text-success mt-2 small">Uploaded: {form.mediaUrl}</div>
                        )}
                        {error && <div className="text-danger">{error}</div>}
                    </div>
                )}

                <button className="btn btn-primary mt-2">{isEdit ? 'Update' : 'Create'} Course</button>
            </form>
        </div>
    );
}

export default CourseForm;
