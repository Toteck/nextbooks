// Página Inicial (Dashboard)
// Mostrar estatísticas(quantos livros, status de leitura, páginas lidas).
"use client"
import { AddBookDialog } from "@/components/AddBookDialog";

import TabsComponent from "@/components/Tabs";

export default function Home() {
  return (
    <div className="flex flex-col items-center sm:px-8 py-2 w-full">

      <main className="flex w-full flex-1 flex-col items-center justify-center gap-6">

        <TabsComponent />
      </main>
    </div>
  );
}
