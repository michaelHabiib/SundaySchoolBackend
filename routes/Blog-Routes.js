import express from "express";
import { AddNewBlog, getAllBlogs } from "../Controlles/Blog-controlles";
const blogRoutes = express.Router();

blogRoutes.post('/',AddNewBlog)
blogRoutes.get('/blogs',getAllBlogs)
export default blogRoutes;