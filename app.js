import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User-Routes";
import adminRouter from "./routes/Admin-Routes";
import FundayRoutes from "./routes/Events/Funday-Routes"
import attRoutes from "./routes/Events/Att-Routes";
import NadyRoutes from "./routes/Events/Nady-Routes"
import mailRoutes from "./routes/mail/mail-Routes";
import cors from 'cors';
import bodyParser from "body-parser";
import EventRoutes from "./routes/Events/Event-Routes";



const passWord = encodeURIComponent("Michael2023#");

const app = express();

// app.use(bodyParser.json());

app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    next();
  });
  app.use(cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'token']
  }));

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use('/api/events', FundayRoutes)
app.use('/api/events', NadyRoutes)
app.use('/api/Att', attRoutes)
app.use('/api/mail', mailRoutes)
app.use('/api/add', EventRoutes)
mongoose
  .connect(
    `mongodb+srv://Michael_Ramzy:${passWord}@cluster0.ofxqht3.mongodb.net/SundaySchools?retryWrites=true&w=majority`
    )
  .then(() => app.listen(5000))
  .then(() => {
    console.log(`Database Connected, server runing on 5000 port`);
  });
