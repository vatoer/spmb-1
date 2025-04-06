"use server";

import { dbSpmb } from "@/lib/db-spmb";

export const getMuridFrom = async (pendaftaranId: string) => {
  const murid = await dbSpmb.pendaftaran.findFirst({
    where: {
      id: pendaftaranId,
    },
    include: {
      calonMurid: true,
    },
  });
  return murid;
};
