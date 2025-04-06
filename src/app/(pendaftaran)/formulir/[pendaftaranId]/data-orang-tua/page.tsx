import BreadcrumbMobile from "@/modules/pendaftaran/ui/components/formulir/breadcrumb/breadcrumb-mobile";
import DataOrangTuaForm from "@/modules/pendaftaran/ui/components/formulir/data-orang-tua";

export default async function FormulirDataOrangTuaPage({
  params,
}: {
  params: Promise<{ pendaftaranId: string }>;
}) {
  // Mengambil ID pendaftaran dari parameter
  const { pendaftaranId } = await params;
  return (
    <div className="w-full flex flex-col justify-start items-start p-2 md:p-6">
      <BreadcrumbMobile pendaftaranId={pendaftaranId} title="Data Orang Tua" />
      <DataOrangTuaForm pendaftaranId={pendaftaranId} />
    </div>
  );
}
