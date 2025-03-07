
import React from "react";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  isVisible?: boolean;
  direction?: "right" | "left" | "fade";
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className,
  isVisible = true,
  direction = "right",
}) => {
  const animationClasses = {
    right: {
      enter: "animate-slide-in-right",
      exit: "animate-slide-out-left",
    },
    left: {
      enter: "animate-slide-in-left",
      exit: "animate-slide-out-right",
    },
    fade: {
      enter: "animate-fade-in",
      exit: "animate-fade-out",
    },
  };

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-in-out",
        isVisible
          ? animationClasses[direction].enter
          : animationClasses[direction].exit,
        className
      )}
    >
      {children}
    </div>
  );
};

export default PageTransition;
