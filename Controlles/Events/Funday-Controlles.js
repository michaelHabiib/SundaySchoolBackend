import Funday from "../../Modal/Events/Funday";
import User from "../../Modal/User";
import { exportFunday } from "../../Excel/excel-export";
import dotenv from 'dotenv'
const ObjectId = mongoose.Types.ObjectId
import { login } from "../User-Controlles";
import mongoose from "mongoose";
import path from 'path';
import fs from 'fs'
import { fileURLToPath } from 'url';
dotenv.config()

export const AddNewBook = async (req,res,next) =>{
    const {code,color,userID,isPaid} = req.body
    if(!ObjectId.isValid(userID)){
        return res.status(400).json({message : "unvalid User ID"})
    }
    const existUser = await User.findOne({code});
    // check in funday schema if  this code is in 
    if(existUser){
        const haveReservtion = await Funday.findOne({code})
        if(haveReservtion){
            return res.status(400).json({message : 'this user Already have Reservtion'})
        }
        const funday = new Funday({
            code,
            color,
            userID,
            isPaid
        })
        try {
            await funday.save()
            existUser.funday.push(funday.userID)
            await existUser.save()
            return res.status(201).json({funday, message : 'Booked Sucssuflly'})
        } catch (error) {
            // console.log(error);
            return res.status(400).json({message : "bad Request"})
        }
    }else{
        res.status(404).json({message : 'can\'t Find user with this code'})
    }   
}
export const CashFundayRes = async (req,res,next) => {
    const id = req.params.id
    const UserID = new ObjectId(id)
    try {
        const funday = await Funday.findById(id)
        await Funday.updateOne({ _id: UserID }, { $set: { isPaid: !funday.isPaid } });
        return res.status(201).json({message : 'Updated Sucs'})
    } catch (error) {
        console.log(error);
    }
}
export const GetAllFundayRes = async (req, res, next) =>{
    let user
    try {
        const data = await Funday.find()
        for(const book of data ){
            const userid = book.userID.toString()
            user = await User.findById(userid)
            book.userID = user
        }
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}

export const GetAllFundayResExcel = async (req,res,next) =>{
    let userid
    let userData
    try {
        const data = await Funday.find()
        for(const item of data){
            userid = item.userID.toString()
            userData = await User.findById(userid)
            item.userID = userData
        }
        const currentPath = process.cwd();  
        const filePath = path.join(currentPath, 'funday.xlsx');  
        // await exportFunday(data,'funday.xlsx').then(()=>{ 
        await exportFunday(data,filePath).then(()=>{
        }).catch((error)=>{
            console.log(error);
        })
        try {
            res.download(filePath);
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error downloading file.');
        }
        // res.download('funday.xlsx','funday.xlsx')   
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

