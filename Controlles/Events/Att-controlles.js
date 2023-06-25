import User from "../../Modal/User";
import Att from "../../Modal/Events/Att";
import { exportAtt } from "../../Excel/excel-export";
import os from 'os'
import path from 'path';


// const homedir = os.homedir();

export const SaveAtt = async (req,res,next)=>{
    const {code} = req.body
    const existUser = await User.findOne({code});
    if(existUser){
        const att = new Att({
            code
        })
        try {
            await att.save()
            return res.status(201).json({message : 'submited sucssuflly'})
        } catch (error) {
            console.log(error);
        }
    }else{
        return res.status(404).json({message : 'can\'t Find user with this code'})
    }
}

export const GetAttOfaDay = async (req, res, next) => {
    const day = req.params.id
    try {
        const students = await Att.find({attDay : {$gte : new Date(`2023-06-22T00:00:00.00z`), $lt : new Date("2023-06-23T00:00:00.00z")}})
        // const downloadsDir = path.join(homedir, 'Downloads');
        await exportAtt(students,'data.xlsx').then(()=>{
            console.log('excel file saved');
        }).catch((error)=>{
            console.log(error);
        })
        res.download('data.xlsx','data.xlsx')
        // return res.status(200).json(students)
    } catch (error) {
        console.log(error);
    }
}