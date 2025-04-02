"use server";
import { getPrismaErrorResponse } from "@/actions/prisma-error-response";
import { dbSpmb } from "@/lib/db-spmb";
import { auth } from "@/modules/auth/auth";
import { ActionResponse } from "@/types/response";
import { DataDiri } from "@/zod/schemas/siswa/siswa";
import { createId } from "@paralleldrive/cuid2";
import { CalonSiswa } from "@prisma-db-spmb/client";

export async function simpanDataDiri(
  dataDiri: DataDiri
): Promise<ActionResponse<CalonSiswa>> {
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
    const newCalonSiswa = await dbSpmb.calonSiswa.upsert({
      where: {
        id: dataDiri.id || createId(),
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
        wilayahAdministratifId: dataDiri.wilayah,
        alamat: dataDiri.alamat,
        rt: dataDiri.rt,
        rw: dataDiri.rw,
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
        wilayahAdministratifId: dataDiri.wilayah,
        alamat: dataDiri.alamat,
        rt: dataDiri.rt,
        rw: dataDiri.rw,
      },
    });

    return {
      success: true,
      message: "Pendaftaran berhasil dibuat",
      data: newCalonSiswa,
    };
  } catch (error) {
    return getPrismaErrorResponse(error);
  }
}
