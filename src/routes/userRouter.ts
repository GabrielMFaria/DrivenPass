import { Router } from "express";
import { signUpController } from "../controllers/userController";
import { validateSchema } from "../middlewares/validateSchema";
import { signUpSchema } from "../schemas/userSchema";

const router = Router();

router.post("/sign-up", validateSchema(signUpSchema), signUpController);

export default router;
