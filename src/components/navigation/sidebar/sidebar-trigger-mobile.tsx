"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

const SidebarTriggerMobile = () => {
  const { isMobile } = useSidebar();

  if (!isMobile) {
    return null;
  }
  return <SidebarTrigger className="" />;
};

export default SidebarTriggerMobile;
