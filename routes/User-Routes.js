import express from "express";
import {AddNewUser, GetAllUser, GetUsersByYear,
        GetUserBycode, login, GetAttendanceOfUser,
        GetUserCount, countUserInEachClass, getBirthdaysOfToday } from "../Controlles/User-Controlles";
import {verfiyIsAdmin} from '../middelwares/VerfiyAuth'
const userRouter = express.Router();

// userRouter.get('/',Ge)

userRouter.post("/regstir", AddNewUser);
userRouter.post("/login", login);
userRouter.get("/", GetAllUser);
userRouter.get("/count", GetUserCount);
userRouter.get("/count/class", countUserInEachClass);
userRouter.get("/count/birthday", getBirthdaysOfToday);
userRouter.get("/year/:year", GetUsersByYear);
userRouter.get("/code/:code", GetUserBycode)
userRouter.get("/att/:code", GetAttendanceOfUser)
export default userRouter;
    