import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-zinc-100">
      <div className="w-full md:h-[calc(33vh-4rem)] py-8 px-8 md:px-8 flex flex-col md:flex-row items-start md:justify-between gap-4">
        <div className="flex flex-col  gap-2 md:items-start">
          <h1 className="text-xl font-bold z-20">Siap SPMB</h1>
          <p className="text-lg">P.T. Stargan Mitra Teknologi</p>
          <div className="flex gap-2 flex-col md:flex-row">
            <Link
              href="mailto:info@stargan.id"
              className="flex flex-row items-center gap-2"
            >
              <Mail size={24} />
              <span>info@stargan.id</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <h1 className="text-lg font-bold z-20">Terhubung dengan kami</h1>

          <div className="flex gap-2 flex-col md:flex-row">
            <Link
              href="https://www.facebook.com/siapspmb"
              className="flex flex-row items-center gap-2"
            >
              <Image
                src="/icons/facebook.svg"
                alt="Facebook"
                width={24}
                height={24}
              />
              <span>siapspmb</span>
            </Link>
            <Link
              href="https://www.instagram.com/siapspmb_id/"
              className="flex flex-row items-center gap-2"
            >
              <Image
                src="/icons/instagram.svg"
                alt="Instagram"
                width={24}
                height={24}
              />
              <span>siapspmb_id</span>
            </Link>
            <Link
              href="https://www.youtube.com/@siapspmb"
              className="flex flex-row items-center gap-2"
            >
              <Image
                src="/icons/youtube.svg"
                alt="Youtube"
                width={24}
                height={24}
              />
              <span>siapspmb</span>
            </Link>
            <Link
              href="https://twitter.com/siapspmb"
              className="flex flex-row items-center gap-2"
            >
              <Image src="/icons/x.svg" alt="Twitter" width={24} height={24} />
              <span>siapspmb</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full py-8 px-8 md:px-8 bg-zinc-800  flex flex-col items-center justify-center">
        <p className="text-center text-sm font-semibold z-20 text-zinc-100">
          &copy; 2025 Siap SPMB. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
