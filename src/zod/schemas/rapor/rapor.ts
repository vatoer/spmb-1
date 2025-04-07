import { z } from "zod";

export enum MataPelajaran {
  PendidikanAgamaDanBudiPekerti = "Pendidikan Agama & Budi Pekerti",
  BahasaIndonesia = "Bahasa Indonesia",
  BahasaInggris = "Bahasa Inggris",
  Matematika = "Matematika",
  IPA = "IPA",
  IPS = "IPS",
}

// Define the schema for a single subject's score
export const nilaiMapelSchema = z.object({
  mataPelajaran: z.nativeEnum(MataPelajaran), //z.string(), // Subject name
  nilai: z
    .number()
    .min(0, { message: "Nilai tidak boleh kurang dari 0" })
    .max(100, { message: "Nilai tidak boleh lebih dari 100" }),
});

export type NilaiMapel = z.infer<typeof nilaiMapelSchema>;

// Define the schema for a single semester
const semesterSchema = z.object({
  semester: z
    .number()
    .min(1, { message: "Semester tidak valid" })
    .max(6, { message: "Semester tidak valid" }),
  nilai: z.array(nilaiMapelSchema), // Array of subject scores
});

export type Semester = z.infer<typeof semesterSchema>;

// Define the schema for the entire form
export const raporSchema = z.object({
  semesters: z
    .array(semesterSchema)
    .min(1, { message: "Minimal satu semester harus diisi" }),
});

export type Rapor = z.infer<typeof raporSchema>;
