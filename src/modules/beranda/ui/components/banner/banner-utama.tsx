import { cn } from "@/lib/utils";
import CtaButton from "@/modules/beranda/ui/components/banner/cta-button";

interface BannerUtamaProps {
  className?: string;
}

const BannerUtama = ({ className }: BannerUtamaProps) => {
  return (
    <div
      className={cn(
        "relative w-full flex flex-col items-center justify-center min-h-[15rem] md:min-h-[25rem] bg-[url('/images/hero/hero2.png')] bg-cover bg-center bg-banner-utama md:p-4 rounded-sm",
        className
      )}
    >
      <div className="w-full h-full">
        <div className="absolute inset-0 bg-amber-100 opacity-90 rounded-sm" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 bg-transparent opacity-100">
          <div className="flex flex-col items-center justify-center gap-2 md:w-2/3 lg:w-1/2 p-2 rounded-sm bg-opacity-90">
            <h1 className="text-2xl md:text-3xl font-bold">
              Sistem Penerimaan Murid Baru
            </h1>
            <h2 className="text-lg md:text-2xl font-bold">
              Tahun Ajaran 2025/2026
            </h2>
            <p className="text-base">
              Jangan lewatkan kesempatan untuk bergabung dengan sekolah impian
              Anda!
            </p>
          </div>
          <CtaButton />
        </div>
      </div>
    </div>
  );
};

export default BannerUtama;
