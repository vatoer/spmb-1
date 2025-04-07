"use server";

import { getSekolahByNpsn } from "@/data/common/sekolah";
import { getPendaftaran } from "@/data/pendaftaran/pendaftaran";
import { dbSpmb } from "@/lib/db-spmb";
import { auth } from "@/modules/auth/auth";
import { ActionResponse } from "@/types/response";
import { SekolahAsal } from "@/zod/schemas/sekolah/sekolah";
import { Sekolah } from "@prisma-db-spmb/client";

export async function simpanSekolahAsal(
  sekolahAsal: SekolahAsal,
  pendaftaranId: string
): Promise<ActionResponse<SekolahAsal>> {
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

    // check npsn is valid
    if (!sekolahAsal.npsn) {
      // pastikan bahwa nama sekolah dan alamat sekolah tidak kosong
      if (!sekolahAsal.namaSekolah || !sekolahAsal.alamatSekolah) {
        return {
          error: "Invalid data",
          success: false,
          message:
            "Isi NPSN atau jika tidak ada NPSN isi dengan '-' kemudian isi Nama Sekolah dan Alamat Sekolah",
        };
      }
    } else {
      // pastikan bahwa npsn adalah valid
      const sekolah = await dbSpmb.sekolah.findFirst({
        where: {
          npsn: sekolahAsal.npsn,
        },
      });
      if (!sekolah) {
        return {
          error: "Invalid NPSN",
          success: false,
          message: "NPSN tidak ditemukan",
        };
      } else {
        // kosongkan nama sekolah dan alamat sekolah, nantinya nama dan alamat sekolah akan diambil dari data sekolah yang ada di database
        sekolahAsal.namaSekolah = null;
        sekolahAsal.alamatSekolah = null;
      }
    }

    // Update pendaftaran with sekolahAsal data

    await dbSpmb.pendaftaran.update({
      where: {
        id: pendaftaranId,
        userId: user.id,
      },
      data: {
        npsnSekolahAsal: sekolahAsal.npsn,
        namaSekolahAsal: sekolahAsal.namaSekolah,
        alamatSekolahAsal: sekolahAsal.alamatSekolah,
      },
    });

    return {
      success: true,
      message: "Sekolah asal berhasil disimpan",
      data: sekolahAsal,
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

export const getSekolahAsalByNpsn = async (
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
