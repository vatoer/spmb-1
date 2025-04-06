"use server";
import { getPrismaErrorResponse } from "@/actions/prisma-error-response";
import {
  getPendaftaran,
  isPendaftaranWithCalonMurid,
} from "@/data/pendaftaran/pendaftaran";
import { dbSpmb } from "@/lib/db-spmb";
import { auth } from "@/modules/auth/auth";
import { ActionResponse } from "@/types/response";
import { DataDiri } from "@/zod/schemas/murid/murid";
import { createId } from "@paralleldrive/cuid2";
import { CalonMurid } from "@prisma-db-spmb/client";

export async function simpanDataDiri(
  dataDiri: DataDiri,
  pendaftaranId: string
): Promise<ActionResponse<CalonMurid>> {
  // Implementasi untuk membuat pendaftaran baru

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
    let dataDiriId = createId();
    if (isPendaftaranWithCalonMurid(pendaftaran)) {
      dataDiriId = pendaftaran.calonMurid?.id || createId();
    }

    const newCalonMurid = await dbSpmb.calonMurid.upsert({
      where: {
        id: dataDiriId,
        userId: user.id,
      },
      create: {
        nama: dataDiri.nama,
        kewarganegaraan: dataDiri.kewarganegaraan,
        keteranganKewarganegaraan: dataDiri.keteranganKewarganegaraan,
        nisn: dataDiri.nisn,
        kk: dataDiri.kk,
        nik: dataDiri.nik,
        paspor: dataDiri.paspor,
        tempatLahir: dataDiri.tempatLahir,
        tanggalLahir: dataDiri.tanggalLahir,
        jenisKelamin: dataDiri.jenisKelamin,
        agama: dataDiri.agama,
        golonganDarah: dataDiri.golonganDarah,
        jenjangDikdasmen: dataDiri.jenjangDikdasmen,
        mapCoordinates: dataDiri.mapCoordinates,
        statusDomisili: dataDiri.statusDomisili,
        wilayahAdministratifId: dataDiri.wilayahAdministratifId,
        alamat: dataDiri.alamat,
        rt: dataDiri.rt,
        rw: dataDiri.rw,
        userId: user.id,
      },
      update: {
        nama: dataDiri.nama,
        kewarganegaraan: dataDiri.kewarganegaraan,
        keteranganKewarganegaraan: dataDiri.keteranganKewarganegaraan,
        nisn: dataDiri.nisn,
        kk: dataDiri.kk,
        nik: dataDiri.nik,
        paspor: dataDiri.paspor,
        tempatLahir: dataDiri.tempatLahir,
        tanggalLahir: dataDiri.tanggalLahir,
        jenisKelamin: dataDiri.jenisKelamin,
        agama: dataDiri.agama,
        golonganDarah: dataDiri.golonganDarah,
        jenjangDikdasmen: dataDiri.jenjangDikdasmen,
        mapCoordinates: dataDiri.mapCoordinates,
        statusDomisili: dataDiri.statusDomisili,
        wilayahAdministratifId: dataDiri.wilayahAdministratifId,
        alamat: dataDiri.alamat,
        rt: dataDiri.rt,
        rw: dataDiri.rw,
      },
    });

    // Update pendaftaran with calonMuridId
    await dbSpmb.pendaftaran.update({
      where: {
        id: pendaftaranId,
      },
      data: {
        calonMurid: {
          connect: {
            id: newCalonMurid.id,
          },
        },
      },
    });

    return {
      success: true,
      message: "Data diri berhasil disimpan",
      data: newCalonMurid,
    };
  } catch (error) {
    return getPrismaErrorResponse(error);
  }
}
