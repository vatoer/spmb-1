"use server";
import { auth } from "@/modules/auth/auth";
import { ActionResponse } from "@/types/response";
import { OrangTua } from "@/zod/schemas/orang-tua/orang-tua";

export async function simpanDataOrangTua(
  orangTua: OrangTua,
  pendaftaranId: string
): Promise<ActionResponse<OrangTua>> {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return {
      error: "Unauthorized",
      success: false,
      message: "User not authenticated",
    };
  }

  try {
    console.log("simpanDataOrangTua", orangTua, pendaftaranId);
    return {
      success: true,
      message: "Data orang tua berhasil disimpan",
      data: orangTua,
    };
  } catch (error) {
    return {
      error: "unknown",
      success: false,
      message: "Unknown error",
    };
  }
}
