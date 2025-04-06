import { dbSpmb } from "@/lib/db-spmb";
import { CalonMurid, OrangTua, Pendaftaran } from "@prisma-db-spmb/client";

interface CalonMuridWithOrangTua extends CalonMurid {
  ayah?: OrangTua | null;
  ibu?: OrangTua | null;
}

interface PendaftaranWithCalonMurid extends Pendaftaran {
  calonMurid?: CalonMuridWithOrangTua | null;
}

export async function getPendaftaran(
  userId?: string,
  pendaftaranId?: string
): Promise<PendaftaranWithCalonMurid[] | PendaftaranWithCalonMurid | null> {
  const pendaftaran = await dbSpmb.pendaftaran.findMany({
    where: {
      ...(userId && { userId }), // Include userId conditionally
      ...(pendaftaranId && { id: pendaftaranId }), // Include pendaftaranId conditionally
    },
    include: {
      calonMurid: {
        include: {
          ibu: true,
          ayah: true,
        },
      },
    },
  });

  // if pendaftaranId is provided, return a single object
  if (pendaftaranId) {
    const singlePendaftaran = pendaftaran.find(
      (pendaftaran) => pendaftaran.id === pendaftaranId
    );
    return singlePendaftaran || null; // Return null if not found
  }
  // if no pendaftaranId is provided, return an array of pendaftaran
  if (pendaftaran.length === 0) {
    return null; // Return null if no pendaftaran found
  }
  // Return the array of pendaftaran

  return pendaftaran;
}
