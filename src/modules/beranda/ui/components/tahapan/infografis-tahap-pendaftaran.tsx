import { cn } from "@/lib/utils";
import { auth } from "@/modules/auth/auth";
import { tahapan } from "@/modules/shared/data/tahapan";
import { Tahap } from "./tahap";
interface InfografisTahapPendaftaranProps {
  className?: string;
}

export const InfografisTahapPendaftaran = async ({
  className,
}: InfografisTahapPendaftaranProps) => {
  const session = await auth();
  const user = session?.user;
  const isLoggedIn = !!user;

  return (
    <div
      className={cn(
        "lg:-mt-28 z-30 md:px-4 py-4 w-full items-center justify-center ",
        className && className
      )}
    >
      <h1 className="sm:hidden text-3xl font-bold z-20 text-center mt-4 mb-2">
        Alur Pendaftaran
      </h1>

      <div className="w-full flex flex-col lg:flex-row flex-grow h-auto items-center justify-center lg:items-stretch  lg:justify-between pb-8 md:py-8 gap-2 px-2">
        {
          /* Tahap Pendaftaran */
          tahapan.map((tahap, index) => {
            const isActive = isLoggedIn
              ? !tahap.disableOnAuth
              : tahap.disableOnAuth;
            return (
              <Tahap
                key={index}
                tahap={tahap}
                className="w-full"
                isActive={isActive}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default InfografisTahapPendaftaran;
