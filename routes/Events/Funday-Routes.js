import express from "express";
import { AddNewBook, GetAllFundayRes, GetAllFundayResExcel } from "../../Controlles/Events/Funday-Controlles";
import { verfiyUser, VerfiychoiceFunday , verfiyIsAdmin} from "../../middelwares/VerfiyAuth";
const FundayRoutes = express.Router();

FundayRoutes.post('/funday', verfiyUser, VerfiychoiceFunday, AddNewBook)
FundayRoutes.get('/funday', verfiyIsAdmin, GetAllFundayRes)
FundayRoutes.get('/funday/downloads', verfiyIsAdmin, GetAllFundayResExcel)


export default FundayRoutes;