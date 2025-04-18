"use server";

import { getSekolahByNpsn } from "@/data/common/sekolah";
import { getPendaftaran } from "@/data/pendaftaran/pendaftaran";
import { dbSpmb } from "@/lib/db-spmb";
import { auth } from "@/modules/auth/auth";
import { ActionResponse } from "@/types/response";
import { SekolahTujuan } from "@/zod/schemas/sekolah/sekolah";
import { Sekolah } from "@prisma-db-spmb/client";

export async function simpanSekolahTujuan(
  sekolahTujuan: SekolahTujuan,
  pendaftaranId: string
): Promise<ActionResponse<SekolahTujuan>> {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return {
      error: "Unauthorized",
      success: false,
      message: "User not authenticated",
    };
  }

  try {
    // Check if pendaftaranId is valid
    const pendaftaran = await getPendaftaran(user.id, pendaftaranId);
    if (!pendaftaran) {
      return {
        error: "Pendaftaran not found",
        success: false,
        message: "Pendaftaran not found",
      };
    }

    const sekolah = await dbSpmb.sekolah.findFirst({
      where: {
        npsn: sekolahTujuan.npsn,
      },
    });

    if (!sekolah) {
      return {
        error: "Invalid NPSN",
        success: false,
        message: "NPSN tidak ditemukan",
      };
    }

    // Update pendaftaran with sekolahTujuan data

    await dbSpmb.pendaftaran.update({
      where: {
        id: pendaftaranId,
        userId: user.id,
      },
      data: {},
    });

    return {
      success: true,
      message: "Sekolah asal berhasil disimpan",
      data: sekolahTujuan,
    };
  } catch (error) {
    console.error("Error saving sekolah asal:", error);
    return {
      error: "CE-001",
      success: false,
      message:
        "Tidak dapat menyimpan data sekolah asal, silakan periksa kembali isian formulir",
    };
  }
}

export const getSekolahTujuanByNpsn = async (
  npsn: string
): Promise<ActionResponse<Sekolah>> => {
  try {
    const sekolah = await getSekolahByNpsn(npsn);
    if (!sekolah) {
      return {
        error: "Sekolah not found",
        success: false,
        message: "Sekolah tidak ditemukan",
      };
    }

    return {
      success: true,
      message: "Sekolah asal ditemukan",
      data: sekolah,
    };
  } catch (error) {
    console.error("Error fetching sekolah asal by NPSN:", error);
    return {
      error: "Error fetching sekolah asal",
      success: false,
      message: "Tidak dapat mengambil data sekolah asal",
    };
  }
};
