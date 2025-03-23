"use client";

import { register } from "@/actions/auth/register";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Register, registerSchema } from "@/zod/schemas/auth/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import GoogleSignInButton from "../google-sign-in-button";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const router = useRouter();

  const { handleSubmit } = form;

  const onSubmit = async (data: Register) => {
    startTransition(async () => {
      const registerResponse = await register(data);
      if (registerResponse?.success) {
        console.log("User created");
        router.push("/");
      } else {
        console.log("Error creating user");
        console.log(registerResponse);
        toast.error("error", {
          description: registerResponse?.message,
          className: "bg-red-500",
          duration: 5000,
        });
      }
    });
  };

  return (
    <div className="w-full p-2 flex justify-center items-center ">
      <div className="flex flex-col items-center gap-2 mb-4 w-full">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2 w-full flex flex-col"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Konfirmasi Password"
                      {...field}
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row  sm:justify-end gap-2 pt-6">
              <Button
                className=" w-full py-6 hover:cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                <span>Buat Akun</span>
                {isPending && (
                  <Loader className="ml-2 spin-in" size={24} color="white" />
                )}
              </Button>
            </div>
            <div className="flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0 text-gray-500">
                atau
              </p>
            </div>
            <GoogleSignInButton text="Login dengan Google" />
            <div>
              <Link
                href="/login"
                className={buttonVariants({
                  variant: "link",
                  className: "gap-1 w-full text-blue-500",
                })}
              >
                {`Sudah punya Akun? login`}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;
