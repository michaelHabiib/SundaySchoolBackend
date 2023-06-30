import express from "express";
import { SaveAtt, GetAttOfaDay, GetAttendanceOfDay } from "../../Controlles/Events/Att-controlles";
import { verfiyIsAdmin } from "../../middelwares/VerfiyAuth";
const attRoutes = express.Router();

attRoutes.post('/', SaveAtt)
attRoutes.get('/:day', GetAttendanceOfDay)

export default attRoutes;