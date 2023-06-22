import express from "express";
import { AddNewUser, GetAllUser, GetUsersByYear, GetUserBycode, login, GatAttOfUser } from "../Controlles/User-Controlles";
import {verfiyIsAdmin} from '../middelwares/VerfiyAuth'
const userRouter = express.Router();

// userRouter.get('/',Ge)

userRouter.post("/regstir", AddNewUser);
userRouter.post("/login", login);
userRouter.get("/", verfiyIsAdmin, GetAllUser);
userRouter.get("/year/:year", verfiyIsAdmin, GetUsersByYear);
userRouter.get("/code/:code", verfiyIsAdmin, GetUserBycode)
userRouter.get("/att/:code", verfiyIsAdmin, GatAttOfUser)
export default userRouter;
