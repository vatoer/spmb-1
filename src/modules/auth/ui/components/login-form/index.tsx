"use client";

import { login } from "@/actions/auth/login";
import { Button, buttonVariants } from "@/components/ui/button";
import { Login, LoginSchema } from "@/zod/schemas/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../form-error";
import { GoogleSignInButton } from "../google-sign-in-button";
import InputForm from "../input-form";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: Login) => {
    startTransition(async () => {
      login(data, redirect).then((response) => {
        if (response?.success === false) {
          setError(response.error);
        }
      });
    });
  };

  return (
    <div className="w-full p-2 flex justify-center items-center ">
      <div className="flex flex-col items-center gap-2 mb-4 w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
          noValidate
        >
          <InputForm
            id="email"
            label="Email"
            type="text"
            register={register}
            error={errors.email}
            pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
          />
          <InputForm
            id="password"
            label="password"
            type="password"
            register={register}
            error={errors.password}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
          />
          <FormError message={error} />
          <Button
            className=" w-full py-6 hover:cursor-pointer"
            disabled={isPending}
            type="submit"
          >
            LOGIN
            {isPending && (
              <Loader className="ml-2 spin-in" size={24} color="white" />
            )}
          </Button>
          <div className="flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0 text-gray-500">
              atau
            </p>
          </div>
          <GoogleSignInButton text="Login dengan Google" />
          <div>
            <Link
              href="/buat-akun-baru"
              className={buttonVariants({
                variant: "link",
                className: "gap-1 w-full text-blue-500",
              })}
            >
              {`Belum punya Akun? Buat Akun`}
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
