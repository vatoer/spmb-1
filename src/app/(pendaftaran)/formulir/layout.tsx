import PendaftaranLayout from "@/modules/pendaftaran/ui/layouts/pendaftaran-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <PendaftaranLayout>{children}</PendaftaranLayout>;
};

export default Layout;
