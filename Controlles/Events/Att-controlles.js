import User from "../../Modal/User";
import Att from "../../Modal/Events/Att";
import Excel from 'exceljs'
import moment from 'moment';

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
    // console.log(kidClass);
    if(kidClass === 'all'){
        try {
            // console.log(kidClass);
            // console.log(Day);
            const users = await User.find().distinct('code');
            // console.log(users);
            const AddendanceData = await Att.find({code : {$in : users}, AttDate : Day})
            return res.status(200).json(AddendanceData)
        } catch (error) {
            console.log(error);
        }
    }else{
        try {
            // console.log(kidClass);
            const users = await User.find({year : kidClass}).distinct('code');
            // console.log(users);
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
    // const year = req.params.year
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
        // console.log(users);
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

// export const downloadAttendanceSheetInRange = async (req, res, next) => {
//     const startDay = req.params.start
//     const endDay = req.params.end
//     const year = req.params.year
//     let users
//     const workbook = new Excel.Workbook()
//     const worksheet = workbook.addWorksheet('Attendance')

//     try {
//         users = await User.find()
//         attendacnde = await Att.find({
//             AttDate :{
//                 $gte: startDay,
//                 $lte: endDay
//             }
//         })
//         users.forEach((user) => {
//             const attendanceOfUser = attendacnde.find((a) => {
//                 a.code = user.code
//             })
//             if(attendanceOfUser){
//                 if(attendanceOfUser.isChecked){
//                     const rowValues = [
//                         user.code,
//                         user.name,
//                         attendanceOfUser.AttDate,
//                         user.year,
//                         attendanceOfUser.isChecked
//                     ]
//                     worksheet.addRow(rowValues)
//                 }else{
//                     const rowValues = [
//                         user.code,
//                         user.name,
//                         attendanceOfUser.AttDate,
//                         user.year,
//                         attendanceOfUser.isChecked
//                     ]
//                     worksheet.addRow(rowValues)
//                 }
//             }else{
//                 const rowValues = [
//                     user.code,
//                     user.name,
//                     Day,
//                     user.year,
//                     false
//                 ]
//                 worksheet.addRow(rowValues)
//             }
    
//         })
//         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//         res.setHeader("Content-Disposition", "attachment; filename=" + 'Attendance.xlsx');
//         res.setHeader('Content-Encoding', null); // added this line to set the content encoding to null
//         await workbook.xlsx.write(res);
//         res.end();
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const downloadAttendanceSheetInRange = async (req, res, next) => {
//     const startDay = moment(req.params.start);
//     const endDay = moment(req.params.end);
//     const year = req.params.year;
  
//     let users, attendance;
//     const workbook = new Excel.Workbook();
//     const worksheet = workbook.addWorksheet('Attendance');
//     if(year === 'all'){
//         users = await User.find()
//     }else{
//         users = await User.find({year : year})
//     }
//     try {
//       attendance = await Att.find({
//         AttDate: {
//           $gte: startDay.toDate(),
//           $lte: endDay.toDate()
//         }
//       });
  
//       // Create an array of all the dates between startDay and endDay
//       const dates = [];
//       for (let date = startDay.clone(); date.isSameOrBefore(endDay); date.add(1, 'day')) {
//         dates.push(date.format('YYYY-MM-DD'));
//       }
  
//       // Add header row with code, name, year, and attendance for each date
//       const headerValues = ['code', 'name', 'year', ...dates, 'Attendance'];
//       worksheet.addRow(headerValues);
  
//       users.forEach((user) => {
//         const userAttendance = attendance.find((a) => a.code === user.code) || {};
  
//         // Add row for user with attendance for each date
//         const rowValues = [
//           user.code,
//           user.name,
//           year,
//           ...dates.map((date) => userAttendance[date] || ''),
//           userAttendance.isChecked || false
//         ];
//         worksheet.addRow(rowValues);
//       });
  
//       res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//       res.setHeader('Content-Disposition', 'attachment; filename=Attendance.xlsx');
//       res.setHeader('Content-Encoding', null);
//       await workbook.xlsx.write(res);
//       res.end();
//     } catch (error) {
//       console.log(error);
//     }
//   };
export const downloadAttendanceSheetInRange = async (req, res, next) => {
    const startDay = moment(req.params.start);
    const endDay = moment(req.params.end);
    const year = req.params.year;
  
    let users, attendance;
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Attendance');
  
    try {
      users = await User.find();
      attendance = await Att.find({
        AttDate: {
          $gte: startDay.toDate(),
          $lte: endDay.toDate()
        }
      });
  
      // Create an array of all the dates between startDay and endDay
      const dates = [];
      for (let date = startDay.clone(); date.isSameOrBefore(endDay); date.add(1, 'day')) {
        dates.push(date.format('YYYY-MM-DD'));
      }
  
      // Add header row with code, name, year, and attendance for each date
      const headerValues = ['code', 'name', 'year', ...dates];
      worksheet.addRow(headerValues);
  
      users.forEach((user) => {
        const userAttendance = attendance.find((a) => a.code === user.code) || {};
  
        // Add row for user with attendance for each date
        const rowValues = [
          user.code,
          user.name,
          year,
          ...dates.map((date) => userAttendance[date] || false)
        ];
        worksheet.addRow(rowValues);
      });
  
      // Remove the "Attendance" column
      const attendanceColumn = worksheet.getColumn('Attendance');
      worksheet.spliceColumns(attendanceColumn.number, 1);
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=Attendance.xlsx');
      res.setHeader('Content-Encoding', null);
      await workbook.xlsx.write(res);
      res.end();
    } catch (error) {
      console.log(error);
    }
  }