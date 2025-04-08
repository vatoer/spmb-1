"use client";
import { Card, CardContent } from "@/components/ui/card";
import { PendaftaranWithCalonMurid } from "@/data/pendaftaran/pendaftaran";
import PendaftaranBaruButton from "@/modules/pendaftaran/ui/components/formulir/pendaftaran-baru-button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ListPendaftaranProps {
  // Define any props if needed
  pendaftaranList: PendaftaranWithCalonMurid[];
}
const ListPendaftaran = ({ pendaftaranList = [] }: ListPendaftaranProps) => {
  const router = useRouter();

  const handleRowClick = (pendaftaranId: string) => {
    router.push(`/formulir/${pendaftaranId}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center justify-start p-2">
      {/* Desktop Table View */}
      <div className="hidden sm:block w-full overflow-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-md text-sm">
          <thead className="bg-gray-500 text-white border-b">
            <tr>
              <th className="text-right pr-8 w-[80px] py-2">No</th>
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Nama</th>
              <th className="text-left py-2">Jenjang</th>
              <th className="text-left py-2">Tanggal</th>
              <th className="text-left py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendaftaranList.map((pendaftaran, index) => (
              <tr
                key={pendaftaran.id}
                className="border-b hover:bg-gray-50 even:bg-gray-100 cursor-pointer h-12"
                onClick={() => handleRowClick(pendaftaran.id)}
              >
                <td className="text-right pr-8">{index + 1}</td>
                <td>{pendaftaran.id.slice(0, 8)}</td>
                <td>
                  {pendaftaran.calonMurid?.nama || "data diri belum diisi"}
                </td>
                <td>{pendaftaran.calonMurid?.jenjangDikdasmen || "-"}</td>
                <td>{new Date(pendaftaran.createdAt).toLocaleDateString()}</td>
                <td>{pendaftaran.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden w-full flex flex-col gap-2">
        {pendaftaranList.map((pendaftaran, index) => (
          <Card
            key={pendaftaran.id}
            className="cursor-pointer hover:border-blue-400 transition-all"
            onClick={() => handleRowClick(pendaftaran.id)}
          >
            <CardContent className="flex flex-col gap-1 text-sm">
              <div className="flex justify-between font-semibold">
                <span>
                  {index + 1}.{" "}
                  {pendaftaran.calonMurid?.nama || "data diri belum diisi"}
                </span>
                <div className="flex flex-row gap-2 items-center">
                  <span>{pendaftaran.id.slice(0, 8)}</span>
                  <ChevronRight className="text-gray-400" />
                </div>
              </div>
              <div className="flex flex-row gap-2 pl-4">
                <b>Jenjang</b>
                <span>{pendaftaran.calonMurid?.jenjangDikdasmen || "-"}</span>
              </div>
              <div className="flex flex-row gap-2 pl-4">
                <b>Tanggal</b>
                <span>
                  {new Date(pendaftaran.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex flex-row gap-2 pl-4">
                <b>Status</b> <span>{pendaftaran.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <PendaftaranBaruButton />
    </div>
  );
};

export const TidakAdaPendaftaran = () => {
  return (
    <>
      <div>
        <p className="text-center text-lg font-semibold z-20 p-2">
          Kamu belum mempunyai data pendaftaran. Silakan isi formulir
          pendaftaran untuk melanjutkan proses pendaftaran
        </p>
      </div>
      <PendaftaranBaruButton />
    </>
  );
};

export default ListPendaftaran;
