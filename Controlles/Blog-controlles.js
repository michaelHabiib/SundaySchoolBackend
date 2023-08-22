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
    await blog.save()
    return res.status(201).json({blog, message : 'blog Added sucssfuly'})
    } catch (error) {
        console.log(error);
    }
}
export const getAllBlogs = async (req,res,next) => {
    try {
        const blogs = await Blog.find({})
        res.status(200).json({blogs})
    } catch (error) {
        console.log(error);
    }
}