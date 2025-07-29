import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { getBlogs, deleteBlog } from "../services/api";
import Loader from "../components/Loader";
import "../styles/Home.css";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);
      fetchBlogs(); // refresh list
    } catch (error) {
      console.error(error);
    }
  };
  // Show loader when fetching blogs
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="blog-list">
      <h2 className="mb-4">All Blogs</h2>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} handleDelete={handleDelete} />
        ))
      ) : (
        <p>No blogs available</p>
      )}
    </div>
  );
}

export default Home;
