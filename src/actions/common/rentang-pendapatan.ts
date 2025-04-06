"use server";

import { dbSpmb } from "@/lib/db-spmb";

export interface RentangPendapatanOption {
  value: string;
  label: string;
  rentangAtas: number;
  rentangBawah: number;
}

export const getOptionsRentangPendapatan = async () => {
  const rentangPendapatan = await dbSpmb.rentangPendapatan.findMany({
    select: {
      id: true,
      nama: true,
      rentangAtas: true,
      rentangBawah: true,
    },
    orderBy: {
      rentangBawah: "asc",
    },
  });
  return rentangPendapatan.map((pendapatan) => ({
    value: pendapatan.id,
    label: pendapatan.nama,
    rentangAtas: pendapatan.rentangAtas,
    rentangBawah: pendapatan.rentangBawah,
  }));
};
