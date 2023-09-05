import express from "express";
import { AddNewPricePlan, GetALLPricesPlans } from "../Controlles/Price-controlles";
const PriceRoutes = express.Router();

PriceRoutes.post('/',AddNewPricePlan)
PriceRoutes.get('/plans',GetALLPricesPlans)
// PriceRoutes.delete('/blogs/:id',DeleteBlog)
// PriceRoutes.post('/blogs/:id',UpdateBlog)
export default PriceRoutes;