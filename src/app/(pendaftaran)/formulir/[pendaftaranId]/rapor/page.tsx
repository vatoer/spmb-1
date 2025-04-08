import { getMataPelajaranJenjangDikdasmen } from "@/data/common/mata-pelajaran";
import {
  getPendaftaran,
  isPendaftaranWithCalonMurid,
} from "@/data/pendaftaran/pendaftaran";
import { auth } from "@/modules/auth/auth";
import BreadcrumbMobile from "@/modules/pendaftaran/ui/components/formulir/breadcrumb/breadcrumb-mobile";
import RaporForm from "@/modules/pendaftaran/ui/components/formulir/rapor";
import { redirect } from "next/navigation";

export default async function FormulirRaporPage({
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

  if (!isPendaftaranWithCalonMurid(pendaftaran)) {
    return redirect("/formulir");
  }

  const { calonMurid } = pendaftaran;

  // pastikan data calonMurid ada
  if (!calonMurid) {
    return redirect(`/formulir/${pendaftaranId}/data-diri`);
  }

  const mataPelajaran = await getMataPelajaranJenjangDikdasmen(
    calonMurid.jenjangDikdasmen
  );

  return (
    <div className="w-full flex flex-col justify-start items-start p-2 md:p-6">
      <BreadcrumbMobile pendaftaranId={pendaftaranId} title="Rapor" />
      <RaporForm mataPelajaran={mataPelajaran} calonMuridId={calonMurid.id} />
    </div>
  );
}
