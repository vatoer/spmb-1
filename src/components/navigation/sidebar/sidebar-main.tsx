import {
  BookText,
  ChevronRight,
  Home,
  Milestone,
  School,
  Settings,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { tahapan } from "@/modules/shared/data/tahapan";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Beranda",
    url: "/",
    icon: Home,
  },
  {
    title: "Panduan",
    url: "#",
    icon: BookText,
  },
  {
    title: "Daya Tampung",
    url: "#",
    icon: School,
  },
  {
    title: "Alur Pendaftaran",
    url: "#",
    icon: Milestone,
    subs: tahapan,
  },
  {
    title: "Pengaturan",
    url: "#",
    icon: Settings,
  },
];

export function SidebarMain() {
  return (
    <SidebarGroup className="md:flex">
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            {items.map((item) => {
              const hasSubMenu = Boolean(item.subs?.length);
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.title || item.url}>
                  {hasSubMenu ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          asChild
                          isActive={false} // TODO: Change this to check active route dynamically
                        >
                          <Link href="#">
                            {Icon && <Icon />}
                            <span className="text-sm">{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </Link>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="">
                        <SidebarMenuSub>
                          {item.subs?.map((sub, subIndex) => (
                            <SidebarMenuSubItem key={subIndex} className="py-1">
                              <Link href={sub.url}>
                                <span className="text-sm">{sub.title}</span>
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : (
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      isActive={false} // TODO: Change this to check active route dynamically
                    >
                      <Link href={item.url?.toString() || "#"}>
                        {Icon && <Icon />}
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              );
            })}
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
