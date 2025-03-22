import { NavbarMenu } from "@/components/navigation/navbar/navbar-menu";
import SidebarTriggerMobile from "@/components/navigation/sidebar/sidebar-trigger-mobile";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b-1 border-gray-100">
      <div className="flex items-center gap-4 w-full">
        <div className="flex items-center flex-shrink-0">
          {/* Menu and Logo */}
          <SidebarTriggerMobile />
          <Link href="/">
            <div className="p-4 flex items-center gap-1">
              <Image src="/logo.png" alt="Logo" width={24} height={24} />
              {/* <span className="text-xl">🚀</span> */}
              <p className="text-xl font-semibold">Siap SPMB</p>
            </div>
          </Link>
        </div>

        {/* Search bar*/}
        <div className="flex-1 flex justify-start max-w-[900px] mx-auto">
          <NavbarMenu />
        </div>

        {/* Profile */}
        <div className="flex-shrink-0 items-center flex gap-4">
          <Link href="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
};
