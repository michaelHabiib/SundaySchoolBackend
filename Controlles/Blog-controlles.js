import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Blog from "../Modal/Blog";

export const AddNewBlog = async(req,res,next) => {
    const {title,sub_title,Discrption,category} = req.body
    const blog = new Blog({
        title,
        sub_title,
        Discrption,
        category
    });
    try {
    await user.save()
    return res.status(201).json(user.code)
    } catch (error) {
        console.log(error);
    }
}
export const getAllBlogs = async (req,res,next) => {
    try {
        const blogs = Blog.find()
        res.status(200).json(blogs)
    } catch (error) {
        console.log(error);
    }
}