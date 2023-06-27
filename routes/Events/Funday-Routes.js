import express from "express";
import { AddNewBook, GetAllFundayRes, GetAllFundayResExcel } from "../../Controlles/Events/Funday-Controlles";
import { verfiyUser, Verfiychoice , verfiyIsAdmin} from "../../middelwares/VerfiyAuth";
const FundayRoutes = express.Router();

FundayRoutes.post('/funday', verfiyUser, Verfiychoice, AddNewBook)
FundayRoutes.get('/funday', verfiyIsAdmin, GetAllFundayRes)
FundayRoutes.get('/funday/downloads', verfiyIsAdmin, GetAllFundayResExcel)


export default FundayRoutes;