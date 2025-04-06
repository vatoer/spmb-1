import { getPendaftaran } from "@/data/pendaftaran/pendaftaran";
import { auth } from "@/modules/auth/auth";
import BreadcrumbMobile from "@/modules/pendaftaran/ui/components/formulir/breadcrumb/breadcrumb-mobile";
import DataDiriForm from "@/modules/pendaftaran/ui/components/formulir/data-diri";
import { redirect } from "next/navigation";

export default async function FormulirDataDiriPage({
  params,
}: {
  params: Promise<{ pendaftaranId: string }>;
}) {
  // Mengambil ID pendaftaran dari parameter
  const { pendaftaranId } = await params;

  const session = await auth();
  if (!session) {
    redirect("/login?redirect=/formulir");
  }

  const pendaftaran = await getPendaftaran(session.user?.id, pendaftaranId);
  // Jika pendaftaran tidak ditemukan, redirect ke halaman formulir
  if (!pendaftaran) {
    redirect("/formulir");
  }

  return (
    <div className="w-full flex flex-col justify-start items-start p-2 md:p-6">
      <BreadcrumbMobile pendaftaranId={pendaftaranId} title="Data Diri" />
      <DataDiriForm pendaftaranId={pendaftaranId} />
    </div>
  );
}
