"use client";

import { useState } from "react";

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
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import Image from "next/image";

import { Star, Trash2, PenBoxIcon, BookOpen, Calendar } from "lucide-react";

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
        className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
      />
    ))}
  </div>
);

export function LivroCard({ livro }: LivroCardProps) {
  const progress = (((livro.qtdPagesRead || 0) / (livro.pages || 1)) * 100).toFixed(0);
  const [open, setOpen] = useState(false);
  const showProgressBar = livro.status !== undefined && [StatusLeitura.LENDO, StatusLeitura.PAUSADO, StatusLeitura.ABANDONADO].includes(livro.status);

  return (
    <Card className="group bg-gray-50 mb-4 flex flex-col md:flex-row transition-transform duration-200 hover:scale-105 hover:shadow-lg">
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
            <CardTitle className="text-lg text-gray-800 font-bold group-hover:text-purple-500 transition-colors duration-200">{livro.title}</CardTitle>
            <CardDescription className="text-sm">
              {livro.author}
            </CardDescription>
          </div>
          {livro.status && (
            <Badge className={statusConfig[livro.status]?.className}>
              {statusConfig[livro.status]?.label}
            </Badge>
          )}
        </CardHeader>

        {/* Avaliação */}
        <CardContent className="p-0 mb-2 flex flex-wrap items-center gap-1">
          {livro.rating && (
            <>
              <Star width={18} height={18} fill="oklch(79.5% 0.184 86.047)" stroke="none" />
              <span>{livro.rating}</span>
            </>
          )}
          <span className="text-sm text-gray-500">(127.543 avaliações)</span>
        </CardContent>

        {livro.status === StatusLeitura.LIDO && (
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">Sua avaliação: </span>
              <RatingStars rating={4} />
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">Concluído em 27 de nov. de 2024</span>
            </div>
          </div>
        )}

        {/* Barra de progresso */}
        {showProgressBar && (
          <div className="mb-2 w-full">
            <div className="w-full justify-between flex mb-2">

              <span className="flex items-center text-muted-foreground text-sm gap-1">
                <BookOpen className="w-4 h-4" />
                Página {livro.qtdPagesRead} de {livro.pages}
              </span>
              <span className="text-muted-foreground text-sm">
                {progress}%
              </span>
            </div>

            <div className="h-2 bg-purple-200 rounded-full">
              <Progress value={parseInt(progress)} className="[&>div]:bg-purple-600" />

            </div>
          </div>
        )}

        {/* Rodapé */}
        <CardFooter className="p-0 mb-2 flex flex-col items-start gap-4">
          <div className="flex flex-wrap gap-2">
            {livro.genre?.map((g) => (
              <Badge key={g} variant={"outline"}>
                {g}
              </Badge>
            ))}
          </div>
          <div className="w-full justify-between flex">

            <Dialog open={open} onOpenChange={setOpen} >
              <div className="flex gap-2">
                <DialogTrigger asChild >
                  <Button
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer bg-gray-50 border border-gray-200 hover:bg-gray-200"
                  >
                    Ver Detalhes
                  </Button>
                </DialogTrigger>
                {livro.status === StatusLeitura.QUERO_LER &&
                  (<Button
                    variant="secondary"
                    size="sm"
                    className="cursor-pointer text-white bg-purple-700 hover:bg-purple-600"
                  >
                    Começar a Ler
                  </Button>)}
              </div>

              <DialogContent className="w-full max-h-[90vh] overflow-y-auto rounded-2xl py-12 no-scrollbar">
                <DialogHeader className="flex flex-col md:flex-row md:items-start md: justify-between gap-4">

                  <div className="w-full md:w-48 flex-shrink-0 rounded-md">
                    <AspectRatio ratio={3 / 4} className="relative">
                      <Image
                        src={livro.cover || "/covers/placeholder.png"}
                        alt={`Capa do livro ${livro.title}`}
                        fill
                        className="object-cover rounded-md"
                      />
                    </AspectRatio>
                  </div>

                  <div className="flex-1">
                    <DialogTitle className="text-xl mb-1">
                      {livro.title}
                    </DialogTitle>
                    <p className="text-lg text-muted-foreground mb-2">{livro.author}</p>
                    {livro.status && (
                      <Badge className={statusConfig[livro.status]?.className}>
                        {statusConfig[livro.status]?.label}
                      </Badge>
                    )}
                  </div>

                </DialogHeader>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <p className="text-muted-foreground">Páginas: {livro.pages}</p>
                  <p className="text-muted-foreground">Publicado em: {livro.year !== undefined ? livro.year : "Não informado"}</p>
                </div>

                <div className="container flex-wrap">
                  <p className="text-muted-foreground mb-2">Gêneros:</p>
                  <div className="flex flex-wrap gap-2">
                    {livro.genre?.map((g) => (
                      <Badge key={g} variant={"outline"}>
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Star width={18} height={18} fill="oklch(79.5% 0.184 86.047)" stroke="none" />
                  <span className="font-bold">{livro.rating}</span>
                  <span className="text-sm text-gray-500">(127.543 avaliações)</span>
                </div>

                <div>
                  <p className="font-medium mb-2">Descrição</p>
                  <p className="text-sm text-justify text-muted-foreground leading-relaxed">{livro.synopsis}</p>
                </div>

                {livro.status === StatusLeitura.LENDO && (<div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Progresso de Leitura</p>
                    <Button variant={"ghost"} size={"sm"} className="flex items-center gap-1 cursor-pointer hover:bg-gray-200 rounded-md p-1">
                      <PenBoxIcon className="h-4 w-4" />
                      Editar
                    </Button>
                  </div>

                </div>)}

                {/* Progresso de leitura */}

                {showProgressBar && <div>
                  <div className="flex items-center justify-between text-sm mb-2">

                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      Página {livro.qtdPagesRead} de {livro.pages}
                    </span>

                    <span className="text-sm text-left text-gray-600 mt-1">
                      {progress}
                      %
                    </span>
                  </div>

                  <Progress value={parseInt(progress)} className="[&>div]:bg-purple-600" />

                </div>}

                {/* Avaliação e Resenha */}
                <div className="space-y-2">
                  <p className="font-medium">Sua avaliação e Resenha</p>
                  <p className="text-sm text-muted-foreground">Sem Avaliações ainda</p>
                  <p className="text-sm text-muted-foreground">Sem Reviews ainda</p>
                </div>

                {/* Data de inicio */}
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4 text-muted-foreground" /> Comecei em:
                  </span>
                  <span className="">4 de dezembro de 2024</span>
                </div>

              </DialogContent>

            </Dialog>


            <Button
              variant="outline"
              size="sm"
              className="hover:bg-red-500 hover:text-white cursor-pointer"
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
