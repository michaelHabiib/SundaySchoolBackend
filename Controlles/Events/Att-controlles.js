import User from "../../Modal/User";
import Att from "../../Modal/Events/Att";
import Excel from 'exceljs'


export const SaveAtt = async (req,res,next)=>{
    const {code,AttDate,isChecked,kidClass,userID} = req.body
    const existUser = await User.findOne({code});
    if(existUser){
        const exisetAttendance = await Att.findOne({code : code, AttDate : AttDate})
        if(exisetAttendance){
            // console.log(exisetAttendance);
            await Att.updateOne({_id : exisetAttendance._id},{ $set : {isChecked : !exisetAttendance.isChecked }})
            res.status(200).json({message : 'submited sucssuflly'})
        }else{
            const att = new Att({
                code,
                AttDate,
                isChecked,
                kidClass : existUser.year,
                userID
            })
            try {
                console.log(att);
                await att.save()
                existUser.Attendance.push(att._id)
                await existUser.save()
                return res.status(201).json({message : 'submited sucssuflly'})
            } catch (error) {
                console.log(error);
            }
        }
    }else{
        return res.status(404).json({message : 'can\'t Find user with this code'})
    }
}

export const GetAttendanceOfDay = async (req, res, next) => {
    const Day = req.params.day
    const kidClass = req.params.kidClass
    if(kidClass === 'all'){
        try {
            const users = await User.find().distinct('code');
            const AddendanceData = await Att.find({code : {$in : users}, AttDate : Day})
            return res.status(200).json(AddendanceData)
        } catch (error) {
            console.log(error);
        }
    }else{
        try {
            const users = await User.find({year : kidClass}).distinct('code');
            const AddendanceData = await Att.find({code : {$in : users}, AttDate : Day})
            return res.status(200).json(AddendanceData)
        } catch (error) {
            console.log(error);
        }
    }

}

export const downloadAttendanceSheet =  async (req, res, next) => {
    const Day = req.params.Day
    const year = req.params.year
    let userID
    let userData
    let users
    const Workbook = new Excel.Workbook()
    const worksheet = Workbook.addWorksheet('Attendance')
    worksheet.addRow(['code','name','Day','class','Attendance']) 
    if(year === 'all'){
        users = await User.find()
    }else{
        users = await User.find({year : year})
    }
    try {
        const Attednace = await Att.find({AttDate : Day})
        users.forEach((user) =>{
            const attendanceOfUser = Attednace.find((a) => a.code === user.code)
            if(attendanceOfUser){
             if(attendanceOfUser.isChecked){
                const rowValues = [
                    user.code,
                    user.name,
                    attendanceOfUser.AttDate,
                    user.year,
                    attendanceOfUser.isChecked
                ]
                worksheet.addRow(rowValues)
             } else{
                const rowValues = [
                    user.code,
                    user.name,
                    attendanceOfUser.AttDate,
                    user.year,
                    attendanceOfUser.isChecked
                ]
                worksheet.addRow(rowValues)
             }  
            }else{
                const rowValues = [
                    user.code,
                    user.name,
                    Day,
                    user.year,
                    false
                ]
                worksheet.addRow(rowValues)
            }
        })
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + 'Attendance.xlsx');
        res.setHeader('Content-Encoding', null); // added this line to set the content encoding to null
        await Workbook.xlsx.write(res);
        res.end();

        
    } catch (error) {
        console.log(error);
    }
}
export const GetAttendanceOfUser = async (req, res, next) => {
    const code = req.params.code
    const userCode = await User.findOne({code : code})
    if(userCode == null){
        return res.status(404).json({message : "can't Find User with This Code"})
    }else{
        try {
            const user =await  User.findById(userCode.userID)
            const attendanceOfUser = await Att.find({code : code})
            return res.status(201).json(attendanceOfUser)
        } catch (error) {
            console.log(error);
        }
    }
}

