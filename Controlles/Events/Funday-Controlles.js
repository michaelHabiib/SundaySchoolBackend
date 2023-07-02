import Funday from "../../Modal/Events/Funday";
import User from "../../Modal/User";
import { exportFunday } from "../../Excel/excel-export";
import dotenv from 'dotenv'
import { login } from "../User-Controlles";
dotenv.config()

export const AddNewBook = async (req,res,next) =>{
    const {code,color} = req.body
    const existUser = await User.findOne({code});
    // check in funday schema if  this code is in 
    if(existUser){
        const funday = new Funday({
            code,
            color,
        })
        try {
            funday.save()
            return res.status(201).json(funday)
        } catch (error) {
            // console.log(error);
            return res.status(400).json({message : "bad Request"})
        }
    }else{
        res.status(404).json({message : 'can\'t Find user with this code'})
    }   
}

export const GetAllFundayRes = async (req, res, nect) =>{
    try {
        const data = await Funday.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
export const GetAllFundayResExcel = async (req,res,next) =>{
    try {
        const data = await Funday.find()
        await exportFunday(data,'funday.xlsx').then(()=>{
            console.log('file Saved Sucs');
        }).catch((error)=>{
            console.log(error);
        })
        res.download('funday.xlsx','funday.xlsx')
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

