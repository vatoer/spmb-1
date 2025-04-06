import { parseNomorInduk } from "@/utils/kependudukan";
import { jenisKelaminSchema } from "@/zod/schemas/shared";
import { z } from "zod";

export const ortuSchema = z.object({
  id: z.string().optional(),
  nama: z
    .string()
    .min(3, { message: "Nama minimal 3 karakter" })
    .max(255, { message: "Nama maksimal 255 karakter" }),
  nik: z
    .string()
    .min(16, { message: "NIK 16 karakter" })
    .max(16, { message: "NIK 16 karakter" })
    .max(16)
    .refine((val) => parseNomorInduk(val) !== null, {
      message: "NIK tidak valid",
    }),
  kk: z.string().min(16, { message: "KK 16 karakter" }).max(16, {
    message: "KK 16 karakter",
  }),
  jenisKelamin: jenisKelaminSchema,
  tahunWafat: z.coerce.number().optional().nullable(),
  jenjangPendidikan: z
    .string()
    .min(1, { message: "Pilih pendidikan" })
    .max(255), //jenjangPendidikanSchema,
  pekerjaan: z.string().min(1, { message: "Pilih pekerjaan" }).max(255),
  pendapatan: z
    .string()
    .min(1, { message: "Pilih rentang pendapatan" })
    .max(255), //z.coerce.number().default(0).optional(),
});

export const orangTuaSchema = z.object({
  ayah: ortuSchema,
  ibu: ortuSchema,
});

export type OrangTua = z.infer<typeof orangTuaSchema>;

export type Ortu = z.infer<typeof ortuSchema>;
