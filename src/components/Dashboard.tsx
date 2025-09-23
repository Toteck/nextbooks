'use client'
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { CheckCircle, BookOpen, Clock, FileText } from "lucide-react";

export interface DashboardProps {
  stats: {
    livrosLidos: number;
    lendoAtualmente: number;
    queroLer: number;
    paginasLidas: number;
  };
}


export default function Dashboard({ stats }: DashboardProps) {
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
          <CardContent>
            <div>{stats.livrosLidos}</div>
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
            <CardTitle className="text-sm font-medium">
              Quero Ler!
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{stats.queroLer}</div>
            <p className="text-xs text-muted-foreground">
              Sua lista de leitura
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
        <div>
          <Card></Card>
        </div>
        <div>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};
