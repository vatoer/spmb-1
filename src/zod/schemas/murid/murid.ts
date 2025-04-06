import { parseNomorInduk } from "@/utils/kependudukan";
import {
  agamaSchema,
  domisiliSchema,
  golonganDarahSchema,
  jenisKelaminSchema,
  jenjangDikdasmenSchema,
  kewarganegaraanSchema,
} from "@/zod/schemas/shared";
import { z } from "zod";

export const baseSchema = z.object({
  id: z.string().optional(),
  nama: z.string().min(3).max(255),
  kk: z
    .string()
    .min(16, "Nomor KK harus 16 digit")
    .max(16, "Nomor KK harus 16 digit")
    .regex(/^\d+$/, "Nomor KK hanya boleh berisi angka"),
  nik: z
    .string()
    .min(16, "NIK harus 16 digit")
    .max(16, "NIK harus 16 digit")
    .regex(/^\d+$/, "NIK hanya boleh berisi angka"),
  nisn: z
    .string()
    .min(10, "NISN harus 10 digit")
    .max(10, "NISN harus 10 digit")
    .regex(/^\d+$/, "NISN hanya boleh berisi angka"),
  kewarganegaraan: kewarganegaraanSchema,
  keteranganKewarganegaraan: z.string().min(3).max(255).optional().nullable(),
  paspor: z.string().optional().nullable(),
  tempatLahir: z.string().min(3).max(255),
  tanggalLahir: z.date(),
  jenisKelamin: jenisKelaminSchema,
  agama: agamaSchema,
  golonganDarah: golonganDarahSchema,
  jenjangDikdasmen: jenjangDikdasmenSchema,
});

const checkParentPrefix = (parent: string, child: string) => {
  if (parent === "-" || parent === "") return false;
  return child.startsWith(parent);
};
// Merging the schemas
export const dataDiriSchema = baseSchema
  .merge(domisiliSchema)
  .extend({
    nik: baseSchema.shape.nik.refine(
      (val) => parseNomorInduk(val) !== null, // ✅ Implicit return
      { message: "NIK tidak valid" }
    ),
  })
  .superRefine((data, ctx) => {
    if (!checkParentPrefix(data.provinsi, data.kotaKabupaten)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["kotaKabupaten"],
        message: "Provinsi dan Kota/Kabupaten tidak sesuai",
      });
    }

    if (!checkParentPrefix(data.kotaKabupaten, data.kecamatan)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["kecamatan"],
        message: "Kota/Kabupaten dan Kecamatan tidak sesuai",
      });
    }

    if (!checkParentPrefix(data.kecamatan, data.desaKelurahan)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["desaKelurahan"],
        message: "Kecamatan dan Desa/Kelurahan tidak sesuai",
      });
    }
  });

// export const dataDiriSchema = baseSchema
//   .merge(domisiliSchema)
//   .superRefine((data, ctx) => {
//     // set nik and kk to optional if kewarganegaraan is WNA
//     if (data.kewarganegaraan === "WNA") {
//       data.nik = undefined;
//       data.kk = undefined;
//     }

//     // Conditional validation for NIK
//     if (
//       data.kewarganegaraan === "WNI" &&
//       (!data.nik || data.nik.length !== 16)
//     ) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["nik"],
//         message: "Harap isi NIK jika WNI",
//       });
//     }

//     // Conditional validation for KK
//     if (data.kewarganegaraan === "WNI" && (!data.kk || data.kk.length !== 16)) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["kk"],
//         message: "Harap isi NIK jika WNI",
//       });
//     }

//     // Validate NIK using parseNomorInduk if it exists
//     if (data.nik && parseNomorInduk(data.nik) === null) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["nik"],
//         message: "Format NIK tidak valid",
//       });
//     }
//   });

export type DataDiri = z.infer<typeof dataDiriSchema>;
