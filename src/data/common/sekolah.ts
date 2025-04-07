import { dbSpmb } from "@/lib/db-spmb";

export const getSekolahByNpsn = (npsn: string) => {
  return dbSpmb.sekolah.findFirst({
    where: {
      npsn,
    },
  });
};
