interface BerandaLayoutProps {
  children: React.ReactNode;
}

export const BerandaLayout = async ({ children }: BerandaLayoutProps) => {
  return (
    <div className="w-full ">
      <div className="flex min-h-screen pt-[4rem]">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default BerandaLayout;
