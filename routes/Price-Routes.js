import express from "express";
import { AddNewPricePlan, GetALLPricesPlans, DeletePricePlan } from "../Controlles/Price-controlles";
const PriceRoutes = express.Router();

PriceRoutes.post('/',AddNewPricePlan)
PriceRoutes.get('/plans',GetALLPricesPlans)
PriceRoutes.delete('/plans/:id',DeletePricePlan)
// PriceRoutes.post('/blogs/:id',UpdateBlog)
export default PriceRoutes;