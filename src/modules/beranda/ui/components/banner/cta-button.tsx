"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const CtaButton = () => {
  const url = "/buat-akun-baru";

  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return <CtaButtonBuatAkun />;
  }

  if (status === "authenticated") {
    return <CtaButtonFormPendaftaran />;
  }

  return null;
};

export const CtaButtonBuatAkun = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4">
      <Link href="/buat-akun-baru" className="mt-auto w-full">
        <Button className="font-semibold h-[3rem] p-6 text-2xl md:text-3xl hover:cursor-pointer">
          Buat Akun Sekarang!
        </Button>
      </Link>
    </div>
  );
};

export const CtaButtonFormPendaftaran = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-4">
      <Link href="/formulir" className="mt-auto w-full">
        <Button className="font-semibold h-[3rem] p-6 text-2xl md:text-3xl hover:cursor-pointer">
          Formulir Pendaftaran
        </Button>
      </Link>
    </div>
  );
};

export default CtaButton;
