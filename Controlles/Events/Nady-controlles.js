import Nady from "../../Modal/Events/Nady";
import User from "../../Modal/User";
// import { exportFunday } from "../../Excel/excel-export";
import dotenv from 'dotenv'
import Excel from 'exceljs'
import Event from "../../Modal/Events/Event";
// import { login } from "../User-Controlles";
dotenv.config()

export const AddNewBook = async (req,res,next) =>{
    const {code,geroupID,userID,eventCode} = req.body
    const existUser = await User.findOne({code});
    if(existUser){
        const haveReservtion = await Nady.findOne({code,eventCode})    
        if(haveReservtion){
            return res.status(400).json({message : "this User Already Have Reservtion in this event "})
        }else{
            const nady = new Nady({
                code,
                eventCode,
                geroupID,
                userID
            })
            try {
                existUser.nady.push(nady._id)
                // const userData = await User.findById(nady.userID)
                // nady.userID = userData
                await nady.save()
                await existUser.save()
                return res.status(201).json({message : 'Booked Sucssuflly'})
            } catch (error) {
                return res.status(400).json({message : "bad Request"})
            }
        }
    }else{
        res.status(404).json({message : 'can\'t Find user with this code'})
    }   
}

export const GetAllNadyRes = async (req, res, next) =>{
    const eventCode = req.params.eventCode
    try {
        const data = await Nady.find({eventCode})
        for(const item of data){
            const userData = await User.findById(item.userID).select('name')
            item.userID = userData
            const GroupColor = await Event.findOne({ eventCode, 'availableColors._id': item.geroupID },
            { 'availableColors.$': 1 })
            item.geroupID = GroupColor
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
export const GetAllNadyResExcel = async (req,res,next) =>{
    const workBook = new Excel.Workbook()
    const workSheet = workBook.addWorksheet("Summer Club")
    workSheet.addRow(['code','name','color', 'payment','time']) 

    const eventCode = req.params.eventCode
    let userid
    let userData
    try {
        const data = await Nady.find({eventCode})
        for (const item of data) {
            userid = item.userID.toString()
            userData = await User.findById(userid).select('name')
            item.userID = userData
            const GroupColor = await Event.findOne({ eventCode, 'availableColors._id': item.geroupID },
            { 'availableColors.$': 1 })
            item.geroupID = GroupColor
          }
          console.log(data);
          for (const item of data) {
            const rowValues = [
              item.code,
              item.userID.name,
              item.geroupID.availableColors[0].color,  
              item.isPaid,
              item.createdAt
            ]
            console.log(rowValues);
            workSheet.addRow(rowValues)
          }
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + 'Summer Club.xlsx');
        res.setHeader('Content-Encoding', null); // added this line to set the content encoding to null
          await workBook.xlsx.write(res);
          res.end();
    } catch (error) {
        console.log(error)
    }
}
