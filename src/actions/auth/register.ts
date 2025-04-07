"use server";

import { login } from "@/actions/auth/login";
import { getPrismaErrorResponse } from "@/actions/prisma-error-response";
import { userCreate } from "@/data/auth/user";
import { ActionResponse } from "@/types/response";
import { Register } from "@/zod/schemas/auth/register";
import { User } from "@prisma-db-auth/client";

export const register = async (
  data: Register
): Promise<ActionResponse<string> | void> => {
  // create user
  let newUser: User;
  try {
    newUser = await userCreate(data);
  } catch (error) {
    return getPrismaErrorResponse(error);
  }

  try {
    if (!newUser) {
      return {
        success: false,
        error: "ER-REG-002",
        message: "Error creating user",
      };
    }

    const loginResponse = await login(
      {
        email: data.email,
        password: data.password,
      },
      false
    );

    console.log("loginResponse", loginResponse);

    if (loginResponse?.success === false) {
      return {
        success: false,
        error: "ER-REG-003",
        message: "Error logging in user",
      };
    }
    return {
      success: true,
      data: "User created",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "ER-SIGNIN-002",
      message: "Error logging in user",
    };
  }
};
