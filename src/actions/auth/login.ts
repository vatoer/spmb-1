"use server";
import * as z from "zod";

import { signIn } from "@/modules/auth/auth";
import { ActionResponse } from "@/types/response";
import { LoginSchema } from "@/zod/schemas/auth/login";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
type Login = z.infer<typeof LoginSchema>;

// const DEFAULT_ROUTE_AFTER_LOGIN = "/";

export const login = async (
  data: Login,
  redirect: boolean = true,
  redirectTo?: string
): Promise<ActionResponse<boolean | z.ZodError>> => {
  console.log(data);
  const validateFields = LoginSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      success: false,
      error: "Invalid data",
      // data: validateFields.error,
      message: "Invalid data",
    };
  }

  const { email, password } = validateFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: redirectTo,
      redirect: redirect,
    });
    if (redirectTo) {
      revalidatePath(redirectTo);
    }
    return { success: true, data: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin": {
          console.log(error);
          return { success: false, error: "Invalid credentials" };
        }
        default:
          return { success: false, error: "something went wrong" };
      }
    }
    throw error;
  }
};
