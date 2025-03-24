import Link from "next/link";

interface SideLinkProps {
  href: string;
  title: string;
}
const SideLink = ({ href, title }: SideLinkProps) => {
  return (
    <Link
      href={href}
      className="border border-gray-200 rounded-lg shadow-sm
          md:shadow-none md:border-none md:rounded-none p-4 md:p-0 cursor-pointer"
    >
      <span className="w-full">{title}</span>
    </Link>
  );
};

export default SideLink;
