import { SekolahWithWilayah } from "@/data/common/sekolah";
import { cn } from "@/lib/utils";

interface CardSekolahProps {
  sekolah?: SekolahWithWilayah | null;
  className?: string;
}
export const CardSekolah = ({ sekolah, className }: CardSekolahProps) => {
  if (!sekolah) return null;
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg bg-white p-4 shadow-md border",
        className
      )}
    >
      <div className="text-lg font-semibold">{sekolah.nama}</div>
      <div className="text-sm text-gray-500">{sekolah.npsn}</div>
      <div className="text-sm text-gray-500">{sekolah.alamat}</div>
      <div className="text-sm text-gray-500">
        {sekolah.wilayah?.nama} {" - "} {sekolah.wilayah?.indukKabupaten}
        {" - "} {sekolah.wilayah?.indukProvinsi}
      </div>
    </div>
  );
};

export default CardSekolah;
