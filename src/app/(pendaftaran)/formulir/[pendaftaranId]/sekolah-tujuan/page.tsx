import {
  getPendaftaran,
  isPendaftaranWithCalonMurid,
  mapDbToZodSekolahTujuan,
} from "@/data/pendaftaran/pendaftaran";
import { auth } from "@/modules/auth/auth";
import BreadcrumbMobile from "@/modules/pendaftaran/ui/components/formulir/breadcrumb/breadcrumb-mobile";
import SekolahTujuanForm from "@/modules/pendaftaran/ui/components/formulir/sekolah-tujuan";
import { redirect } from "next/navigation";

export default async function FormulirSekolahTujuanPage({
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

  const sekolahTujuan = mapDbToZodSekolahTujuan(pendaftaran);

  return (
    <div className="w-full flex flex-col justify-start items-start p-2 md:p-6">
      <BreadcrumbMobile pendaftaranId={pendaftaranId} title="Sekolah Tujuan" />
      <SekolahTujuanForm
        defaultValuesSekolahTujuan={sekolahTujuan}
        pendaftaranId={pendaftaranId}
      />
    </div>
  );
}
