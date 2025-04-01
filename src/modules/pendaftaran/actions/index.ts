"use server";
import { dbSpmb } from "@/lib/db-spmb";
import { auth } from "@/modules/auth/auth";
import { ActionResponse } from "@/types/response";
import { Pendaftaran } from "@prisma-db-spmb/client";
export async function getPendaftaran() {}

export async function buatPendaftaran(): Promise<ActionResponse<Pendaftaran>> {
  // Implementasi untuk membuat pendaftaran baru

  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) {
    return {
      error: "Unauthorized",
      success: false,
      message: "User not authenticated",
    };
  }

  const newPendaftaran = await dbSpmb.pendaftaran.create({
    data: {
      userId: user.id, // Ganti dengan ID pengguna yang sesuai
      updatedAt: new Date(), // Tanggal pendaftaran diperbarui
    },
  });

  return {
    success: true,
    message: "Pendaftaran berhasil dibuat",
    data: newPendaftaran,
  };
}
