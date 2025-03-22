import DefaultLayout from "@/modules/shared/layouts/default-layout";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <DefaultLayout>{children}</DefaultLayout>;
};

export default Layout;
