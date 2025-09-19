// Página Inicial (Dashboard)
// Mostrar estatísticas(quantos livros, status de leitura, páginas lidas).

import Dashboard from "@/components/Dashboard";

// Essa tela é simples, uma visão geral, não detalha livros.
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Dashboard />
      </main>
    </div>
  );
}