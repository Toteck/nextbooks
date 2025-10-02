"use client";

import * as React from "react";
import { ReadingGoalCard } from "./ReadingGoalCard";
import { cn } from "@/lib/utils";

interface ReadingGoalFooterProps {
  className?: string;
}

export function ReadingGoalFooter({ className }: ReadingGoalFooterProps) {
  return (
    <footer
      className={cn(
        "fixed inset-x-0 bottom-0 z-40",
        "bg-white shadow-[0_-4px_6px_-1px_rgb(0_0_0_/0.1)]",
        // Padding para o componente interno
        "p-4",
        // No desktop (sm:), o footer fica maior e no centro, ou você pode ocultá-lo.
        "sm:p-6",
        className
      )}
    >
      <div className="mx-auto max-w-lg">
        <ReadingGoalCard compact={true} />
      </div>
    </footer>
  );
}