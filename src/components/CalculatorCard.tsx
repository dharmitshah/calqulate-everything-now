
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  popular?: boolean;
}

export const CalculatorCard = ({
  title,
  description,
  icon,
  path,
  popular = false
}: CalculatorCardProps) => {
  return (
    <Card className={`h-full flex flex-col hover-card ${popular ? 'border-primary/30 dark:border-primary/40' : ''}`}>
      <CardHeader className="pb-2">
        <div className="mb-3 h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary dark:text-primary">
          <div className="text-2xl">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl font-heading">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {popular && (
          <Badge variant="default" className="bg-accent hover:bg-accent/80">Popular</Badge>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90">
          <Link to={path}>
            Open Calculator
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
