import status from "http-status";
import { Doctor, Prisma } from "../../../generated/prisma/client";
import { UserStatus } from "../../../generated/prisma/enums";
import AppError from "../../errorHelpers/AppError";
import { IQueryParams } from "../../interfaces/query.interface";
import { prisma } from "../../lib/prisma";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { doctorFilterableFields, doctorIncludeConfig, doctorSearchableFields } from "./doctor.constant";
import { IUpdateDoctorPayload } from "./doctor.interface";

// /doctors?specialty=cardiology&include=doctorSchedules,appointments
const getAllDoctors = async (query: IQueryParams) => {
    // const doctors = await prisma.doctor.findMany({
    //     where: {
    //         isDeleted: false,
    //     },
    //     include: {
    //         user: true,
    //         specialties: {
    //             include: {
    //                 specialty: true
    //             }
    //         }
    //     }
    // })

    // // const query = new QueryBuilder().paginate().search().filter();
    // return doctors;

    const queryBuilder = new QueryBuilder<Doctor, Prisma.DoctorWhereInput, Prisma.DoctorInclude>(
        prisma.doctor,
        query,
        {
            searchableFields: doctorSearchableFields,
            filterableFields: doctorFilterableFields,
        }
    )

    const result = await queryBuilder
        .search()
        .filter()
        .where({
            isDeleted: false,
        })
        .include({
            user: true,
            // specialties: true,
            specialties: {
                include: {
                    specialty: true
                }
            },
        })
        .dynamicInclude(doctorIncludeConfig)
        .paginate()
        .sort()
        .fields()
        .execute();

    console.log(result);
    return result;
}

const getDoctorById = async (id: string) => {
    const doctor = await prisma.doctor.findUnique({
        where: {
            id,
            isDeleted: false,
        },
        include: {
            user: true,
            specialties: {
                include: {
                    specialty: true
                }
            },
            appointments: {
                include: {
                    patient: true,
                    schedule: true,
                    prescription: true,
                }
            },
            doctorSchedules: {
                include: {
                    schedule: true,
                }
            },
            reviews: true
        }
    })
    return doctor;
}

export const DoctorService = {
    getAllDoctors,
    getDoctorById
}