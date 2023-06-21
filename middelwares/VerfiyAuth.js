import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import User from "../Modal/User";
import Funday from "../Modal/Events/Funday";
dotenv.config()

export function verfiyIsAdmin (req, res, next){
    const token = req.headers.token
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if(decoded.isAdmin){
                next()
            }else{
                return res.status(401).json({message : 'unathoized'})
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({message : 'invalid token'})
        }
    }else{
        return res.status(404).json({message : "No token Provided"})
    }
}
export async function verfiyUser (req, res, next){
    const token = req.headers.token 
    let user
    if(token){
        try {
            // console.log(token);
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            // console.log(decoded);
            req.UserIdFromToken = decoded.id
            const code = req.body.code  
            const UserIdFromDataBase = await User.find({code : code}, '_id')
                if(!UserIdFromDataBase){
                    // console.log(UserIdFromDataBase);
                    return res.status(404).json({message : "can't Find User with this code"})
                }else{
                    const idString = UserIdFromDataBase[0]._id.toString()
                    // console.log(idString);
                    // console.log(req.UserIdFromToken);  //undifind
                    if(req.UserIdFromToken === idString){
                        next()
                    }else{
                        res.status(401).json({message : 'unathorized please Book for your Self Only'})
                    }
                }
        } catch (error) {
            console.log(error);
            return res.status(401).json({message : 'invalid token'})
        }
    }else{
        return res.status(404).json({message : "No token Provided"})
    }
}
const colors = ['red', 'blue', 'black', 'brown', 'Green']

export async function Verfiychoice (req, res, next){

    const color = req.body.color
    if(colors.includes(color)){
        const count = await Funday.countDocuments({ color: color })
            if(count+1){
                if ((count+1) > 5) {
                    console.log(count + 1);
                    res.status(400).json({ message: 'this group is no more Avaliable' });
                    return;
                  } else if ((count + 1) <= 5) {
                    console.log(count + 1);
                    next();
                  }
            }else{
                console.log(count);
                console.log('fe 7war');
            }
    }else{
        res.status(404).json({message : "unvalid option "})
    }
}

