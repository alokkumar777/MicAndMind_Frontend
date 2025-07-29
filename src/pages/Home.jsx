import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { getBlogs, deleteBlog } from "../services/api";
import Loader from "../components/Loader";
import FooterCredit from "../components/FooterCredit";

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading blogs...");

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
      setLoadingMessage("Loading blogs...");
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoadingMessage("Deleting blog...");
      setLoading(true); // Show loader immediately on delete start
      await deleteBlog(id);
      await fetchBlogs(); // fetchBlogs resets loading to false
    } catch (error) {
      console.error(error);
      setLoading(false); // Stop loader if error occurs
      setLoadingMessage("Loading blogs...");
    }
  };

  // Show loader when loading (initial load or deleting)
  if (loading) {
    return <Loader message={loadingMessage} />;
  }

  return (
    <div className="blog-list container">
      <h2 className="mb-4 fw-normal fs-2">Khayalaat...</h2>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} handleDelete={handleDelete} />
        ))
      ) : (
        <p>No blogs available</p>
      )}
      <FooterCredit />
    </div>
  );
}

export default Home;
