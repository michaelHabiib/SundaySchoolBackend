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
                kidClass,
                userID
            })
            try {
                await att.save()
                existUser.Attendance.push(att.userID)
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
    try {
        // console.log(Day);
        const users = await User.find().distinct('code');
        // console.log(users);
        const AddendanceData = await Att.find({code : {$in : users}, AttDate : Day, kidClass: kidClass})
        return res.status(200).json(AddendanceData)
    } catch (error) {
        console.log(error);
    }
}
// export const GetAttendanceOfDayGenrate = async (req, res, next) => {
//     const Day = req.params.day
//     const kidClass = req.params.kidClass
//     try {
//         const AddendanceData = await Att.find({AttDate : Day, kidClass : kidClass })
//         return res.status(200).json(AddendanceData)
//     } catch (error) {
//         console.log(error);
//     }
// }

export const downloadAttendanceSheet =  async (req, res, next) => {
    const Day = req.params.Day
    // const year = req.params.year
    let userID
    let userData
    const Workbook = new Excel.Workbook()
    const worksheet = Workbook.addWorksheet('Attendance')
    workSheet.addRow(['code','name','Day']) 
    try {
        console.log(Day);
        const Attednace = await Att.find({AttDate : Day})
        console.log(Attednace);
        for(const item of Attednace){
            userID = item.userID.toString()
            userData = await User.findById(userID)
            item.userID = userData
        }
        for(const item of Attednace ){
            const rowValues = [
                item.code,
                item.userID.name,
                item.AttDate
            ]
            worksheet.addRow(rowValues)
        }
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=" + 'Attendance.xlsx');
        res.setHeader('Content-Encoding', null); // added this line to set the content encoding to null
          await Workbook.xlsx.write(res);
          res.end();
        
        // console.log(Attednace);
        return res.status(201).json({Attednace})
        
    } catch (error) {
        console.log(error);
    }
}