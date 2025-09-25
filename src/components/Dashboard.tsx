'use client'
import { LivroCard } from "./livros/LivroCard";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { CheckCircle, BookOpen, Clock, FileText } from "lucide-react";
import { Livro } from "@/types/livro";


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


export default function Dashboard({ stats, livrosLendo, livrosCompletos }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="align-left mt-4 text-muted-foreground space-y-1">
        <p>Acompanhe sua jornada de leitura!</p>
      </div>
      {/* grid dos cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row text-sm font-medium gap-2">
              Livros Lidos
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-4">{stats.livrosLidos}</div>
            <div className="text-xs text-muted-foreground">
              +2 livros no último mês
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row text-sm font-medium gap-2">
              Lendo Agora
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-4">
              {stats.lendoAtualmente}
            </div>
            <div className="text-xs text-muted-foreground">Continue assim</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex text-sm font-medium gap-2">
              Quero Ler!
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-4">{stats.queroLer}</div>
            <div className="text-xs text-muted-foreground">
              Sua lista de leitura
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex text-sm font-medium gap-2">
              Páginas Lidas
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-3xl font-bold mb-4">{stats.paginasLidas}</div>
            <div className="text-xs text-muted-foreground">
              Total de páginas lidas
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="">
        {/* Seção de livros */}
        <div className="">
          {/* Livros Lendo Atualmente */}
          <div className="">
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
          {/* Livros Concluídos */}
          <div className="">
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
    </div>
  );
};
