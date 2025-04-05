import { dbSpmb } from "@/lib/db-spmb";
import { Pendaftaran } from "@prisma-db-spmb/client";

export async function getPendaftaran(
  userId?: string,
  pendaftaranId?: string
): Promise<Pendaftaran[]> {
  const pendaftaran = await dbSpmb.pendaftaran.findMany({
    where: {
      ...(userId && { userId }), // Include userId conditionally
      ...(pendaftaranId && { id: pendaftaranId }), // Include pendaftaranId conditionally
    },
  });
  return pendaftaran;
}
