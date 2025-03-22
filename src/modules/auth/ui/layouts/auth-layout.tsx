import "@/app/styles/google.css";
import Image from "next/image";
import { Suspense } from "react";
import CardBanner from "../components/banner/card-banner";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout = async ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-row gap-4 w-full min-h-svh justify-center pt-[48px] pb-[48px] bg-background">
      <div
        id="formulir"
        className="flex flex-col items-center justify-start w-full max-w-sm h-min-[600px] border border-gray-200 p-4 md:mt-16 rounded-lg shadow-md"
      >
        <Image
          src="/globe.svg"
          alt="Logo"
          width={72}
          height={72}
          className="mx-auto rounded-full p-0  shadow-lg md:block m-4"
        />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
      <div
        id="formulir"
        className="hidden lg:block max-w-1/2 h-full mt-16 rounded-lg"
      >
        <CardBanner />
      </div>
    </div>
  );
};
