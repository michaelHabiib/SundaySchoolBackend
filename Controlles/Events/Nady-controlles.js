import Nady from "../../Modal/Events/Nady";
import User from "../../Modal/User";
// import { exportFunday } from "../../Excel/excel-export";
import dotenv from 'dotenv'
// import { login } from "../User-Controlles";
dotenv.config()

export const AddNewBook = async (req,res,next) =>{
    const {code,color,duration,userID} = req.body
    const existUser = await User.findOne({code});
    if(existUser){
        const haveReservtion = await Nady.findOne({code, duration})
        if(haveReservtion){
            if(duration === 'full'){
                return res.status(400).json({message : `this User Already have Reservtion For ${haveReservtion.duration} can't book the hole Summer`})
            }
            if(haveReservtion.duration === 'full'){
                return res.status(400).json({message : 'this User Already have Reservtion For all Summer'})
            }
            
            if(haveReservtion.duration == duration ){
                return res.status(400).json({message : 'this User Already have Reservtion For This Duration'})
            }
            const nady = new Nady({
                code,
                color,
                duration,
                userID
            })
            try {
                existUser.nady.push(nady._id)
                const userData = await User.findById(nady.userID)
                nady.userID = userData
                await nady.save()
                await existUser.save()
                return res.status(201).json({nady, existUser, message : 'Booked Sucssuflly'})
            } catch (error) {
                return res.status(400).json({message : "bad Request"})
            }
        }else{
            if(duration === 'full'){
                const haveReservtionFull = await Nady.findOne({code})
                if(haveReservtionFull){
                    return res.status(400).json({message : `can't book full Summer, you Already have Reservtion for 1 omnth or more`})
                }
            }
            const haveReservtionFull = await Nady.findOne({code, duration : 'full'})
            if(haveReservtionFull){
                return res.status(400).json({message : 'this User Already have Reservtion For all Summer'})
            }
            const nady = new Nady({
                code,
                color,
                duration,
                userID
            })
            try {
                existUser.nady.push(nady._id)
                const userData = await User.findById(nady.userID)
                nady.userID = userData
                await nady.save()
                await existUser.save()
                return res.status(201).json({nady, message : 'Booked Sucssuflly'})
            } catch (error) {
                return res.status(400).json({message : "bad Request"})
            }
        }
    }else{
        res.status(404).json({message : 'can\'t Find user with this code'})
    }   
}

export const GetAllNadyRes = async (req, res, next) =>{
    try {
        const data = await Nady.find()
        for(const item of data){
            const userData = await User.findById(item.userID)
            item.userID = userData
        }
        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({message : 'bad Request'})
    }
}

export const CashNadyRes = async (req, res, next) => {
    const duration = req.params.duration
    const code = req.params.code
    try {
        const UserRes = await Nady.findOne({code, duration})
        if(UserRes){
            await Nady.updateOne({code,duration}, { $set: { isPaid: !UserRes.isPaid } });
            return res.status(201).json({message : 'Updated Sucs'})
        }else{
            return res.status(201).json({message : `User didn't book this duration`})
        }
    } catch (error) {
        console.log(error);
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
