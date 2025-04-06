"use server";
import {
  getPendaftaran,
  isPendaftaranWithCalonMurid,
} from "@/data/pendaftaran/pendaftaran";
import { dbSpmb } from "@/lib/db-spmb";
import { auth } from "@/modules/auth/auth";
import { ActionResponse } from "@/types/response";
import { OrangTua, Ortu } from "@/zod/schemas/orang-tua/orang-tua";
import { createId } from "@paralleldrive/cuid2";

export async function simpanDataOrangTua(
  orangTua: OrangTua,
  pendaftaranId: string
): Promise<ActionResponse<OrangTua>> {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return {
      error: "Unauthorized",
      success: false,
      message: "User not authenticated",
    };
  }

  const userId = user.id;

  try {
    // Check if pendaftaranId is valid
    const pendaftaran = await getPendaftaran(user.id, pendaftaranId);
    if (!isPendaftaranWithCalonMurid(pendaftaran)) {
      return {
        error: "invalid or not found",
        success: false,
        message: "Pendaftaran invalid atau tidak ditemukan",
      };
    }

    const { ayah, ibu } = orangTua;

    const { calonMurid } = pendaftaran;

    if (!calonMurid) {
      return {
        error: "not found",
        success: false,
        message: "Calon murid tidak ditemukan",
      };
    }

    ayah.id = calonMurid.ayah?.id || createId();
    ibu.id = calonMurid.ibu?.id || createId();

    console.log("simpanDataOrangTua", orangTua, pendaftaranId);

    // start transaction

    await dbSpmb.$transaction(async (prisma) => {
      const insertOrangTua = async (ortu: Ortu) => {
        return await prisma.orangTua.upsert({
          where: {
            id: ortu.id || createId(),
            userId: userId,
          },
          update: {
            nama: ortu.nama,
            nik: ortu.nik,
            kk: ortu.kk,
            jenisKelamin: ortu.jenisKelamin,
            tahunWafat: ortu.tahunWafat,
            jenjangPendidikan: ortu.jenjangPendidikan,
            pekerjaanId: ortu.pekerjaan,
            pendapatanId: ortu.pendapatan,
          },
          create: {
            nama: ortu.nama,
            nik: ortu.nik,
            kk: ortu.kk,
            jenisKelamin: ortu.jenisKelamin,
            tahunWafat: ortu.tahunWafat,
            jenjangPendidikan: ortu.jenjangPendidikan,
            pekerjaanId: ortu.pekerjaan,
            pendapatanId: ortu.pendapatan,
            userId: userId,
          },
        });
      };

      const insertedAyah = await insertOrangTua(ayah);
      const insertedIbu = await insertOrangTua(ibu);

      const updateCalonMurid = await prisma.calonMurid.update({
        where: {
          id: calonMurid.id,
        },
        data: {
          ayahId: insertedAyah.id,
          ibuId: insertedIbu.id,
        },
      });
      console.log("updateCalonMurid", updateCalonMurid);
    });
    // end transaction
    return {
      success: true,
      message: "Data orang tua berhasil disimpan",
      data: orangTua,
    };
  } catch (error) {
    console.error(error);
    return {
      error: "internal server error",
      success: false,
      message: "Internal server error",
    };
  }
}
