import { Request, Response } from "express";
import status from "http-status";
import { IQueryParams } from "../../interfaces/query.interface";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";

const deleteSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await SpecialtyService.deleteSpecialty(id as string);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Specialty deleted successfully',
            data: result
        });
    }
)
export const ScheduleController = {
    deleteSpecialty
}