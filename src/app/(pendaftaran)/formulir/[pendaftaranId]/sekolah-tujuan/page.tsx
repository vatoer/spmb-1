import BreadcrumbMobile from "@/modules/pendaftaran/ui/components/formulir/breadcrumb/breadcrumb-mobile";

export default async function FormulirSekolahTujuanPage({
  params,
}: {
  params: Promise<{ pendaftaranId: string }>;
}) {
  // Mengambil ID pendaftaran dari parameter
  const { pendaftaranId } = await params;
  return (
    <div className="w-full flex flex-col justify-start items-start p-2 md:p-6">
      <BreadcrumbMobile pendaftaranId={pendaftaranId} title="Data Orang Tua" />
      <div>formulir Sekolah Tujuan</div>
    </div>
  );
}
