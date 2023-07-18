import express from "express";
import { sentEmail } from "../../Controlles/mail/Mail-controller";
const mailRoutes = express.Router();

mailRoutes.post('/form',sentEmail)

export default mailRoutes;