import { getPendaftaran } from "@/data/pendaftaran/pendaftaran";
import { auth } from "@/modules/auth/auth";
import InfoCards from "@/modules/pendaftaran/ui/components/formulir/info-cards";
import ListPendaftaran from "@/modules/pendaftaran/ui/components/list-pendaftaran/list-pendaftaran";
import Image from "next/image";
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
      <div className="flex flex-col gap-2 w-full sm:w-1/2 md:h-2/3 items-center justify-center">
        <h1 className="text-2xl text-center font-semibold z-20 p-2">
          Formulir
        </h1>
        <ListPendaftaran pendaftaranList={pendaftaran} />
        <div className="relative w-full h-[20rem] md:w-[90rem] md:h-[60rem] overflow-hidden">
          <Image
            src="/images/misc/fill-form.png"
            fill
            alt="Formulir"
            objectFit="contain"
            className="mx-auto p-0 md:block m-4 scale-90"
          />
        </div>

        <InfoCards />
      </div>
    </div>
  );
};

export default FormulirPage;
