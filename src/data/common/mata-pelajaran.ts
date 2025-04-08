import { dbSpmb } from "@/lib/db-spmb";

export const getMataPelajaranJenjangDikdasmen = async (
  jenjangDisdasmen: string
) => {
  const mataPelajaran = await dbSpmb.mataPelajaran.findMany({
    where: {
      jenjangDikdasmen: jenjangDisdasmen,
    },
    orderBy: {
      urutan: "asc",
    },
  });
  return mataPelajaran;
};
