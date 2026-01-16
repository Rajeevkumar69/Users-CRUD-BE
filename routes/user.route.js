import express from "express";
import userController from "../controllers/user.controller.js";


const userRoute = express.Router();

userRoute.get("/all", userController.getAll);
userRoute.post("/create", userController.createUser);
userRoute.patch("/edit/:id", userController.updateUser);
userRoute.delete("/delete/:id", userController.deleteUser)
userRoute.get("/:id", userController.getUserById);

export default userRoute;