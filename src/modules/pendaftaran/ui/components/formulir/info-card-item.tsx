import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardItemProps {
  title: string;
  description: string;
}

const InfoCardItem = ({ title, description }: InfoCardItemProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default InfoCardItem;
