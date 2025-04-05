"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbMobileProps {
  title?: string;
  pendaftaranId: string;
}

const BreadcrumbMobile = ({ pendaftaranId, title }: BreadcrumbMobileProps) => {
  const formattedId = `${pendaftaranId.slice(0, 8)}`;
  return (
    <div className="flex flex-col sm:hidden gap-2 items-start mb-4 w-full">
      <div className="flex flex-row gap-2 items-start justify-start w-full">
        <Link
          href={`/formulir`}
          className="
            text-blue-500 underline text-lg"
        >
          <span className="text-nowrap">Formulir</span>
        </Link>
        <div className="mt-auto">
          <ChevronRight className="text-gray-400" />
        </div>
        <Link
          href={`/formulir/${pendaftaranId}`}
          className="
            text-blue-500 underline text-lg"
        >
          <span className="text-nowrap">{formattedId}</span>
        </Link>
        {title && (
          <div className="flex flex-row gap-1 items-center w-full mt-auto">
            <ChevronRight className="text-gray-400" />
            <span className="font-semibold">{title}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadcrumbMobile;
