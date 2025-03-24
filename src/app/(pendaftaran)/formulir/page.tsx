import PendaftaranBreadcrumbs, {
  Item,
} from "@/modules/pendaftaran/ui/components/breadcrumbs";
import SideLinks from "@/modules/pendaftaran/ui/components/formulir/side-links";
import Image from "next/image";

const breadcrumbs: Item[] = [];

const FormulirPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex flex-col gap-4 w-full md:w-1/5 px-4 py-2 md:py-4">
        <PendaftaranBreadcrumbs items={breadcrumbs} />
        <h1 className="text-lg font-semibold z-20">Formulir</h1>
        <SideLinks />
      </div>
      <div>
        <h1 className="text-2xl text-center font-semibold z-20 p-8">
          Formulir
        </h1>
        <div className="relative w-full h-[270px] md:w-[810px] md:h-[540px] overflow-hidden">
          <Image
            src="/images/misc/fill-form.png"
            fill
            alt="Formulir"
            objectFit="contain"
            className="mx-auto p-0 md:block m-4 scale-90"
          />
        </div>
      </div>
    </div>
  );
};

export default FormulirPage;
