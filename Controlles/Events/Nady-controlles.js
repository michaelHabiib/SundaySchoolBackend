import Nady from "../../Modal/Events/Nady";
import User from "../../Modal/User";
// import { exportFunday } from "../../Excel/excel-export";
import dotenv from 'dotenv'
// import { login } from "../User-Controlles";
dotenv.config()

export const AddNewBook = async (req,res,next) =>{
    const {code,color,duration} = req.body
    const existUser = await User.findOne({code});
    if(existUser){
        const nady = new Nady({
            code,
            color,
            duration
        })
        try {
            nady.save()
            return res.status(201).json(nady)
        } catch (error) {
            // console.log(error);
            return res.status(400).json({message : "bad Request"})
        }
    }else{
        res.status(404).json({message : 'can\'t Find user with this code'})
    }   
}

export const GetAllNadyRes = async (req, res, nect) =>{
    try {
        const data = await Nady.find()
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
    }
}
// export const GetAllFundayResExcel = async (req,res,next) =>{
//     try {
//         const data = await Funday.find()
//         await exportFunday(data,'funday.xlsx').then(()=>{
//             console.log('file Saved Sucs');
//         }).catch((error)=>{
//             console.log(error);
//         })
//         res.download('funday.xlsx','funday.xlsx')
//         return res.status(200).json(data)
//     } catch (error) {
//         console.log(error);
//     }
// }
