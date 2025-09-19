import { Router } from "express";
import userRouter from "./userRouter";

const router = Router();

router.get("/health", (req, res) => {
  res.send("✅ Server is up and running!");
});

router.use(userRouter);

export default router;
