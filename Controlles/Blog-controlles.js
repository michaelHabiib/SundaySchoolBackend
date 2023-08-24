import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Blog from "../Modal/Blog";

export const AddNewBlog = async(req,res,next) => {
    const {title,sub_Title,Discrption,category} = req.body
    const blog = new Blog({
        title,
        sub_Title,
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
        const blogs = await Blog.find()
        return res.status(200).json({blogs})
    } catch (error) {
        console.log(error);
    }
}
export const DeleteBlog = async (req, res, next) => {
    const id = req.params.id
    try {
        console.log(id);
        const deletedBlog = await Blog.findByIdAndRemove(id)
        if(!deletedBlog){
            return res.status(404).json({message : 'No Blog With this ID'})
        }
        return res.status(200).json({message : 'Deleted Sucssfully', deletedBlog})
    } catch (error) {
        console.log(error);
    }
}
export const UpdateBlog = async (req, res, next) => {
    const {         
        title,
        sub_Title,
        Discrption,
        category} = req.body;
    const id = req.params.id
  
    try {
        console.log(id);
      const blog = await Blog.findById({_id : id});
        console.log(blog);
      if (!blog) {
        return res.status(404).json({ message: 'blog not found' });
      }
  
      // Update Blog properties
      blog.title = title;
      blog.sub_Title = sub_Title;
      blog.Discrption = Discrption;
      blog.category = category;
  
      await blog.save();
  
      return res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };