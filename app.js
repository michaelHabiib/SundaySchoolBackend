import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/User-Routes";
import adminRouter from "./routes/Admin-Routes";
import FundayRoutes from "./routes/Events/Funday-Routes"
import attRoutes from "./routes/Events/Att-Routes";
const app = express();

const passWord = encodeURIComponent("Michael2023#");


app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use('/api/events', FundayRoutes)
app.use('/api/Att', attRoutes)
mongoose
  .connect(
    `mongodb+srv://Michael_Ramzy:${passWord}@cluster0.ofxqht3.mongodb.net/SundaySchools?retryWrites=true&w=majority`
    )
  .then(() => app.listen(5000))
  .then(() => {
    console.log(`Database Connected, server runing on 5000 port`);
  });
