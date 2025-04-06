import { z } from "zod";

export enum JenisKelamin {
  LakiLaki = "Laki-laki",
  Perempuan = "Perempuan",
}

export const jenisKelaminSchema = z.nativeEnum(JenisKelamin, {
  errorMap: () => ({ message: "Pilih jenis kelamin" }),
});

export enum JenjangDikdasmen {
  "SD" = "SD",
  "SMP" = "SMP",
  "SMA" = "SMA",
  "LAINNYA" = "-",
}

// kewarganegaraan: z.enum(["WNI", "WNA"]),

export enum Kewarganegaraan {
  WNI = "WNI",
  WNA = "WNA",
}

export const kewarganegaraanSchema = z.nativeEnum(Kewarganegaraan, {
  errorMap: () => ({ message: "Pilih kewarganegaraan" }),
});

export const jenjangDikdasmenSchema = z.nativeEnum(JenjangDikdasmen, {
  errorMap: () => ({ message: "Pilih Jenjang" }),
});

export enum JenjangPendidikan {
  SD = "SD",
  SMP = "SMP",
  SMA = "SMA",
  D1 = "D1",
  D2 = "D2",
  D3 = "D3",
  D4 = "D4",
  S1 = "S1",
  S2 = "S2",
  S3 = "S3",
  Lainnya = "Lainnya",
}

export const jenjangPendidikanSchema = z.nativeEnum(JenjangPendidikan, {
  errorMap: () => ({ message: "Pilih pendidikan" }),
});

export enum Agama {
  Islam = "Islam",
  Protestan = "Protestan",
  Katolik = "Katolik",
  Hindu = "Hindu",
  Buddha = "Buddha",
  Konghucu = "Konghucu",
  Lainnya = "-",
}

export const agamaSchema = z.nativeEnum(Agama, {
  errorMap: () => ({ message: "Pilih Agama" }),
});

export enum GolonganDarah {
  "A" = "A",
  "B" = "B",
  "AB" = "AB",
  "O" = "O",
  "TIDAK_TAHU" = "Tidak tahu",
}

export const golonganDarahSchema = z.nativeEnum(GolonganDarah, {
  errorMap: () => ({ message: "Pilih Golongan darah" }),
});

export const StatusDomisiliEnum = z.enum([
  "SESUAI_KK",
  "SURAT_PINDAH",
  "SESUAI_DOMISILI_PONDOK",
  "SESUAI_DOMISILI_PANTI_ASUHAN",
  "LAINNYA",
]);

// Get the type safely
export type StatusDomisili = z.infer<typeof StatusDomisiliEnum>;

export const domisiliSchema = z.object({
  statusDomisili: StatusDomisiliEnum,
  alamat: z.string().min(3).max(255),
  wilayahAdministratifId: z.string().min(2).max(10),
  provinsi: z.string().min(2).max(2),
  kotaKabupaten: z.string().min(4).max(4),
  kecamatan: z.string().min(6).max(6),
  desaKelurahan: z.string().min(10).max(10),
  rt: z.string().min(1).max(3),
  rw: z.string().min(1).max(3),
  mapCoordinates: z.string().optional().nullable(),
});

export type Domisili = z.infer<typeof domisiliSchema>;
