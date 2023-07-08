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
                return res.status(201).json({message : 'submited sucssuflly'})
            } catch (error) {
                console.log(error);
            }
        }
    }else{
        return res.status(404).json({message : 'can\'t Find user with this code'})
    }


    // if(existUser){
    //     const ExistAtt = await Att.findOne({code : code, AttDate: AttDate})
    //     if(ExistAtt){
    //         res.status(400).json({message : 'Attendance For today is already submited for this Code'})
    //     }else{
    //         const att = new Att({
    //             code,
    //             AttDate,
    //             isChecked,
    //             kidClass,
    //             user
    //         })
    //         try {
    //             await att.save()
    //             return res.status(201).json({message : 'submited sucssuflly'})
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }else{
    //     return res.status(404).json({message : 'can\'t Find user with this code'})
    // }
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
export const GetAttendanceOfDayGenrate = async (req, res, next) => {
    const Day = req.params.day
    const kidClass = req.params.kidClass
    try {
        const AddendanceData = await Att.find({AttDate : Day, kidClass : kidClass })
        return res.status(200).json(AddendanceData)
    } catch (error) {
        console.log(error);
    }
}

export const downloadAttendanceSheet =  async (req, res, next) => {
    const date = req.params.date
    const Workbook = new Excel.Workbook()
    const worksheet = Workbook.addWorksheet('Attendance')
    try {
        const Attednace = Att.find({})
        
    } catch (error) {
        
    }
}