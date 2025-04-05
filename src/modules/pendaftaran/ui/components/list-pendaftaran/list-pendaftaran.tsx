"use client";
import PendaftaranBaruButton from "@/modules/pendaftaran/ui/components/formulir/pendaftaran-baru-button";
import { Pendaftaran } from "@prisma-db-spmb/client";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ListPendaftaranProps {
  // Define any props if needed
  pendaftaranList: Pendaftaran[];
}
const ListPendaftaran = ({ pendaftaranList = [] }: ListPendaftaranProps) => {
  const router = useRouter();

  if (pendaftaranList.length === 0) {
    return <TidakAdaPendaftaran />;
  }

  const handleRowClick = (pendaftaranId: string) => {
    router.push(`/formulir/${pendaftaranId}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center justify-start p-2">
      <table className="w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-500 text-white border-b">
          <tr className="p-4 border-2 border-gray-500">
            <th className="text-right pr-8 w-[80px]">No</th>
            <th className="text-left">ID</th>
            <th className="text-left">Nama</th>
            <th className="text-left">Tanggal</th>
            <th className="text-left">Status</th>
            <th className="sm:hidden"></th>
          </tr>
        </thead>
        <tbody>
          {pendaftaranList.map((pendaftaran: Pendaftaran, index: number) => (
            <tr
              key={pendaftaran.id}
              className="border-b hover:bg-gray-50 even:bg-gray-100 cursor-pointer hover:underline hover:text-blue-500 hover:p-2 h-12"
              onClick={() => handleRowClick(pendaftaran.id)}
            >
              <td className="text-right pr-8">{index + 1}</td>
              <td>{pendaftaran.id.slice(0, 8)}</td>
              <td>fulan</td>
              <td>{new Date(pendaftaran.createdAt).toLocaleDateString()}</td>
              <td>{pendaftaran.status}</td>
              <td className="sm:hidden">
                <ChevronRight className="text-gray-400" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TidakAdaPendaftaran = () => {
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
