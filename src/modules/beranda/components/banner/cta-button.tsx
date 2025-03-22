"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CtaButton = () => {
  const url = "/buat-akun-baru";

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4">
      <Link href={url} className="mt-auto w-full ">
        <Button className="font-semibold h-[3rem] p-6 text-2xl md:text-3xl hover:cursor-pointer">
          Buat Akun Sekarang !
        </Button>
      </Link>
    </div>
  );
};

export default CtaButton;
