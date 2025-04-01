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
  if (pendaftaranList.length === 0) {
    return <TidakAdaPendaftaran />;
  }

  const router = useRouter();
  const handleRowClick = (pendaftaranId: string) => {
    router.push(`/formulir/${pendaftaranId}/data-diri`);
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center justify-start p-2">
      <table className="w-full border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-slate-500 text-white border-b">
          <tr className="p-4">
            <th className="text-center px-2">No</th>
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
              <td className="text-right px-2">{index + 1}</td>
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
