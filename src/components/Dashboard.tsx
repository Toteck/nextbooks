"use client";
import { LivroCard } from "./livros/LivroCard";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card Livros Concluídos */}
        <Card className="text-center">
          <CardHeader className="flex flex-row items-center justify-between text-sm font-medium">
            <CardTitle>Livros Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2">
            <div className="text-3xl font-bold">{stats.livrosLidos}</div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="text-xs text-muted-foreground">
              +{stats.livrosLidos} no último mês
            </p>
          </CardFooter>
        </Card>

        {/* Card Lendo Agora */}
        <Card className="text-center">
          <CardHeader className="flex flex-row items-center justify-between text-sm font-medium">
            <CardTitle>Lendo Agora</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2">
            <div className="text-3xl font-bold">{stats.lendoAtualmente}</div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground">Continue assim</div>
          </CardFooter>
        </Card>

        {/* Card Lista de Leitura */}
        <Card className="text-center">
          <CardHeader className="flex flex-row items-center justify-between text-sm font-medium">
            <CardTitle>Lista de Leitura</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2">
            <div className="text-3xl font-bold">{stats.queroLer}</div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground">
              Sua lista de leitura
            </div>
          </CardFooter>
        </Card>

        {/* Card Páginas Lidas */}
        <Card className="text-center">
          <CardHeader className="flex flex-row items-center justify-between text-sm font-medium">
            <CardTitle>Páginas Lidas</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2">
            <div className="text-3xl font-bold">{stats.paginasLidas}</div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <div className="text-xs text-muted-foreground">
              Total de páginas lidas
            </div>
          </CardFooter>
        </Card>
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
