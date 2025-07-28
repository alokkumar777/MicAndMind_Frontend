import React, { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { getBlogs, deleteBlog } from "../services/api";

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error(error);
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

  return (
    <div>
      <h2 className="mb-4">All Blogs</h2>
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} handleDelete={handleDelete} />
      ))}
    </div>
  );
}

export default Home;
