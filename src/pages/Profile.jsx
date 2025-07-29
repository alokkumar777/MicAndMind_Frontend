import React, { useEffect, useState } from "react";
import { getMyBlogs, getLikedBlogs } from "../services/api";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myBlogs, setMyBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [myBlogsRes, likedBlogsRes] = await Promise.all([
        getMyBlogs(),
        getLikedBlogs(),
      ]);
      setMyBlogs(myBlogsRes.data);
      setLikedBlogs(likedBlogsRes.data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Loading your profile..." />;
  }

  return (
    <div className="container profile-container">
      <h2 className="fw-normal fs-2">{user.username}'s Profile</h2>
      <p>Email: {user.email}</p>

      <hr />
      <h4 className="fw-normal fs-4">My Blogs</h4>
      {myBlogs.length > 0 ? (
        myBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} refreshBlogs={fetchData} />
        ))
      ) : (
        <p>No blogs created yet.</p>
      )}

      <hr />
      <h4 className="fw-normal fs-4">Liked Blogs</h4>
      {likedBlogs.length > 0 ? (
        likedBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} refreshBlogs={fetchData} />
        ))
      ) : (
        <p>No liked blogs yet.</p>
      )}
    </div>
  );
}

export default Profile;