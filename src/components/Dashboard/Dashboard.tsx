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
        <DashboardCard
          title="Livros Concluídos"
          value={stats.livrosLidos}
          icon={CheckCircle}
        />
        <DashboardCard
          title="Lendo Agora"
          value={stats.lendoAtualmente}
          icon={BookOpen}
        />
        <DashboardCard
          title="Lista de Leitura"
          value={stats.queroLer}
          icon={Clock}
        />
        <DashboardCard
          title="Páginas Lidas"
          value={stats.paginasLidas}
          icon={FileText}
        />
      </div>

      {/* Seção de Livros (2 Colunas) */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Livros Lendo Atualmente (1ª Coluna) */}
        <div className="items-center flex flex-col gap-4 rounded-tl-lg rounded-tr-lg p-6 border shadow-md md:rounded-tr-none md:rounded-br-none md:rounded-bl-lg">
          <div className=" text-center text-lg font-semibold p-4 text-purple-800">
            Lendo Atualmente
          </div>
          <div className="flex flex-col items-center gap-4">
            {livrosLendo.length > 0 ? (
              livrosLendo.map((livro) => (
                <div key={livro.id} className="w-full">
                  <LivroCard livro={livro} />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum livro sendo lido.
              </p>
            )}
          </div>
        </div>

        {/* Livros Concluídos (2ª Coluna) */}
        <div className="items-center flex flex-col gap-4 rounded-bl-lg rounded-br-lg shadow-md bg-gradient-to-r from-gray-600 to-purple-900 p-6 md:rounded-tr-lg md:rounded-tl-none md:rounded-bl-none">
          <div className="text-white text-center text-lg font-semibold p-4 ">
            Concluídos Recentemente
          </div>
          <div className="flex flex-col items-center gap-4">
            {livrosCompletos.length > 0 ? (
              livrosCompletos.map((livro) => (
                <div
                  key={livro.id}
                  className="w-full border border-white rounded-xl bg-white"
                >
                  <LivroCard livro={livro} />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhum livro concluído.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
