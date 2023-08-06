import express from "express";
import {AddNewBook, GetAllNadyRes, CashNadyRes, GetAllNadyResExcel} from '../../Controlles/Events/Nady-controlles'
import { verfiyUser, verfiyIsAdmin, VerfiychoiceNady} from "../../middelwares/VerfiyAuth";
const NadyRoutes = express.Router();

NadyRoutes.post('/nady', verfiyUser, AddNewBook)
NadyRoutes.get('/nady/res/:eventCode', GetAllNadyRes)
NadyRoutes.get('/nady/:code/:duration', CashNadyRes)
NadyRoutes.get('/nady/downloads', GetAllNadyResExcel)


export default NadyRoutes;