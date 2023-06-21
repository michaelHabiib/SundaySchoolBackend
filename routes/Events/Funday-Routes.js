import express from "express";
import { AddNewBook } from "../../Controlles/Events/Funday-Controlles";
import { verfiyUser, Verfiychoice } from "../../middelwares/VerfiyAuth";
const FundayRoutes = express.Router();

FundayRoutes.post('/funday', verfiyUser, Verfiychoice, AddNewBook)










export default FundayRoutes;