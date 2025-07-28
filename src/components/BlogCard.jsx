import React from "react";
import { Link } from "react-router-dom";
import { likeBlog } from "../services/api";

const BlogCard = ({ blog, handleDelete, refreshBlogs }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user && blog.user === user.id;
  const hasLiked = user && blog.likes.includes(user.id);

  const handleLike = async () => {
    await likeBlog(blog._id);
    refreshBlogs();
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.content.substring(0, 100)}...</p>

        <button
          onClick={handleLike}
          className={`btn btn-sm ${
            hasLiked ? "btn-success" : "btn-outline-success"
          } me-2`}
        >
          ♥️ {blog.likes.length}
        </button>

        <Link to={`/blog/${blog._id}`} className="btn btn-primary btn-sm me-2">
          Read More
        </Link>

        {isOwner && (
          <>
            <Link
              to={`/edit/${blog._id}`}
              className="btn btn-warning btn-sm me-2"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(blog._id)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
