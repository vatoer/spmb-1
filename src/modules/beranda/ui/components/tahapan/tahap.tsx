import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tahapan } from "@/modules/shared/data/tahapan";
import Link from "next/link";

interface TahapProps {
  tahap: Tahapan;
  className?: string;
  isActive?: boolean;
}

export const Tahap = ({ tahap, className, isActive }: TahapProps) => {
  const { stage, title, description, url } = tahap;
  return (
    <div className={cn("flex flex-col items-center", className && className)}>
      <div
        id={`tahap-${stage}`}
        className={`
        
        flex w-16 h-16  items-center justify-center rounded-full border-4 border-blue-500 bg-blue-100 text-blue-500 font-semibold relative -bottom-16 -mt-16`}
      >
        {stage}
      </div>
      <div className="mt-8 text-center bg-blue-100 border-blue-500 border-2 rounded-lg pt-8 p-2 w-full flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        {isActive ? (
          <Link href={url} className="mt-auto w-full">
            <Button className="mt-4 w-full hover:cursor-pointer">
              {title}
            </Button>
          </Link>
        ) : (
          <span className="mt-auto w-full">
            <Button className="mt-4 w-full" disabled>
              {title}
            </Button>
          </span>
        )}
      </div>
    </div>
  );
};
