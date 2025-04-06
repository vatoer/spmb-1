"use client";

import Link from "next/link";
import * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { tahapan } from "@/modules/shared/data/tahapan";
import { Menu } from "lucide-react";

export function NavbarMenu() {
  return (
    <NavigationMenu
      className="hidden md:flex items-center justify-center"
      delayDuration={0}
      skipDelayDuration={0}
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Beranda
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:cursor-pointer">
            Panduan
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Menu className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Siap SPMB
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Sistem Penerimaan Murid Baru (SPMB) adalah sistem yang
                      digunakan untuk menerima murid baru di sekolah.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/panduan/pendaftaran" title="Pendaftaran">
                Mendaftar sebagai calon murid baru.
              </ListItem>
              <ListItem href="/panduan/seleksi" title="Seleksi">
                Proses seleksi calon murid baru sesuai syarat dan ketentuan
                sekolah.
              </ListItem>
              <ListItem href="/panduan/lapor-diri" title="Lapor Diri">
                Proses lapor diri bagi calon murid yang diterima.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/daya-tampung" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Daya Tampung
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:cursor-pointer">
            Alur Pendaftaran
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {tahapan.map((tahap) => (
                <ListItem
                  key={tahap.title}
                  title={tahap.title}
                  href={tahap.url}
                >
                  {tahap.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
