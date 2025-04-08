"use server";
import { ActionResponse } from "@/types/response";
import { Rapor } from "@/zod/schemas/rapor/rapor";

export async function simpanRapor(
  calonMuridId: string,
  rapor: Rapor
): Promise<ActionResponse<boolean>> {
  console.log("simpan rapor", calonMuridId);
  console.log("simpan rapor", JSON.stringify(rapor, null, 2));
  return {
    success: true,
    data: true,
    message: "Rapor berhasil disimpan",
  };
}
