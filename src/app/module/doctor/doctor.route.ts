import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { DoctorController } from "./doctor.controller";
import { updateDoctorZodSchema } from "./doctor.validation";

const router = Router();

router.get("/",
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    DoctorController.getAllDoctors);


export const DoctorRoutes = router;