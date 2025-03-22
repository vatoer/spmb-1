import { dbAuth } from "@/lib/db-auth";
import { hashPassword } from "@/utils/hashing/pbkdf2";
import { Register } from "@/zod/schemas/auth/register";
import { User } from "@prisma-db-auth/client";

export const getUserByEmail = async (email: string) => {
  const user = await dbAuth.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
};

export const userCreate = async (data: Register): Promise<User> => {
  try {
    const password = await hashPassword(data.password);
    const user = await dbAuth.user.create({
      data: {
        email: data.email,
        name: data.name,
        password,
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
