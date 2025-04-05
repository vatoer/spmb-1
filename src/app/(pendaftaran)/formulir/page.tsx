import { getPendaftaran } from "@/data/pendaftaran/pendaftaran";
import { auth } from "@/modules/auth/auth";
import ListPendaftaran from "@/modules/pendaftaran/ui/components/list-pendaftaran/list-pendaftaran";
import { redirect } from "next/navigation";

const FormulirPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login?redirect=/formulir");
  }

  const pendaftaran = await getPendaftaran(session.user?.id);
  console.log("pendaftaran", pendaftaran);
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-start p-2">
      <div className="flex flex-col gap-2 w-full items-center justify-start sm:px-12">
        <h1 className="text-2xl text-center font-semibold z-20 p-2">
          Formulir Pendaftaran
        </h1>
        <ListPendaftaran pendaftaranList={pendaftaran} />
      </div>
    </div>
  );
};

export default FormulirPage;
