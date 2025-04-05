import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface InfoCardItemProps {
  title: string;
  description: string;
  href: string;
  pendaftaranId: string;
}

const InfoCardItem = ({
  title,
  description,
  href,
  pendaftaranId,
}: InfoCardItemProps) => {
  return (
    <Card className="w-full my-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <p>{description}</p>
        <div className="flex flex-col items-end">
          <Link
            className="text-end mt-2 w-full text-blue-500 hover:text-blue-700"
            href={`/formulir/${pendaftaranId}/${href}`}
          >
            Lihat
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCardItem;
