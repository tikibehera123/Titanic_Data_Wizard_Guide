
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface TutorialCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  icon?: ReactNode;
}

const TutorialCard = ({ title, description, children, icon }: TutorialCardProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <CardTitle className="text-xl md:text-2xl">{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default TutorialCard;
