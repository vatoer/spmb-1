import { Navbar } from "@/components/navigation/navbar/navbar";
import { SidebarMobile } from "@/components/navigation/sidebar/sidebar-compound";
import SideLinks from "@/modules/pendaftaran/ui/components/formulir/side-links";

interface PendaftaranLayoutProps {
  children: React.ReactNode;
}

export const PendaftaranLayout = async ({
  children,
}: PendaftaranLayoutProps) => {
  return (
    <div className="w-full ">
      <Navbar />
      <div className="flex min-h-screen pt-[4rem] ">
        <SidebarMobile />
        <main className="flex-1 overflow-y-auto mb-[4rem]">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <SideLinks />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PendaftaranLayout;
