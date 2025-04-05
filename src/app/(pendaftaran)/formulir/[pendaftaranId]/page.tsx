import BreadcrumbMobile from "@/modules/pendaftaran/ui/components/formulir/breadcrumb/breadcrumb-mobile";
import InfoCards from "@/modules/pendaftaran/ui/components/formulir/info-cards";
import { SideLinksMobile } from "@/modules/pendaftaran/ui/components/formulir/side-links";
import Image from "next/image";

export default async function FormulirSummaryPage({
  params,
}: {
  params: Promise<{ pendaftaranId: string }>;
}) {
  // Mengambil ID pendaftaran dari parameter
  const { pendaftaranId } = await params;
  return (
    <div className="flex flex-col gap-4 w-full items-center justify-start p-2">
      <BreadcrumbMobile pendaftaranId={pendaftaranId} />
      <div className="flex flex-col gap-2 w-full  items-start justify-start">
        <div className="relative w-full md:h-[100px] overflow-hidden">
          <Image
            src="/images/misc/fill-form.png"
            fill
            alt="Formulir"
            objectFit="contain"
            className="mx-auto p-0 md:block m-4 scale-90"
          />
        </div>

        <SideLinksMobile />

        <InfoCards
          className="hidden sm:block md:max-w-2/3"
          pendaftaranId={pendaftaranId}
        />
      </div>
    </div>
  );
}
