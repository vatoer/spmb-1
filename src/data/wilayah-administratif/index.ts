"use server";

import { dbSpmb } from "@/lib/db-spmb";
import { WilayahAdministratif } from "@prisma-db-spmb/client";

export const getWilayahAdministratif = async (
  indukId: string | null
): Promise<WilayahAdministratif[]> => {
  try {
    const wilayahAdministratif = await dbSpmb.wilayahAdministratif.findMany({
      where: {
        indukId: indukId ? indukId : null,
      },
    });
    return wilayahAdministratif;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get wilayah administratif`);
  }
};
