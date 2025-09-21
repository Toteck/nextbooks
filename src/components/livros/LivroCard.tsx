import { Livro } from "@/types/livro";

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
    <Card className="bg-gray-50 mb-4 flex flex-row transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      {/* Capa do livro */}
      <div className="w-28 flex-shrink-0">
        <AspectRatio ratio={3 / 4}>
          <Image
            src={livro.cover || "/covers/placeholder.png"}
            alt={`Capa do livro ${livro.title}`}
            fill
            className="rounded-l-md object-cover"
          />
        </AspectRatio>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-4">
        {/* Cabeçalho */}
        <CardHeader className="p-0 flex flex-row justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{livro.title}</CardTitle>
            <CardDescription className="text-sm">{livro.author}</CardDescription>
          </div>
          {livro.status && (
            <Badge className="bg-purple-600 text-white">{livro.status}</Badge>
          )}
        </CardHeader>

        {/* Avaliação */}
        <CardContent className="p-0 mt-2 flex items-center gap-2">
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
