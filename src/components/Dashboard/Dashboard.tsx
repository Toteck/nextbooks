"use client";
import { LivroCard } from "../livros/LivroCard";
import { CheckCircle, BookOpen, Clock, FileText } from "lucide-react";
import { Livro } from "@/types/livro";
import { DashboardCard } from "./DashboardCard";

export interface DashboardProps {
  stats: {
    livrosLidos: number;
    lendoAtualmente: number;
    queroLer: number;
    paginasLidas: number;
  };
  livrosLendo: Livro[];
  livrosCompletos: Livro[];
}

export default function Dashboard({
  stats,
  livrosLendo,
  livrosCompletos,
}: DashboardProps) {
  return (
    <div className="space-y-10">
      {/* Título e descrição */}
      <div className="text-left space-y-1">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">
          Acompanhe sua jornada de leitura!
        </p>
      </div>

      {/* Grid dos Cards de Estatísticas */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 md:grid-cols-4">

        <DashboardCard title="Livros Concluídos" value={stats.livrosLidos} icon={CheckCircle} />
        <DashboardCard title="Lendo Agora" value={stats.lendoAtualmente} icon={FileText} />
        <DashboardCard title="Lista de Leitura" value={stats.queroLer} icon={BookOpen} />
        <DashboardCard title="Páginas Lidas" value={stats.paginasLidas} icon={Clock} />

      </div>

      {/* Seção de Livros (2 Colunas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Livros Lendo Atualmente (1ª Coluna) */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Lendo Atualmente</h2>
          {livrosLendo.length > 0 ? (
            livrosLendo.map((livro) => (
              <LivroCard key={livro.id} livro={livro} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum livro sendo lido.
            </p>
          )}
        </div>

        {/* Livros Concluídos (2ª Coluna) */}
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Concluídos Recentemente</h2>
          {livrosCompletos.length > 0 ? (
            livrosCompletos.map((livro) => (
              <LivroCard key={livro.id} livro={livro} />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              Nenhum livro concluído.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
