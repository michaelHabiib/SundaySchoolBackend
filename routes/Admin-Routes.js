import express from "express";
import { AddNewAdmin, login } from "../Controlles/Admin-controlles";
const adminRouter = express.Router();

adminRouter.post('/add', AddNewAdmin)
adminRouter.post('/login',login )

export default adminRouter;