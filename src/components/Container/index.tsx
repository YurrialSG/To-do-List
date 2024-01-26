import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface GridContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: GridContainerProps) {
  const defaultClass = "w-full max-w-[1200px] mx-auto px-4 sm:px-6 2xl:px-3";

  const combinedClasses = twMerge(defaultClass, className);

  return <div className={combinedClasses}>{children}</div>;
}
