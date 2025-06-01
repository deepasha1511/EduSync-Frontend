import React, { useState } from "react";
import axios from "axios";

export default function UploadCourseMedia({ courseId }) {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(`/api/courses/${courseId}/upload-media`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        alert("Media uploaded: " + res.data.mediaUrl);
    };

    return (
        <div>
            <input type="file" onChange={e => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload Media</button>
        </div>
    );
}
