import React, { useState } from "react";
import { createBlog } from "../services/api";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; // Adjust path if required

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Show loader on submitting
      await createBlog({ title, content });
      setLoading(false);
      navigate("/"); // Redirect after success
    } catch (error) {
      console.error(error);
      setLoading(false); // Hide loader on error
      // Optionally add error handling UI here
    }
  };

  if (loading) {
    return <Loader message="Creating blog..." />;
  }

  return (
    <div className="container">
      <h2 className="mb-4 fs-2 fw-normal">Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            placeholder="Unwan..."
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            className="form-control"
            rows="6"
            placeholder="Har Woh Khayaal Jo Dil Se Guzre, Yahan Likha Jayega..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={loading}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
