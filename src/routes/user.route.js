import { Router } from "express";
import { UserControllers } from "../controllers/user.controller.js";

const UserRouter = Router();

UserRouter.post("/login", UserControllers.loginUser);
UserRouter.post("/register", UserControllers.registerUser);
UserRouter.post("/admin", UserControllers.loginAdmin);

export default UserRouter;
