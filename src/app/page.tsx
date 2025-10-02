// Página Inicial (Dashboard)
// Mostrar estatísticas(quantos livros, status de leitura, páginas lidas).

import { DefaultButton } from "@/components/livros/Button";
import TabsComponent from "@/components/Tabs";
import Link from "next/link";

// Essa tela é simples, uma visão geral, não detalha livros.
export default function Home() {
  return (
    <div className="flex flex-col items-center sm:px-8 py-2 w-full">
      <main className="flex w-full flex-1 flex-col items-center justify-center gap-6">
        <Link href={"/livros/novo"}>
          <DefaultButton label="Adicionar Livro" />
        </Link>
        <TabsComponent />
      </main>
    </div>
  );
}
