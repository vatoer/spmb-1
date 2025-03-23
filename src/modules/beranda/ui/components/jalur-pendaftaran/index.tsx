import { JALUR_PENDAFTARAN } from "@/modules/shared/data/jalur-pendaftaran";
import { Jalur } from "./jalur";

const JalurPendaftaran = () => {
  return (
    <div className="w-full md:min-h-[calc(50vh-4rem)] py-8 md:px-8 bg-zinc-100  flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold z-20 text-center">Jalur Pendaftaran</h1>
      <div className="flex flex-col w-full lg:flex-row flex-grow h-auto items-stretch  gap-2 px-2">
        {JALUR_PENDAFTARAN.map((jalur, index) => (
          <Jalur jalur={jalur} key={index} />
        ))}
      </div>
    </div>
  );
};

export default JalurPendaftaran;
