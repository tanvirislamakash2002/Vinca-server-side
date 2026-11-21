import { Request, Response } from "express";
import status from "http-status";
import { IQueryParams } from "../../interfaces/query.interface";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { DoctorScheduleService } from "./doctorSchedule.service";

const createMyDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const doctorSchedule = await DoctorScheduleService.createMyDoctorSchedule(user, payload);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: 'Doctor schedule created successfully',
        data: doctorSchedule
    });
});


const getMyDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const query = req.query;
    const result = await DoctorScheduleService.getMyDoctorSchedules(user, query as IQueryParams);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Doctor schedules retrieved successfully',
        data: result.data,
        meta: result.meta
    });
});

const getAllDoctorSchedules = async (query: IQueryParams) => {
    const queryBuilder = new QueryBuilder<DoctorSchedules, Prisma.DoctorSchedulesWhereInput, Prisma.DoctorSchedulesInclude>(prisma.doctorSchedules, query, {
        filterableFields: doctorScheduleFilterableFields,
        searchableFields: doctorScheduleSearchableFields
    })

    const result = await queryBuilder
        .search()
        .filter()
        .paginate()
        .dynamicInclude(doctorScheduleIncludeConfig)
        .sort()
        .execute();

    return result;
}

export const DoctorScheduleController = {
    createMyDoctorSchedule,
    getMyDoctorSchedules,
    getAllDoctorSchedules
}
