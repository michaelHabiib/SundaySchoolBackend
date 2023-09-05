import express from "express";
import { AddNewPricePlan } from "../Controlles/Price-controlles";
const PriceRoutes = express.Router();

PriceRoutes.post('/',AddNewPricePlan)
// PriceRoutes.get('/blogs',getAllBlogs)
// PriceRoutes.delete('/blogs/:id',DeleteBlog)
// PriceRoutes.post('/blogs/:id',UpdateBlog)
export default PriceRoutes;