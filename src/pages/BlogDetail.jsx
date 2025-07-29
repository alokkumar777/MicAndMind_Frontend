import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog, addComment, deleteComment } from "../services/api";
import Loader from "../components/Loader";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await getBlog(id);
      setBlog(data);
    } catch (err) {
      setError("Failed to load blog. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await addComment(id, { text: commentText.trim(), author: user.username });
      setCommentText("");
      fetchBlog();
    } catch (err) {
      console.error(err);
      alert("Failed to add comment, please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      await deleteComment(id, commentId);
      fetchBlog();
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment, please try again.");
    }
  };

  if (loading) return <Loader message="Loading Blog..." />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!blog) return <div>No blog found.</div>;

  return (
    <div className="container">
      <h2>{blog.title}</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{blog.content}</p>
      <hr />
      <h4>Comments</h4>
      {blog.comments.length === 0 && <p>No comments yet.</p>}
      {blog.comments.map((c) => (
        <div key={c._id} className="mb-2">
          <strong>{c.author}:</strong> {c.text}
          {user && c.author === user.username && (
            <button
              onClick={() => handleDeleteComment(c._id)}
              className="btn btn-sm btn-danger ms-2"
              aria-label={`Delete comment by ${c.author}`}
            >
              <i className="fas fa-trash"></i>
            </button>
          )}
        </div>
      ))}
      {user ? (
        <form onSubmit={handleAddComment} className="mt-3">
          <textarea
            className="form-control mb-2"
            rows="2"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            required
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!commentText.trim()}
          >
            Add Comment
          </button>
        </form>
      ) : (
        <p>Please login to comment.</p>
      )}
    </div>
  );
}

export default BlogDetail;
