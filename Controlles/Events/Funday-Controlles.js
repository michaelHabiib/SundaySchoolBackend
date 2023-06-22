import Funday from "../../Modal/Events/Funday";
import User from "../../Modal/User";
import dotenv from 'dotenv'
dotenv.config()

export const AddNewBook = async (req,res,next) =>{
    const {code,color} = req.body
    const existUser = await User.findOne({code});
    if(existUser){
        const funday = new Funday({
            code,
            color,
        })
        try {
            funday.save()
            return res.status(201).json(funday)
        } catch (error) {
            // console.log(error);
            return res.status(400).json({message : "bad Request"})
        }
    }else{
        res.status(404).json({message : 'can\'t Find user with this code'})
    }
    
}

