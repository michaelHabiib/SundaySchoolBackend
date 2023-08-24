import express from "express";
import { AddNewBlog, getAllBlogs, DeleteBlog, UpdateBlog } from "../Controlles/Blog-controlles";
const blogRoutes = express.Router();

blogRoutes.post('/',AddNewBlog)
blogRoutes.get('/blogs',getAllBlogs)
blogRoutes.delete('/blogs/:id',DeleteBlog)
blogRoutes.post('/blogs/:id',UpdateBlog)
export default blogRoutes;