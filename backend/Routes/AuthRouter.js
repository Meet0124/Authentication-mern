import { Router } from "express";
import {
  signUpValidation,
  loginValidation,
} from "../Middlewares/AuthValidation.js";
import { signup, login } from "../Controllers/AuthController.js";

const router = Router();

router.post("/signup", signUpValidation, signup);
router.post("/login", loginValidation, login);

export default router;
