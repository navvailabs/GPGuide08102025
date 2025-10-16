import React from "react";
import "./shiny-button.css";
import { cn } from "@/lib/utils";

interface ShinyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ShinyButton({ children, onClick, className = "" }: ShinyButtonProps) {
  return (
    <button className={cn("shiny-cta", className)} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
}
