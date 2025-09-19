import { Router } from "express";
import {
  createCredentialController,
  getAllCredentialsController,
  getCredentialByIdController,
  updateCredentialController,
  deleteCredentialController
} from "../controllers/credentialController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { validateSchema } from "../middlewares/validateSchema";
import { credentialSchema } from "../schemas/credentialSchema";
import { validatePositiveNumberParam } from "../middlewares/validateParams";

const router = Router();

router.use(authenticateToken);

router.post("/", validateSchema(credentialSchema), createCredentialController);

router.get("/", getAllCredentialsController);

router.get("/:id", validatePositiveNumberParam("id"), getCredentialByIdController);

router.put("/:id", validatePositiveNumberParam("id"), validateSchema(credentialSchema), updateCredentialController);

router.delete("/:id", validatePositiveNumberParam("id"), deleteCredentialController);

export default router;
