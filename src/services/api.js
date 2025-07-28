import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getBlogs = () => API.get("/blogs");
export const getBlog = (id) => API.get(`/blogs/${id}`);
export const createBlog = (data) => API.post("/blogs", data);
export const updateBlog = (id, data) => API.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);
export const getMyBlogs = () => API.get("/blogs/user/myblogs");
export const getLikedBlogs = () => API.get("/blogs/user/liked");


export const addComment = (blogId, data) =>
  API.post(`/blogs/${blogId}/comments`, data);
export const deleteComment = (blogId, commentId) =>
  API.delete(`/blogs/${blogId}/comments/${commentId}`);
export const likeBlog = (blogId) => API.post(`/blogs/${blogId}/like`);

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
