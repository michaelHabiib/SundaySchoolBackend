import express from "express";
import { AddNewBook, GetAllFundayRes, GetAllFundayResExcel,CashFundayRes } from "../../Controlles/Events/Funday-Controlles";
import { verfiyUser, VerfiychoiceFunday , verfiyIsAdmin} from "../../middelwares/VerfiyAuth";
const FundayRoutes = express.Router();

FundayRoutes.post('/funday', verfiyUser, VerfiychoiceFunday, AddNewBook)
FundayRoutes.get('/funday', GetAllFundayRes)
FundayRoutes.get('/funday/downloads', GetAllFundayResExcel)
FundayRoutes.put('/funday/update/:id', CashFundayRes)

export default FundayRoutes;