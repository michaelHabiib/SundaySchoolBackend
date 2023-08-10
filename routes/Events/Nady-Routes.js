import express from "express";
import {AddNewBook, GetAllNadyRes, CashNadyRes,
        GetAllNadyResExcel, getNadyCount} from '../../Controlles/Events/Nady-controlles'
import { verfiyUser, verfiyIsAdmin, VerfiychoiceNady} from "../../middelwares/VerfiyAuth";
const NadyRoutes = express.Router();

NadyRoutes.post('/nady', verfiyUser, AddNewBook)
NadyRoutes.get('/nady/res/:eventCode', GetAllNadyRes)
NadyRoutes.get('/nady/res/count/code', getNadyCount)
NadyRoutes.get('/nady/cash/:code/:eventCode', CashNadyRes)
NadyRoutes.get('/nady/downloads/:eventCode', GetAllNadyResExcel)

export default NadyRoutes;