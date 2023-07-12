import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../Modal/User";
import Att from "../Modal/Events/Att";
import dotenv from 'dotenv'
dotenv.config()

// function to genrate Random code
function generateRandomCode() {
  const max = 9999; // maximum number of possible combinations
  const min = 1000; // minimum number to ensure 4 digits
  const random = Math.floor(Math.random() * (max - min + 1) + min); // generate random number between 1000 and 9999
  return random.toString(); // convert number to string
}
export const AddNewUser = async(req,res,next) => {
    const {code,name,email,password,phone,year,bulidingNumber,street,Area,BirthdayDate} = req.body
    const existUser = await User.findOne({email});
    if(existUser){
        // console.log(existUser);
        return res.status(400).json({messgae : 'User already Exist'})
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const user = new User({
    code : generateRandomCode(),
    name,
    email,
    password: hashPassword,
    phone,
    year,
    bulidingNumber,
    street,
    Area,
    BirthdayDate
    });
    try {
    await user.save()
    return res.status(201).json(user.code)
    } catch (error) {
        console.log(error);
    }
}
export const login = async (req, res, next) => {
  const {email, password} = req.body
  let UserId
  const existUser = await User.findOne({email})
  if(!existUser) {
    res.status(400).json({message : 'Unvalid Email address'})
  }else{
    const isPasswordCorresct = bcrypt.compareSync(password,existUser.password)
    if(!isPasswordCorresct){
      res.status(401).json({message : "password is not corect"})
    }else{
      UserId = {id : existUser._id, code : existUser.code, name : existUser.name}
      const token =jwt.sign(UserId,process.env.SECRET_KEY)
      res.status(201).json({token})
    }
  }
}

export const GetAllUser = async(req, res, next) =>{
  let users
  try {
    users = await User.find()
  } catch (error) {
    console.log(error);
  }
  if(!users){
    return res.status(400).json({message : 'No Users found'})
  }
  return res.status(200).json({users})
}

export const GetUsersByYear = async (req, res, next) => {
  const Exactyear = req.params.year
  let users
  if(Exactyear === 'all'){
    try {
      users = await User.find()
      return res.status(200).json({users})
    } catch (error) {
      console.log(error);
    }
  }else{
    try {
      users = await User.find({year : Exactyear})
      return res.status(200).json({users})
    } catch (error) {
      console.log(error);
    }
  }
}

export const GetUserBycode =  async(req, res, next) =>{
  const ExactCode =  req.params.code
  let user

  try {
    user =  await User.find({code : ExactCode})
    if(user){
      return res.status(200).json({user})

    }else{
      return res.status(404).json({message : "can't find a User with this code"})
    }
  } catch (error) {
    console.log(error);
  }
}
export const GatAttOfUser = async(req, res, next) => {
  const code = req.params.code
  let user
  try {
    user =  await Att.find({code : code})
    if(user){
      return res.status(200).json({user})

    }else{
      return res.status(404).json({message : "can't find a User with this code"})
    }
  } catch (error) {
    console.log(error);
  }
}

