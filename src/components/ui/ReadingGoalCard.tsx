"use client";

import React, { useState } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useReadingGoalStats, ReadingGoalStats } from "@/hooks/useReadingGoalStats";
import { Target, Pencil, Check, X } from "lucide-react";

interface ReadingGoalCardProps {
  data?: ReadingGoalStats;
  className?: string;
  compact?: boolean;
}

export function ReadingGoalCard({
  data,
  className,
  compact = false,
}: ReadingGoalCardProps) {
  const [annualGoal, setAnnualGoal] = useState(20);
  const [isEditing, setIsEditing] = useState(false);
  const [newGoal, setNewGoal] = useState(annualGoal);

  const statsFromHook = useReadingGoalStats({ annualGoal });
  const { year, booksRead } = data || statsFromHook;

  const handleSave = () => {
    if (newGoal > 0) {
      setAnnualGoal(Number(newGoal));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewGoal(annualGoal);
    setIsEditing(false);
  };

  const safeAnnualGoal = annualGoal > 0 ? annualGoal : 1;
  const progressPercentage = Math.min(
    100,
    Math.round((booksRead / safeAnnualGoal) * 100)
  );
  const remainingBooks = Math.max(0, annualGoal - booksRead);
  const isGoalReached = remainingBooks === 0 && booksRead >= annualGoal;

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Card
        className={cn(
          "w-full",
          { "border-none shadow-none p-0 py-1": compact },
          { "flex flex-col gap-2 rounded-xl border py-1 shadow-sm": !compact }
        )}
      >
        <CardHeader className={cn("p-0 px-2 py-1", { "p-0": compact })}>
          <CardTitle className="flex items-center gap-2 text-xl font-bold text-purple-700">
            <Target className="h-6 w-6" />
            <span>{year} Meta de Leitura</span>
          </CardTitle>
        </CardHeader>

        <CardContent
          className={cn("space-y-1 p-0 px-4", compact ? "p-0 pt-0" : "")}
        >
          <div className="flex flex-col gap-0.5">
            <p
              className={cn(
                "font-extrabold text-zinc-900",
                compact ? "text-2xl" : "text-4xl"
              )}
            >
              {booksRead}
              {isEditing ? (
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={cn(
                      "text-gray-500 font-medium",
                      compact ? "text-base" : "text-xl"
                    )}
                  >
                    de
                  </span>
                  <Input
                    type="number"
                    label=""
                    value={newGoal}
                    onChange={(e) => setNewGoal(Number(e.target.value))}
                    className="h-10 w-24 text-xl"
                    autoFocus
                  />
                  <Button
                    onClick={handleSave}
                    size="icon"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleCancel} size="icon" variant="ghost">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <span
                  className={cn(
                    "text-gray-500 font-medium",
                    compact ? "text-base" : "text-xl"
                  )}
                >
                  {" "}
                  de {annualGoal} livros
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="icon"
                    variant="ghost"
                    className="ml-2 h-6 w-6"
                  >
                    <Pencil className="h-4 w-4 text-gray-500" />
                  </Button>
                </span>
              )}
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
            <p className="font-semibold text-purple-700">
              {progressPercentage}%
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
