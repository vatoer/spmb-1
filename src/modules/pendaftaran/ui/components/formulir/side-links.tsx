"use client";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { LINKS } from "@/modules/pendaftaran/data/formulir-links";
import SideLink from "@/modules/pendaftaran/ui/components/formulir/side-link";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideLinks = () => {
  const isMobile = useSidebar().isMobile;
  const pathname = usePathname();
  const pathnameSplit = pathname.split("/");
  const id = pathnameSplit[2];
  const isFormulirPath =
    pathname.split("/").slice(0, 4).join("/") === "/formulir";

  const isActive = (path: string, pathname: string) => {
    const isActive = pathname === path;
    return isActive;
  };

  // Hide side links if the user is on the formulir page or on mobile
  // This is to prevent the side links from showing up when the user is on the formulir page
  // or when the user is on mobile
  if (isFormulirPath || isMobile) {
    return null;
  }

  return (
    <div className="hidden md:flex flex-col gap-4 w-full md:w-1/5 py-2 md:py-4">
      <Link href={`/formulir/`}>
        <h1 className="text-lg font-semibold z-20 px-4">Formulir</h1>
      </Link>

      <div className="flex flex-col gap-4">
        {LINKS.map((link) => (
          <SideLink
            key={link.href}
            href={`/formulir/${id}/${link.href}`}
            title={link.title}
            isActive={isActive(`/formulir/${id}/${link.href}`, pathname)}
          />
        ))}
      </div>
    </div>
  );
};

export const SideLinksMobile = () => {
  const pathname = usePathname();
  const pathnameSplit = pathname.split("/");
  const id = pathnameSplit[2];

  const isActive = (path: string, pathname: string) => {
    const isActive = pathname === path;
    return isActive;
  };
  return (
    <div className={cn("flex flex-col gap-4 w-full", "sm:hidden")}>
      {LINKS.map((link) => (
        <SideLink
          key={link.href}
          href={`/formulir/${id}/${link.href}`}
          title={link.title}
          isActive={isActive(`/formulir/${id}/${link.href}`, pathname)}
        />
      ))}
    </div>
  );
};

export default SideLinks;
