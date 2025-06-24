import { Router } from "express";
import { login, signUp } from "../controllers/auth_controller.js";
import { getProfileNames } from '../controllers/profile_controller.js';
import { authenticate } from "../middleware/authenticate.js";

export const authRouter = Router();

authRouter.post('/signup', signUp);

authRouter.post('/login', login);

authRouter.get('/profile/:id', authenticate, getProfileNames);