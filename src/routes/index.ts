import { Router } from "express";
import userRouter from "./userRouter";
import credentialRouter from "./credentialRouter";

const router = Router();

router.get("/health", (req, res) => {
  res.send("✅ Server is up and running!");
});

router.use(userRouter);
router.use("/credentials", credentialRouter);

export default router;
