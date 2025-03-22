import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Beranda() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <Link href="/buat-akun-baru">
          <Button size={"lg"} className="hover:cursor-pointer">
            Buat Akun Sekarang
          </Button>
        </Link>
      </div>
    </div>
  );
}
