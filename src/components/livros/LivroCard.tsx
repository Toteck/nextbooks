import { Livro, StatusLeitura } from "@/types/livro";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import Image from "next/image";

import { Star, Trash2 } from "lucide-react";

interface LivroCardProps {
  livro: Livro;
}

// configuração para os status do livro
const statusConfig = {
  [StatusLeitura.LIDO]: {
    label: "Concluído",
    className: "bg-purple-600 text-white border-purple-600", // #a855f7
  },
  [StatusLeitura.LENDO]: {
    label: "Lendo",
    className: "bg-purple-400 text-zinc-900 border-purple-400", // #c084fc
  },
  [StatusLeitura.PAUSADO]: {
    label: "Pausado",
    className: "bg-zinc-500 text-white border-zinc-500", // #71717a
  },
  [StatusLeitura.QUERO_LER]: {
    label: "Quero Ler",
    className: "bg-zinc-700 text-white border-zinc-700", // #3f3f46
  },
  [StatusLeitura.ABANDONADO]: {
    label: "Abandonado",
    className: "bg-zinc-900 text-zinc-400 border-zinc-900", // #18181b
  },
};

// estrelas de avaliação
const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
      />
    ))}
  </div>
);

export function LivroCard({ livro }: LivroCardProps) {
  return (
    <Card className="bg-gray-50 mb-4 flex flex-col md:flex-row transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      {/* Capa do livro */}
      <div className="w-full md:w-48 flex-shrink-0">
        <AspectRatio ratio={3 / 4} className="relative">
          <Image
            src={livro.cover || "/covers/placeholder.png"}
            alt={`Capa do livro ${livro.title}`}
            fill
            className="object-contain rounded-t-md md:rounded-l-md"
          />
        </AspectRatio>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-4">
        {/* Cabeçalho */}
        <CardHeader className="p-0 flex flex-col md:flex-row md:justify-between md:items-start">
          <div>
            <CardTitle className="text-lg font-bold">{livro.title}</CardTitle>
            <CardDescription className="text-sm">{livro.author}</CardDescription>
          </div>
          {livro.status && (
            <Badge className={statusConfig[livro.status]?.className}>
              {statusConfig[livro.status]?.label}
            </Badge>
          )}
        </CardHeader>

        {/* Avaliação */}
        <CardContent className="p-0 mt-2 flex flex-wrap items-center gap-2">
          {livro.rating && <RatingStars rating={livro.rating} />}
          <span className="text-sm text-gray-500">(127.543 avaliações)</span>
        </CardContent>

        {/* Barra de progresso */}
        <div className="mt-3 w-full">
          <div className="w-full justify-between flex">
            <span className="text-sm text-right text-gray-600 mt-1">Página {livro.qtdPagesRead} de {livro.pages}</span>
            <span className="text-sm text-left text-gray-600 mt-1">
              {(((livro.qtdPagesRead || 0) / (livro.pages || 1)) * 100).toFixed(0)}%</span>
          </div>

          <div className="h-2 bg-purple-200 rounded-full">
            <div
              className="h-2 bg-purple-600 rounded-full"
              style={{ width: `${((livro.qtdPagesRead || 0) / (livro.pages || 1)) * 100}%` }}
            />
          </div>

        </div>

        {/* Rodapé */}
        <CardFooter className="p-0 mt-4 flex flex-col items-start gap-4">
          <div className="flex gap-2">

            {livro.genre?.map((g) => (<Badge key={g} variant={"outline"}>{g}</Badge>))}

          </div>
          <div className="w-full justify-between flex">
            <Button variant="secondary" size="sm" className="cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-200">Ver Detalhes</Button>
            <Button variant="outline" size="sm" className="hover:bg-red-500 hover:text-white cursor-pointer">
              <Trash2 className="h-6 w-6" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
