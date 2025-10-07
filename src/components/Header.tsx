"use client";
import { BookOpen, Plus } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FormBookDialog } from "./FormBookDialog";
import { useState } from "react";
import { DefaultButton } from "./DefaultButton";

export function Header() {
  const [isFormBookDialogOpen, setIsFormBookDialogOpen] = useState(false);

  return (
    <>
      <header className="border-b bg-purple-50 dark:bg-purple-800 dark:transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between p-4">
          <div className="flex items-center gap-2 text-purple-600 dark:text-white">
            <BookOpen className="h-6 w-6" />{" "}
            <span className="text-xl font-semibold">NextBooks</span>
          </div>
          <div className="flex items-center gap-4">
            {/* 💡 ThemeToggle substituindo o botão antigo */}
            <ThemeToggle />

            <DefaultButton
              icon={Plus}
              variant="primary"
              label="Adicionar Livro"
              responsive
              onClick={() => setIsFormBookDialogOpen(true)}
            />
          </div>
        </div>
      </header>
      <FormBookDialog
        isOpen={isFormBookDialogOpen}
        onClose={() => setIsFormBookDialogOpen(false)}
        isEditing
      />
    </>
  );
}