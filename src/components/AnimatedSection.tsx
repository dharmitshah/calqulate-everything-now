
import { ReactNode } from "react";
import { useOnScroll } from "@/hooks/use-on-scroll";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const [ref, isVisible] = useOnScroll<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Define base styles and direction-specific translations
  const baseStyles = "transition-all duration-700 ease-out";
  const delayStyle = delay ? `delay-${delay * 100}` : "";
  
  // Apply different starting transform based on direction
  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up": return "translate-y-8 opacity-0";
        case "down": return "-translate-y-8 opacity-0";
        case "left": return "translate-x-8 opacity-0";
        case "right": return "-translate-x-8 opacity-0";
        case "none": return "opacity-0";
        default: return "opacity-0";
      }
    }
    return "translate-y-0 translate-x-0 opacity-100";
  };
  
  return (
    <div
      ref={ref}
      className={`${baseStyles} ${getTransform()} ${delayStyle} ${className}`}
    >
      {children}
    </div>
  );
}
