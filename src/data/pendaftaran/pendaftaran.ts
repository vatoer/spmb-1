import { dbSpmb } from "@/lib/db-spmb";
import { DataDiri } from "@/zod/schemas/murid/murid";
import { OrangTua as OrangTuaZod } from "@/zod/schemas/orang-tua/orang-tua";
import { SekolahAsal } from "@/zod/schemas/sekolah/sekolah";
import {
  Agama,
  GolonganDarah,
  JenisKelamin,
  JenjangDikdasmen,
  Kewarganegaraan,
  StatusDomisili,
} from "@/zod/schemas/shared";
import { CalonMurid, OrangTua, Pendaftaran } from "@prisma-db-spmb/client";

interface CalonMuridWithOrangTua extends CalonMurid {
  ayah?: OrangTua | null;
  ibu?: OrangTua | null;
}

export interface PendaftaranWithCalonMurid extends Pendaftaran {
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

  // Return a single object if pendaftaranId is provided, otherwise return the array or null
  return pendaftaranId
    ? pendaftaran[0] || null // Return the first match or null if not found
    : pendaftaran.length > 0
    ? pendaftaran
    : null; // Return the array or null if empty
}

export function isPendaftaranWithCalonMurid(
  pendaftaran: PendaftaranWithCalonMurid | null | PendaftaranWithCalonMurid[]
): pendaftaran is PendaftaranWithCalonMurid {
  return (
    pendaftaran !== null &&
    !Array.isArray(pendaftaran) &&
    typeof pendaftaran === "object" &&
    "calonMurid" in pendaftaran
  );
}

export const mapDbToZodDataDiri = (
  calonMurid?: CalonMurid | null
): DataDiri => {
  const dataDiri: DataDiri = {
    id: calonMurid?.id,
    nama: calonMurid?.nama || "",
    kk: calonMurid?.kk || "",
    nik: calonMurid?.nik || "",
    nisn: calonMurid?.nisn || "",
    kewarganegaraan: (calonMurid?.kewarganegaraan as Kewarganegaraan) || "WNI",
    keteranganKewarganegaraan: calonMurid?.keteranganKewarganegaraan,
    paspor: calonMurid?.paspor,
    tempatLahir: calonMurid?.tempatLahir || "",
    tanggalLahir: new Date(calonMurid?.tanggalLahir || ""),
    jenisKelamin:
      (calonMurid?.jenisKelamin as JenisKelamin) || JenisKelamin.LakiLaki,
    agama: (calonMurid?.agama as Agama) || Agama.Lainnya,
    golonganDarah:
      (calonMurid?.golonganDarah as GolonganDarah) || GolonganDarah.TIDAK_TAHU,
    jenjangDikdasmen:
      (calonMurid?.jenjangDikdasmen as JenjangDikdasmen) ||
      JenjangDikdasmen.LAINNYA,
    statusDomisili: (calonMurid?.statusDomisili as StatusDomisili) || "LAINNYA",
    alamat: calonMurid?.alamat || "",
    wilayahAdministratifId: calonMurid?.wilayahAdministratifId || "",
    provinsi: calonMurid?.wilayahAdministratifId.slice(0, 2) || "-",
    kotaKabupaten: calonMurid?.wilayahAdministratifId.slice(0, 4) || "-",
    kecamatan: calonMurid?.wilayahAdministratifId.slice(0, 6) || "-",
    desaKelurahan: calonMurid?.wilayahAdministratifId || "-",
    rt: calonMurid?.rt || "",
    rw: calonMurid?.rw || "",
    mapCoordinates: calonMurid?.mapCoordinates || "",
  };
  return dataDiri;
};

export const mapDbToZodDataOrangTua = (
  ayah?: OrangTua | null,
  ibu?: OrangTua | null
): OrangTuaZod => {
  return {
    ayah: {
      ...ayah,
      id: ayah?.id,
      jenisKelamin: JenisKelamin.LakiLaki,
      kk: ayah?.kk || "",
      nik: ayah?.nik || "",
      nama: ayah?.nama || "",
      tahunWafat: ayah?.tahunWafat || null,
      jenjangPendidikan: ayah?.jenjangPendidikan || "",
      pekerjaan: ayah?.pekerjaanId || "",
      pendapatan: ayah?.pendapatanId || "",
    },
    ibu: {
      ...ibu,
      id: ibu?.id,
      jenisKelamin: JenisKelamin.Perempuan,
      kk: ibu?.kk || "",
      nik: ibu?.nik || "",
      nama: ibu?.nama || "",
      tahunWafat: ibu?.tahunWafat || null,
      jenjangPendidikan: ibu?.jenjangPendidikan || "",
      pekerjaan: ibu?.pekerjaanId || "",
      pendapatan: ibu?.pendapatanId || "",
    },
  };
};

export const mapDbToZodSekolahAsal = (
  pendaftaran: Pendaftaran
): SekolahAsal => {
  const tahun = new Date().getFullYear();
  return {
    npsn: pendaftaran.npsnSekolahAsal || "-",
    namaSekolah: pendaftaran.namaSekolahAsal || "-",
    alamatSekolah: pendaftaran.alamatSekolahAsal || "-",
    tahunMasuk: pendaftaran.tahunMasukSekolahAsal || tahun,
    tahunLulus: pendaftaran.tahunLulusSekolahAsal || tahun,
  };
};
