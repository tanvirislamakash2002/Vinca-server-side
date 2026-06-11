import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { AuthController } from "./auth.controller";

const router = Router()

router.post("/register", AuthController.registerPatient)


export const AuthRoutes = router;