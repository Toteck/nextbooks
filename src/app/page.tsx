// Página Inicial (Dashboard)
// Mostrar estatísticas(quantos livros, status de leitura, páginas lidas).

import TabsComponent from "@/components/Tabs";
import { Livro } from "@/types/livro"; 
interface Stats {
  livrosLidos: number;
  lendoAtualmente: number;
  queroLer: number;
  paginasLidas: number;
}

// Função para buscar TODOS os dados necessários
async function getFullDataForTabs() {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    //  Busca de Livros Completa 
    const allBooksRes = await fetch(`${BASE_URL}/api/books`, { cache: "no-store" });
    const allBooks: Livro[] = await allBooksRes.json();
    
    //  Busca de Estatísticas 
    const statsRes = await fetch(`${BASE_URL}/api/stats`, { cache: "no-store" });
    const stats: Stats = await statsRes.json();
    
    return { allBooks, stats }; 
}

export default async function Home() {
  const { allBooks, stats } = await getFullDataForTabs();
  return (
    <div className="flex flex-col items-center sm:px-8 py-2 w-full">
      <main className="flex w-full flex-1 flex-col items-center justify-center gap-6">
        <TabsComponent initialBooks={allBooks} initialStats={stats} />
      </main>
    </div>
  );
};
