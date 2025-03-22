"use client";
import { SidebarMain } from "@/components/navigation/sidebar/sidebar-main";
import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";

interface SidebarCompoundProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarCompound = ({ children, className }: SidebarCompoundProps) => {
  return (
    <Sidebar collapsible={"icon"} className={className}>
      <SidebarContent>{children}</SidebarContent>
    </Sidebar>
  );
};

export const SidebarMobile = () => {
  const { isMobile } = useSidebar();

  if (!isMobile) {
    return null;
  }

  return (
    <SidebarCompound className="pt-[4rem] md:hidden">
      <SidebarMain />
    </SidebarCompound>
  );
};

export default SidebarCompound;
