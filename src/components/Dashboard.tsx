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
      <div>
        <p>Acompanhe sua jornada de leitura!</p>
      </div>
      {/* grid dos cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row text-sm font-medium gap-2">
              Livros Lidos
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="text-xl font-bold mb-4">{stats.livrosLidos}</div>
            <p className="text-xs text-muted-foreground">
              +2 livros no último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex text-sm font-medium">
              Lendo Atualmente
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{stats.lendoAtualmente}</div>
            <p className="text-xs text-muted-foreground">Continue assim</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex text-sm font-medium">
              Quero Ler!
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex text-xl font-bold items-center">{stats.queroLer}</div>
            <p className="text-xs text-muted-foreground">
              Sua lista de leitura
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex text-sm font-medium">
              Páginas Lidas
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{stats.paginasLidas}</div>
            <p className="text-xs text-muted-foreground">
              Total de páginas lidas
            </p>
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
