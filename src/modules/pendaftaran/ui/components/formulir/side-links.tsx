"use client";
import { useSidebar } from "@/components/ui/sidebar";
import SideLink from "@/modules/pendaftaran/ui/components/formulir/side-link";
import { usePathname } from "next/navigation";

const SideLinks = () => {
  const isMobile = useSidebar().isMobile;

  const pathname = usePathname();
  const pathnameSplit = pathname.split("/");
  const id = pathnameSplit[2];
  console.log("id", id);
  const isFormulir = pathname.split("/").slice(0, 4).join("/") === "/formulir";
  console.log("isFormulir", isFormulir);
  const isActive = (path: string) => {
    return pathname === path;
  };

  // Hide side links if the user is on the formulir page or on mobile
  // This is to prevent the side links from showing up when the user is on the formulir page
  // or when the user is on mobile
  if (isFormulir || isMobile) {
    return null;
  }

  const links = [
    { href: `data-diri`, title: "Data Diri" },
    { href: `data-orangtua`, title: "Data Orang Tua" },
    { href: `sekolah-asal`, title: "Sekolah Asal" },
    { href: `data-rapor`, title: "Rapor" },
    { href: `sekolah-tujuan`, title: "Sekolah Tujuan" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full md:w-1/5 py-2 md:py-4">
      <h1 className="text-lg font-semibold z-20 px-4">Formulir</h1>

      <div className="flex flex-col gap-4">
        {links.map((link) => (
          <SideLink
            key={link.href}
            href={`/formulir/${id}/${link.href}`}
            title={link.title}
            isActive={isActive(`/formulir/${id}/${link.href}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default SideLinks;
