import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
    // throw new Error("Testing error handling in create specialty service");
    const specialty = await prisma.specialty.create({
        data: payload
    })

    return specialty;

}

const getAllSpecialties = async (): Promise<Specialty[]> => {

    const specialties = await prisma.specialty.findMany();
    return specialties;
}

export const SpecialtyService = {
    createSpecialty,
    getAllSpecialties
}