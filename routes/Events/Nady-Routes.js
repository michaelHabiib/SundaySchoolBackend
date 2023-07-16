import express from "express";
import {AddNewBook, GetAllNadyRes, CashNadyRes} from '../../Controlles/Events/Nady-controlles'
import { verfiyUser, verfiyIsAdmin, VerfiychoiceNady} from "../../middelwares/VerfiyAuth";
const NadyRoutes = express.Router();

NadyRoutes.post('/nady', verfiyUser, AddNewBook)
NadyRoutes.get('/nady/res', GetAllNadyRes)
NadyRoutes.get('/nady/:code/:duration', CashNadyRes)
// NadyRoutes.get('/funday/downloads', verfiyIsAdmin, GetAllFundayResExcel)


export default NadyRoutes;