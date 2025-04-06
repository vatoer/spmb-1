"use server";
import { dbSpmb } from "@/lib/db-spmb";

export interface PekerjaanOption {
  value: string;
  label: string;
}
export const getOptionsPekerjaan = async () => {
  const pekerjaan = await dbSpmb.pekerjaan.findMany({
    select: {
      id: true,
      nama: true,
    },
    orderBy: {
      nama: "asc",
    },
  });
  return pekerjaan.map((pekerjaan) => ({
    value: pekerjaan.id,
    label: pekerjaan.nama,
  }));
};
