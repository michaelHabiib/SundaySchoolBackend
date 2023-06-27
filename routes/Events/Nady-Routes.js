import express from "express";
import {AddNewBook, GetAllNadyRes} from '../../Controlles/Events/Nady-controlles'
import { verfiyUser, Verfiychoice , verfiyIsAdmin} from "../../middelwares/VerfiyAuth";
const NadyRoutes = express.Router();

NadyRoutes.post('/nady', verfiyUser, Verfiychoice, AddNewBook)
NadyRoutes.get('/nady', verfiyIsAdmin, GetAllNadyRes)
// NadyRoutes.get('/funday/downloads', verfiyIsAdmin, GetAllFundayResExcel)


export default NadyRoutes;