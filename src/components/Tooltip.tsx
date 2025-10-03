"use client";

import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider, 
} from "@/components/ui/tooltip";

interface WithTooltipProps {
  label: string;
  children: ReactNode; 
  side?: "top" | "right" | "bottom" | "left"; 
}
// Componente que envolve um botão com um tooltip
export function WithTooltip({
  label,
  children,
  side = "top",
}: WithTooltipProps) {


  return (
    <TooltipProvider>
      <Tooltip>
        {/* O children (seu botão) é o Trigger */}
        <TooltipTrigger asChild>{children}</TooltipTrigger>

        {/* O conteúdo que aparecerá no hover */}
        <TooltipContent
          side={side} // Usa a propriedade 'side' (padrão 'top')
          className="bg-zinc-900 text-white px-3 py-1 text-sm rounded-md shadow-lg"
        >
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
