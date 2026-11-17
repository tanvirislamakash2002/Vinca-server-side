import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { DoctorScheduleController } from "./doctorSchedule.controller";


const router = Router();

router.post("/create-my-doctor-schedule",
    checkAuth(Role.DOCTOR),
    DoctorScheduleController.createMyDoctorSchedule);

export const DoctorScheduleRoutes = router;