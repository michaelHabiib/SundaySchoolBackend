import express from "express";
import { SaveAtt, GetAttendanceOfDay, GetAttendanceOfDayGenrate } from "../../Controlles/Events/Att-controlles";
import { verfiyIsAdmin } from "../../middelwares/VerfiyAuth";
const attRoutes = express.Router();

attRoutes.post('/', SaveAtt)
attRoutes.get('/:day/:kidClass', GetAttendanceOfDay)
attRoutes.get('genrate/:day', GetAttendanceOfDayGenrate)

export default attRoutes;