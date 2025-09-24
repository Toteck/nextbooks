// Página Inicial (Dashboard)
// Mostrar estatísticas(quantos livros, status de leitura, páginas lidas).

import TabsComponent from "@/components/Tabs";

// Essa tela é simples, uma visão geral, não detalha livros.
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-6">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <TabsComponent />
      </main>
    </div>
  );
}