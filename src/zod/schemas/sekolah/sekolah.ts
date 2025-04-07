import { z } from "zod";

export const dataSekolahAsalSchema = z.object({
  npsn: z
    .string()
    .min(1, {
      message:
        "nisn sekolah tidak boleh kosong, isi dengan tanda - jika tidak ada",
    })
    .max(8)
    .optional(),
  namaSekolah: z
    .string()
    .min(1, {
      message:
        "Nama sekolah tidak boleh kosong, isi dengan tanda - jika tidak ada",
    })
    .max(255),
  alamatSekolah: z
    .string()
    .min(1, {
      message: "Isi dengan tanda - jika tidak ada",
    })
    .max(255),
  tahunMasuk: z.coerce.number().optional(), // before we can use tahunMasuk: z.string().optional().transform(Number),
  tahunLulus: z.coerce.number().optional(),
});

export type DataSekolahAsal = z.infer<typeof dataSekolahAsalSchema>;
