import { Router } from "express";
import userRouter from "./userRouter";
import credentialRouter from "./credentialRouter";
import healthRouter from "./healthRouter";

const router = Router();

router.use(userRouter);
router.use("/credentials", credentialRouter);
router.use(healthRouter);


export default router;
