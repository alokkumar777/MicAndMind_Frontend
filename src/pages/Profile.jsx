import React, { useEffect, useState } from "react";
import { getMyBlogs, getLikedBlogs } from "../services/api";
import BlogCard from "../components/BlogCard";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myBlogs, setMyBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);

  useEffect(() => {
    fetchMyBlogs();
    fetchLikedBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    const { data } = await getMyBlogs();
    setMyBlogs(data);
  };

  const fetchLikedBlogs = async () => {
    const { data } = await getLikedBlogs();
    setLikedBlogs(data);
  };

  return (
    <div className="container">
      <h2>{user.username}'s Profile</h2>
      <p>Email: {user.email}</p>

      <hr />
      <h4>My Blogs</h4>
      {myBlogs.length > 0 ? (
        myBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} refreshBlogs={fetchMyBlogs} />
        ))
      ) : (
        <p>No blogs created yet.</p>
      )}

      <hr />
      <h4>Liked Blogs</h4>
      {likedBlogs.length > 0 ? (
        likedBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} refreshBlogs={fetchLikedBlogs} />
        ))
      ) : (
        <p>No liked blogs yet.</p>
      )}
    </div>
  );
}

export default Profile;
