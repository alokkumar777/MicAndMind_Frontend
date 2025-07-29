import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlog, updateBlog } from "../services/api";
import Loader from "../components/Loader";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true); // For fetching blog
  const [updating, setUpdating] = useState(false); // For update submission

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line
  }, []);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const { data } = await getBlog(id);
      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      // Optionally: handle error state / display message here
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await updateBlog(id, { title, content });
      setUpdating(false);
      navigate("/");
    } catch (error) {
      console.error(error);
      setUpdating(false);
      // Optionally: handle error state / display message here
    }
  };

  if (loading) return <Loader message="Loading Blog..." />;

  if (updating) return <Loader message="Updating Blog..." />;

  return (
    <div className="container">
      <h2 className="mb-4">Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
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
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-warning">
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
