import { Navbar } from "@/components/navigation/navbar/navbar";
import { SidebarMobile } from "@/components/navigation/sidebar/sidebar-compound";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export const DefaultLayout = async ({ children }: DefaultLayoutProps) => {
  return (
    <div className="w-full ">
      <Navbar />
      <div className="flex min-h-screen pt-[4rem]">
        <SidebarMobile />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;
