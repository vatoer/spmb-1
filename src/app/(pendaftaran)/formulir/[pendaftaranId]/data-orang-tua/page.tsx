import {
  getPendaftaran,
  isPendaftaranWithCalonMurid,
  mapDbToZodDataOrangTua,
} from "@/data/pendaftaran/pendaftaran";
import { auth } from "@/modules/auth/auth";
import BreadcrumbMobile from "@/modules/pendaftaran/ui/components/formulir/breadcrumb/breadcrumb-mobile";
import DataOrangTuaForm from "@/modules/pendaftaran/ui/components/formulir/data-orang-tua";
import { redirect } from "next/navigation";

export default async function FormulirDataOrangTuaPage({
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

  if (!isPendaftaranWithCalonMurid(pendaftaran)) {
    return redirect("/formulir");
  }

  const dataOrangTua = mapDbToZodDataOrangTua(
    pendaftaran.calonMurid?.ayah,
    pendaftaran.calonMurid?.ibu
  );

  const { calonMurid } = pendaftaran;

  return (
    <div className="w-full flex flex-col justify-start items-start p-2 md:p-6">
      <BreadcrumbMobile pendaftaranId={pendaftaranId} title="Data Orang Tua" />
      <DataOrangTuaForm
        pendaftaranId={pendaftaranId}
        defaultValuesDataOrangTua={dataOrangTua}
      />
    </div>
  );
}
