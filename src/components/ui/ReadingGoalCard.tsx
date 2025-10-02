"use client";

import * as React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  useReadingGoalStats,
  ReadingGoalStats,
} from "@/hooks/useReadingGoalStats";

interface ReadingGoalData {
  year: number;
  booksRead: number;
  annualGoal: number;
}

const defaultGoalData: ReadingGoalData = {
  year: new Date().getFullYear(), // Ano Atual
  booksRead: 12, // Total lido até agora
  annualGoal: 20, // Meta definida
};

interface ReadingGoalCardProps {
  data?: ReadingGoalStats | ReadingGoalData;
  className?: string;
  compact?: boolean;
}

export function ReadingGoalCard({
  data = defaultGoalData,
  className,
}: ReadingGoalCardProps) {
  const stats = useReadingGoalStats();
  const { year, booksRead, annualGoal } = data;
  const safeAnnualGoal = annualGoal > 0 ? annualGoal : 1;
  const progressPercentage = Math.min(
    100,
    Math.round((booksRead / safeAnnualGoal) * 100)
  );

  const remainingBooks = Math.max(0, annualGoal - booksRead);
  const isGoalReached = remainingBooks === 0 && booksRead >= annualGoal;

  return (
    <Card className={cn("max-w-md w-full", className)}>
      <CardHeader>
        {/* Título da Meta */}
        <CardTitle className="text-xl font-bold text-purple-700">
          {year} Meta de Leitura
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <div className="flex flex-col gap-1">
          <p className="text-4xl font-extrabold text-gray-900">
            {booksRead}
            <span className="text-gray-500 text-xl font-medium">
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

          {/* Percentual */}
          <p className="font-semibold text-purple-700">{progressPercentage}%</p>
        </div>
      </CardContent>
    </Card>
  );
}
