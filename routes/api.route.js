import express from "express";
import userRoute from "./user.route.js";

const apiRoute = express.Router();

apiRoute.use("/users", userRoute);

export default apiRoute;