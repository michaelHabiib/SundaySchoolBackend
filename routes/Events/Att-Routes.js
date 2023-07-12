import express from "express";
import { SaveAtt, GetAttendanceOfDay, downloadAttendanceSheet, GetAttendanceOfUser } from "../../Controlles/Events/Att-controlles";
import { verfiyIsAdmin } from "../../middelwares/VerfiyAuth";
const attRoutes = express.Router();

attRoutes.post('/', SaveAtt)
attRoutes.get('/:day/:kidClass', GetAttendanceOfDay)
attRoutes.get('/download/:Day/:year', downloadAttendanceSheet)
attRoutes.get('/:code', GetAttendanceOfUser)


export default attRoutes;