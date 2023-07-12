import express from "express";
import { SaveAtt, GetAttendanceOfDay, downloadAttendanceSheet, downloadAttendanceSheetInRange } from "../../Controlles/Events/Att-controlles";
import { verfiyIsAdmin } from "../../middelwares/VerfiyAuth";
const attRoutes = express.Router();

attRoutes.post('/', SaveAtt)
attRoutes.get('/:day/:kidClass', GetAttendanceOfDay)
// attRoutes.get('genrate/:day/:kidClass', GetAttendanceOfDayGenrate)
attRoutes.get('/download/:Day/:year', downloadAttendanceSheet)
attRoutes.get('/download/range/:start/:end/:year', downloadAttendanceSheetInRange)

export default attRoutes;