import { cn } from "@/lib/utils";
import { JalurPendaftaran } from "@/modules/shared/data/jalur-pendaftaran";
import Link from "next/link";

interface JalurProps {
  jalur: JalurPendaftaran;
  className?: string;
}

export const Jalur = ({ jalur, className }: JalurProps) => {
  const { title, description, url } = jalur;
  return (
    <div
      className={cn(
        "flex flex-col items-center w-full",
        className && className
      )}
    >
      <div className="mt-8 text-center bg-blue-100 border-blue-500 border-2 rounded-lg pt-8 p-2 w-full flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="mt-auto w-full pt-4">
          <Link
            href={url}
            className="mt-auto w-full text-blue-500 underline text-sm"
          >
            baca selengkapnya &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};
