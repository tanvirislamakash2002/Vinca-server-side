import { Specialty } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createSpecialty = async (payload: Specialty): Promise<Specialty> => {
    // throw new Error("Testing error handling in create specialty service");
    const specialty = await prisma.specialty.create({
        data: payload
    })

    return specialty;

}

export const SpecialtyService = {
    createSpecialty
}