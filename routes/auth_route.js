import { Router } from "express";
import { login, signUp } from "../controllers/auth_controller.js";

export const authRouter = Router();

authRouter.post('/signup',signUp);

authRouter.get('/login',login);
