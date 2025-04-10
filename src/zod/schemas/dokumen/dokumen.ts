import { fileSchema } from "@/zod/schemas/file/file";
import { z } from "zod";

export const dokumenPendaftaranWithoutFileSchema = z.object({
  kkCalonMurid: z.string().optional(),
  kkIbu: z.string().optional(),
  kkAyah: z.string().optional(),
  rapor: z.string().optional(),
  sptjm: z.string().optional(),
});

export type DokumenPendaftaranWithoutFile = z.infer<
  typeof dokumenPendaftaranWithoutFileSchema
>;
export type DokumenPendaftaranWithoutFileKey =
  keyof DokumenPendaftaranWithoutFile;

export const fileDkumenPendaftaranSchema = z.object({
  fileKkCalonMurid: fileSchema({
    required: true,
    message: "Silakan pilih file KTP calon murid",
    allowedTypes: ["application/pdf"],
  }),
  fileKkIbu: fileSchema({
    required: true,
    message: "Silakan pilih file KK Ibu",
    allowedTypes: ["application/pdf"],
  }),
  fileKkAyah: fileSchema({
    required: true,
    message: "Silakan pilih file KK Ayah",
    allowedTypes: ["application/pdf"],
  }),
  FileRapor: fileSchema({
    required: true,
    message: "Silakan pilih file rapor",
    allowedTypes: ["application/pdf"],
  }),
  FileSptjm: fileSchema({
    required: true,
    message: "Silakan pilih file SPTJM",
    allowedTypes: ["application/pdf"],
  }),
});

export type FileDokumenPendaftaran = z.infer<
  typeof fileDkumenPendaftaranSchema
>;
export type FileDokumenPendaftaranKey = keyof FileDokumenPendaftaran;

// merge schemas
export const dokumenPendaftaranSchema =
  dokumenPendaftaranWithoutFileSchema.merge(fileDkumenPendaftaranSchema);

export type DokumenPendaftaran = z.infer<typeof dokumenPendaftaranSchema>;
export type DokumenPendaftaranKey = keyof DokumenPendaftaran;
