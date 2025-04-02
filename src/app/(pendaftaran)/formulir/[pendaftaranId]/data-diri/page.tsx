import DataDiriForm from "@/modules/pendaftaran/ui/components/formulir/data-diri";

export default async function FormulirDataDiriPage({
  params,
}: {
  params: Promise<{ pendaftaranId: string }>;
}) {
  // Mengambil ID pendaftaran dari parameter
  const { pendaftaranId } = await params;
  return (
    <div className="w-full flex justify-center items-center p-2 md:p-6">
      <div className="w-full max-w-3xl p-4 shadow-md border border-gray-300 bg-white rounded-lg">
        <DataDiriForm />
      </div>
    </div>
  );
}
