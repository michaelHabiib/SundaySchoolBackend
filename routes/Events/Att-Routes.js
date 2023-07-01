import express from "express";
import { SaveAtt, GetAttendanceOfDay } from "../../Controlles/Events/Att-controlles";
import { verfiyIsAdmin } from "../../middelwares/VerfiyAuth";
const attRoutes = express.Router();

attRoutes.post('/', SaveAtt)
attRoutes.post('/:day', GetAttendanceOfDay)

export default attRoutes;