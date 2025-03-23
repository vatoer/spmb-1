import BannerUtama from "@/modules/beranda/ui/components/banner/banner-utama";
import Faq from "@/modules/beranda/ui/components/faq";
import JalurPendaftaran from "@/modules/beranda/ui/components/jalur-pendaftaran";
import InfografisTahapPendaftaran from "@/modules/beranda/ui/components/tahapan/infografis-tahap-pendaftaran";

export default function Beranda() {
  return (
    <div className="flex flex-col items-center justify-start h-full min-h-screen">
      <BannerUtama />
      <InfografisTahapPendaftaran />
      <JalurPendaftaran />
      <Faq />
    </div>
  );
}
