import express from "express";
import { AddNewUser, GetAllUser, GetUsersByYear, GetUserBycode, login, GetAttendanceOfUser } from "../Controlles/User-Controlles";
import {verfiyIsAdmin} from '../middelwares/VerfiyAuth'
const userRouter = express.Router();

// userRouter.get('/',Ge)

userRouter.post("/regstir", AddNewUser);
userRouter.post("/login", login);
userRouter.get("/", GetAllUser);
userRouter.get("/year/:year", GetUsersByYear);
userRouter.get("/code/:code", GetUserBycode)
userRouter.get("/att/:code", GetAttendanceOfUser)
export default userRouter;
    