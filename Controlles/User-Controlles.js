import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import User from "../Modal/User";
import Att from "../Modal/Events/Att";
import Funday from "../Modal/Events/Funday";
import Nady from "../Modal/Events/Nady";
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
export const GetUserCount = async(req, res, next) =>{
  let totalUsers
  try {
    totalUsers = await User.count()
  } catch (error) {
    console.log(error);
  }
  if(!totalUsers){
    return res.status(400).json({message : 'No Users found'})
  }
  return res.status(200).json({totalUsers})
}
export const countUserInEachClass = async(req, res, next) =>{
  let BcUsers
  let kg1Users
  let Kg2Users
  let Prim1Users
  try {
    BcUsers = await User.count({year : 'bc'})
    kg1Users = await User.count({year : 'kg1'})
    Kg2Users = await User.count({year : 'kg2'})
    Prim1Users = await User.count({year : 'prim1'})
    return res.status(200).json([{count : BcUsers, className : 'Baby Class'}, {count : kg1Users, className : 'Kg1'}, {count : Kg2Users,className : 'Kg2'}, {count : Prim1Users, className : 'Prim 1'}])
  } catch (error) {
    console.log(error);
  }
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
export const GetAttendanceOfUser = async (req, res, next) => {
  const code = req.params.code
  const user = await User.findOne({code : code})
  let AttendanceData = []
  if(user == null){
      return res.status(404).json({message : "can't Find User with This Code"})
  }else{
      try {
        for(const AttendanceID of user.Attendance ){
          const att = AttendanceID.toString()
          const attendance = await Att.findById(att)
          if (attendance) {
            AttendanceData.push(attendance);
          } else {
            console.log(`No attendance record found for ID ${att}`);
          }
        }
          return res.status(201).json({user,AttendanceData})
      } catch (error) {
          console.log(error);
      }
  }
}
const FormatBirthday = function formatDate(date) {
  if (!(date instanceof Date)) {
    date = new Date(date); // Assuming the date parameter is a string representation of a date
  }
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  // const year = date.getFullYear().toString();
  return `${month}-${day}`;
}
export const getBirthdaysOfToday =  async (req, res, next) =>{
  let user
  let today 
  let BirhdayToday = []
  try {
    const users = await User.find()
    for(let i = 0; i < users.length; i++){
      user = FormatBirthday(users[i].BirthdayDate) 
      today = FormatBirthday(new Date('1997-05-04T21:00:00.000Z'))
      console.log(today);
      console.log(user);
      if(user == today ){
        BirhdayToday.push(users[i])
      }
    }
    if(BirhdayToday.length == 0){
      return res.status(200).json({message : 'No Birthdays For Today'})
    }
    return res.status(200).json(BirhdayToday)
  } catch (error) {
    console.log(error);
  }
}
export const DeleteUser =  async (req, res, next) => {
  const code = req.params.code
  try {
    const user = await User.find({code})
    if(user){
      const DeletedUser = await User.deleteOne({code: code})
      const Deletedfunday = await Att.deleteMany({code : code})
      await Funday.deleteMany({code : code})
      await Nady.deleteMany({code : code})
      return res.status(200).json({message : 'Deleted Sucssfully', DeletedUser})
    }else{
      return res.status(404).json({message : "Can't Find User To Delete"})
    }
    
  } catch (error) {
    console.log(error);
  }
}


