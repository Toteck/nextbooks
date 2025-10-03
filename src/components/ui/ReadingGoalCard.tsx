// src/components/ui/ReadingGoalCard.tsx (VERSÃO CORRIGIDA)
"use client";

import * as React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useReadingGoalStats, ReadingGoalStats } from "@/hooks/useReadingGoalStats";
import { Target } from "lucide-react";
interface ReadingGoalCardProps {
  // A prop data agora é totalmente opcional
  data?: ReadingGoalStats;
  className?: string;
  compact?: boolean;
}

export function ReadingGoalCard({
  data,
  className,
  compact = false,
}: ReadingGoalCardProps) {
  
  const statsFromHook = useReadingGoalStats();
  const { year, booksRead, annualGoal } = data || statsFromHook;
  const safeAnnualGoal = annualGoal > 0 ? annualGoal : 1;
  const progressPercentage = Math.min(
    100,
    Math.round((booksRead / safeAnnualGoal) * 100)
  );
  const remainingBooks = Math.max(0, annualGoal - booksRead);
  const isGoalReached = remainingBooks === 0 && booksRead >= annualGoal;

  return (
    <Card
      className={cn(
        "w-full",
        { "border-none shadow-none p-0 py-1": compact },
        { "flex flex-col gap-6 rounded-xl border py-6 shadow-sm": !compact },
        className
      )}
    >
      <CardHeader>
        {/* 2. AJUSTAR O TÍTULO PARA INCLUIR O ÍCONE */}
        <CardTitle className="flex items-center gap-2 text-xl font-bold text-purple-700">
          <Target className="h-5 w-5" />
          <span>{year} Meta de Leitura</span>
        </CardTitle>
      </CardHeader>

      <CardContent className={cn("space-y-3", compact ? "p-0 pt-0" : "")}>
        {/* ... todo o seu JSX continua aqui, sem alterações ... */}
        <div className="flex flex-col gap-0.5">
          <p className={cn("font-extrabold text-zinc-900", compact ? "text-2xl" : "text-4xl")}>
            {booksRead}
            <span className={cn("text-gray-500 font-medium", compact ? "text-base" : "text-xl")}>
              {" "}
              de {annualGoal} livros
            </span>
          </p>
        </div>
        <Progress
          value={progressPercentage}
          className="[&>div:first-child]:bg-purple-600 [&>div:first-child]:transition-all [&>div:first-child]:duration-500"
        />
        <div className="flex justify-between items-center text-sm font-medium">
          <p className="text-gray-600">
            {isGoalReached ? (
              <span className="font-bold text-purple-700">
                Meta {year} Atingida! 🎉
              </span>
            ) : (
              <>
                Faltam{" "}
                <span className="font-bold text-purple-700">
                  {remainingBooks}
                </span>{" "}
                livros para a meta
              </>
            )}
          </p>
          <p className="font-semibold text-purple-700">{progressPercentage}%</p>
        </div>
      </CardContent>
    </Card>
  );
}