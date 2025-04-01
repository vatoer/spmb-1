import { dbSpmb } from "@/lib/db-spmb";
import { Pendaftaran } from "@prisma-db-spmb/client";

export async function getPendaftaran(userId?: string): Promise<Pendaftaran[]> {
  const pendaftaran = await dbSpmb.pendaftaran.findMany({
    where: {
      ...(userId && { userId }), // Include userId conditionally
    },
  });
  return pendaftaran;
}
