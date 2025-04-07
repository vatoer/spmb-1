import { z } from "zod";

export const sekolahAsalSchema = z.object({
  npsn: z
    .string()
    .refine((value) => value === "-" || value.length === 8, {
      message: "isi dengan tanda '-' jika tidak ada NPSN atau 8 karakter",
    })
    .transform((value) => (value === "-" ? null : value))
    .nullable(),
  namaSekolah: z
    .string()
    .refine((value) => value === "-" || value.length >= 3, {
      message: "isi nama sekolah dengan '-' atau minimal 3 karakter",
    })
    .transform((value) => (value === "-" ? null : value))
    .nullable(),
  alamatSekolah: z
    .string()
    .refine((value) => value === "-" || value.length >= 3, {
      message: "isi alamat dengan '-' atau minimal 3 karakter",
    })
    .transform((value) => (value === "-" ? null : value))
    .nullable(),
  tahunMasuk: z.coerce.number(), // before we can use tahunMasuk: z.string()
  tahunLulus: z.coerce.number(),
});

export type SekolahAsal = z.infer<typeof sekolahAsalSchema>;
