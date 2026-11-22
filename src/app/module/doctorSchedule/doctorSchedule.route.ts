import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { DoctorScheduleController } from "./doctorSchedule.controller";


const router = Router();

router.post("/create-my-doctor-schedule",
    checkAuth(Role.DOCTOR),
    DoctorScheduleController.createMyDoctorSchedule);
router.get("/my-doctor-schedules", checkAuth(Role.DOCTOR), DoctorScheduleController.getMyDoctorSchedules);
router.get("/", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DoctorScheduleController.getAllDoctorSchedules);
router.get("/:doctorId/schedule/:scheduleId", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DoctorScheduleController.getDoctorScheduleById);
router.patch("/update-my-doctor-schedule",
    checkAuth(Role.DOCTOR),
    DoctorScheduleController.updateMyDoctorSchedule);
export const DoctorScheduleRoutes = router;