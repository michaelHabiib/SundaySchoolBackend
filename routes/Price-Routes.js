import express from "express";
import { AddNewPricePlan, GetALLPricesPlans, DeletePricePlan, UpdatePrice } from "../Controlles/Price-controlles";
const PriceRoutes = express.Router();

PriceRoutes.post('/',AddNewPricePlan)
PriceRoutes.get('/plans',GetALLPricesPlans)
PriceRoutes.delete('/plans/:id',DeletePricePlan)
PriceRoutes.post('/plans/:id',UpdatePrice)
export default PriceRoutes;