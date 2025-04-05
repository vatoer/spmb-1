import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface SideLinkProps {
  href: string;
  title: string;
  isActive?: boolean;
}
const SideLink = ({ href, title, isActive }: SideLinkProps) => {
  console.log("isActive", href, isActive);
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row items-center justify-start w-full",
        "border border-gray-200 rounded-lg shadow-sm md:shadow-none md:border-none md:rounded-l-none p-4 md:p-0 cursor-pointer",
        isActive
          ? "bg-blue-300 rounded-r-lg text-gray-900 dark:bg-gray-800 dark:text-white"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
      )}
    >
      <span className="w-full px-4">{title}</span>
      <ChevronRight className="sm:hidden mx-auto text-gray-400" />
    </Link>
  );
};

export default SideLink;
