import Funday from "../../Modal/Events/Funday";
import User from "../../Modal/User";
import Event from "../../Modal/Events/Event";
import dotenv from 'dotenv'
const ObjectId = mongoose.Types.ObjectId
import mongoose from "mongoose";
import Excel from 'exceljs'
dotenv.config()

export const AddNewBook = async (req,res,next) =>{
    const {code,name,color,userID,isPaid,eventCode,dateTime} = req.body
    if(!ObjectId.isValid(userID)){
        return res.status(400).json({message : "unvalid User ID"})
    }
    const existUser = await User.findOne({code});
    if(existUser){
        const haveReservtion = await Funday.findOne({code,eventCode})
        if(haveReservtion){
            return res.status(400).json({message : 'this user Already have Reservtion'})
        }
        const funday = new Funday({
            code,
            name,
            color,
            userID,
            isPaid,
            eventCode,
            dateTime
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
    const eventCode = req.params.eventCode
    try {
        const data = await Funday.find({eventCode})
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
    const workBook = new Excel.Workbook()
    const workSheet = workBook.addWorksheet("Funday")
    workSheet.addRow(['funday name','code','name','color','payment','time']) 

    const eventCode = req.params.eventCode
    let userid
    let userData
    try {
        const funday = await Event.find({eventCode})
        const data = await Funday.find({eventCode})
        console.log(funday);
        console.log(data);
        for (const item of data) {
            userid = item.userID.toString()
            userData = await User.findById(userid)
            item.userID = userData
          }
          for (const item of data) {
            const rowValues = [
            funday[0].name,
            item.code,
            item.userID.name,
            item.color,
            item.isPaid,
            item.createdAt
            ]
            workSheet.addRow(rowValues)
            console.log(rowValues);
          }

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + 'funday.xlsx');
        res.setHeader('Content-Encoding', null); // added this line to set the content encoding to null
          await workBook.xlsx.write(res);
          res.end();
    } catch (error) {
        console.log(error)
    }
}

export const getFundayCount =  async (req, res, next) => {
    let fundayCount 
    let total = []
    try {
        const fundayCount = await Event.find({
            $expr: {
              $ne: [{ $size: "$colors" }, 0]
            }
          });
          for(let i = 0; i< fundayCount.length; i++){
            const eventCode = fundayCount[i].eventCode
            const fundayReservtion = await Funday.find({eventCode})
            total.push({name : fundayCount[i].name, count : fundayReservtion.length})
          }
          
        return res.status(200).json({total})
    } catch (error) {
        console.log(error);
    }
}
export const getCashForFundays =  async (req, res, next) => {
    let fundayCount 
    let total = []

    try {
        const fundayCount = await Event.find({
            $expr: {
              $ne: [{ $size: "$colors" }, 0]
            }
          });
          for(let i = 0; i< fundayCount.length; i++){
            let totalCash = 0
            const eventCode = fundayCount[i].eventCode
            const fundayReservtion = await Funday.find({eventCode})
            fundayReservtion.forEach((reservtion) => {
                    if(reservtion.isPaid){
                        totalCash = totalCash + fundayCount[i].price
                    }
                })
                total.push({name : fundayCount[i].name, totalCash : totalCash})
          }
          
        return res.status(200).json(total)
    } catch (error) {
        console.log(error);
    }
}




