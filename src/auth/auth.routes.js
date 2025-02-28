import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidator, loginValidator } from "../middlewares/user-validator.js";

const router = Router();

router.post("/register", register, registerValidator)

router.post("/login/:uid", login, loginValidator)

export default router;

