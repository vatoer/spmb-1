import { dbSpmb } from "@/lib/db-spmb";
import { DapoWilayah, Sekolah } from "@prisma-db-spmb/client";

export interface SekolahWithWilayah extends Sekolah {
  wilayah?: DapoWilayah | null;
}

export const getSekolahByNpsn = async (
  npsn: string
): Promise<SekolahWithWilayah | null> => {
  const sekolah = await dbSpmb.sekolah.findFirst({
    where: {
      npsn,
    },
    include: {
      wilayah: true,
    },
  });
  return sekolah;
};
