import { Router } from "express";
import { signUpController } from "../controllers/userController";
import { validateSchema } from "../middlewares/validateSchema";
import { signUpSchema } from "../schemas/userSchema";
import { signInController } from "../controllers/userController";
import { signInSchema } from "../schemas/userSchema";
import { eraseUserController } from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/sign-up", validateSchema(signUpSchema), signUpController);
router.post("/sign-in", validateSchema(signInSchema), signInController);
router.delete("/erase", authenticateToken, eraseUserController);

export default router;
