import User from "../../Modal/User";
import Att from "../../Modal/Events/Att";
import DateOnlyy from 'mongoose-dateonly'
const DateOnly = DateOnlyy.mongoose


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
        const students = await Att.find({attDay : {$gte : new Date(`2023-06-23T00:00:00.00z`), $lt : new Date("2023-06-24T00:00:00.00z")}})
        return res.status(200).json({students})
    } catch (error) {
        console.log(error);
    }
}