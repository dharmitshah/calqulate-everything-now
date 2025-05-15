
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
    <Card className={`h-full transition-all duration-300 hover:shadow-md flex flex-col ${popular ? 'border-blue-200 dark:border-blue-800' : ''}`}>
      <CardHeader className="pb-2">
        <div className="mb-2 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {popular && (
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-500 text-primary-foreground hover:bg-primary/80 mb-2">
            Popular
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={path}>
            Open Calculator
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
