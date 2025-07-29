import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog, addComment, deleteComment } from "../services/api";
import Loader from "../components/Loader";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [commentText, setCommentText] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const { data } = await getBlog(id);
    setBlog(data);
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    await addComment(id, { text: commentText, author: user.username });
    setCommentText("");
    fetchBlog();
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(id, commentId);
    fetchBlog();
  };

  if (!blog) return <Loader message="Loading Blog..." />;

  return (
    <div className="container">
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <hr />
      <h4>Comments</h4>
      {blog.comments.map((c) => (
        <div key={c._id} className="mb-2">
          <strong>{c.author}:</strong> {c.text}
          {user && c.user === user.id && (
            <button
              onClick={() => handleDeleteComment(c._id)}
              className="btn btn-sm btn-danger ms-2"
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
          <button type="submit" className="btn btn-primary">
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
