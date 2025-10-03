// Página Inicial (Dashboard)
// Mostrar estatísticas(quantos livros, status de leitura, páginas lidas).
"use client"
import { AddBookDialog } from "@/components/AddBookDialog";
import { DialogDemo } from "@/components/DialogDemo";
import { DefaultButton } from "@/components/livros/DefaultButton";
import TabsComponent from "@/components/Tabs";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";

// Essa tela é simples, uma visão geral, não detalha livros.
export default function Home() {
  return (
    <div className="flex flex-col items-center sm:px-8 py-2 w-full">

      <main className="flex w-full flex-1 flex-col items-center justify-center gap-6">

        <AddBookDialog />

        <TabsComponent />
      </main>
    </div>
  );
}
