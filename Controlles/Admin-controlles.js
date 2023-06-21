import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Admin from "../Modal/Admin";
import dotenv from 'dotenv'
dotenv.config()
export const AddNewAdmin =  async (req, res, next) =>{
    const {name,email,password} = req.body

    const ExactaAdmin = await Admin.findOne({email}) 
    if(ExactaAdmin) {
        console.log(ExactaAdmin);
        return res.status(400).json({message : 'Email Already Exists'})
    }
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)
    let admin = new Admin({
        name,
        email,
        password : hashPassword
    })
    try {
        await admin.save()
        return res.status(201).json({message : ' Admin set Sucssuffly'})
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res, next)=>{
    const {email,password} = req.body
    let UserInfo
    const existUser = await Admin.findOne({email})
    if(!existUser){
        res.status(404).json({message : 'canot find this email please Register First'})
    }else{
        const isPasswordCorresct = bcrypt.compareSync(password,existUser.password)
        if(!isPasswordCorresct){
          res.status(401).json({message : "password is not corect"})
        }else{
          UserInfo = {id : existUser._id, isAdmin : existUser.isAdmin}
          const token =jwt.sign(UserInfo,process.env.SECRET_KEY)
          res.status(201).json({token})
        }
    }
}