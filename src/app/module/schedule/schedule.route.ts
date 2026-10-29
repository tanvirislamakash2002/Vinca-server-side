import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { ScheduleController } from "./schedule.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { ScheduleValidation } from "./schedule.validation";

const router = Router();

router.post('/', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(ScheduleValidation.createScheduleZodSchema), ScheduleController.createSchedule);

export const scheduleRoutes = router;