import { cn } from "@/lib/utils";
import { LINKS } from "@/modules/pendaftaran/data/formulir-links";
import InfoCardItem from "@/modules/pendaftaran/ui/components/formulir/info-card-item";

interface InfoCardProps {
  className?: string;
  pendaftaranId: string;
}

const InfoCards = ({ className, pendaftaranId }: InfoCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-2 ",
        className
      )}
    >
      {LINKS.map((item, index) => (
        <InfoCardItem
          pendaftaranId={pendaftaranId}
          key={index}
          title={item.title}
          description={item.description}
          href={item.href}
        />
      ))}
    </div>
  );
};

export default InfoCards;
