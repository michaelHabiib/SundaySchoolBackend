import express from "express";
import { AddNewBook, GetAllFundayRes, GetAllFundayResExcel,
        CashFundayRes, getFundayCount, getCashForFundays } from "../../Controlles/Events/Funday-Controlles";
import { verfiyUser, VerfiychoiceFunday , verfiyIsAdmin} from "../../middelwares/VerfiyAuth";
const FundayRoutes = express.Router();

FundayRoutes.post('/funday', verfiyUser, VerfiychoiceFunday, AddNewBook)
FundayRoutes.get('/funday/:eventCode', GetAllFundayRes)
FundayRoutes.get('/funday/count/code', getFundayCount)
FundayRoutes.get('/funday/count/cash', getCashForFundays)
FundayRoutes.get('/funday/downloads/:eventCode', GetAllFundayResExcel)
FundayRoutes.put('/funday/update/:id', CashFundayRes)

export default FundayRoutes;