"use server";
import { dbSpmb } from "@/lib/db-spmb";
import { ActionResponse } from "@/types/response";
import { Rapor } from "@/zod/schemas/rapor/rapor";

export async function simpanRapor(
  calonMuridId: string,
  rapor: Rapor
): Promise<ActionResponse<boolean>> {
  console.log("simpan rapor", JSON.stringify(rapor.semesters, null, 2));

  // saving to database

  const nilaiRapor = rapor.semesters.map((semester) => {
    const { nilai, semester: periodeSemester } = semester;
    const nilaiMapel = nilai.map((mapel) => ({
      mataPelajaranId: mapel.mataPelajaran,
      nilai: mapel.nilai,
      semester: periodeSemester,
      calonMuridId: calonMuridId,
    }));
    return nilaiMapel;
  });

  const nilaiRaporFlat = nilaiRapor.flat();
  // Delete existing records matching the specified fields
  for (const nilai of nilaiRaporFlat) {
    await dbSpmb.nilai.deleteMany({
      where: {
        mataPelajaranId: nilai.mataPelajaranId,
        calonMuridId: nilai.calonMuridId,
        semester: nilai.semester,
      },
    });
  }

  const insertedNilaiRapor = await dbSpmb.nilai.createMany({
    data: nilaiRaporFlat,
    skipDuplicates: true, // Avoids errors on duplicate primary keys
  });

  console.log("insertedNilaiRapor", insertedNilaiRapor);

  console.log("simpan rapor", Date.now().toString(), calonMuridId);
  return {
    success: true,
    data: true,
    message: "Rapor berhasil disimpan",
  };
}
