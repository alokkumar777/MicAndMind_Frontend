import React, { useState } from "react";
import { createBlog } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBlog({ title, content });
      navigate("/"); // redirect to home
    } catch (error) {
      console.error(error);
    }
  };

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
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlog;
