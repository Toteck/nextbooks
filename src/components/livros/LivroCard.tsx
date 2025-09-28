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


import Image from "next/image";

import { Calendar, MoreVertical, Star } from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";

interface LivroCardProps {
  livro: Livro;
  onEditar?: () => void;
  onExcluir?: () => void;
  onVisualizar?: () => void;
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

export function LivroCard({ livro, onEditar, onExcluir, onVisualizar }: LivroCardProps) {

  return (
    <Link href={`/livros/${livro.id}`}>

      <Card className="group p-0 gap-x-0 bg-gray-50 flex flex-row transition-transform duration-200 hover:scale-105 hover:shadow-lg">
        {/* Capa do livro */}
        <div className="w-24 flex-shrink-0">

          <Image
            src={livro.cover || "/covers/placeholder.png"}
            alt={`Capa do livro ${livro.title}`}
            width={128}
            height={192}
            className="object-cover rounded-l-md"
          />

        </div>

        {/* Conteúdo */}
        <div className="w-full flex flex-col pt-2">
          {/* Cabeçalho
        flex flex-row items-start md:flex-row md:justify-between md:items-start
        */}
          <CardHeader className="flex flex-row gap-1 justify-between">

            <div className="flex-1 min-w-0">
              {/* Título e Autor */}

              <h6 className="truncate text-[16px] text-gray-800 font-bold group-hover:text-purple-500 transition-colors duration-200">{livro.title}</h6>

              <p className="text-muted-foreground text-[12px]">
                {livro.author}
              </p>
            </div>

            {/* Menu de ações */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="p-1 rounded-full hover:bg-gray-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={onEditar}>Editar</DropdownMenuItem>
                <DropdownMenuItem onClick={onExcluir}>Excluir</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </CardHeader>

          {/* Avaliação */}
          <CardContent className="flex flex-col gap-1">

            {!livro.rating &&
              <span className="text-sm text-muted-foreground">Sem avaliações</span>}

            <div className="flex flex-row items-center gap-1">
              {livro.rating && <>
                <span className="text-sm">{livro.rating}</span>
                <RatingStars rating={livro.rating || 1} key={livro.id} />
              </>}
            </div>


          </CardContent>

          {/* Rodapé */}
          <CardFooter className=" flex flex-col items-start gap-1">

            <span className="flex items-center gap-1 text-sm text-muted-foreground"><Calendar className="w-3 h-3 text-muted-foreground" />Publicado em: {livro.year || "N/D"}</span>

            {livro.genre && <Badge key={livro.id} variant={"outline"}>
              {livro.genre[0]}
            </Badge>}


            {/* Status do livro */}

            {/* {livro.status && (
              <Badge className={`${statusConfig[livro.status]?.className} justify-self-end`}>
                {statusConfig[livro.status]?.label}
              </Badge>
            )} */}

          </CardFooter>
        </div>
      </Card >
    </Link >
  );
}
{/* <Star width={18} height={18} fill="oklch(79.5% 0.184 86.047)" stroke="none" /> */ }
{/* {livro.status === StatusLeitura.LIDO && (
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
        )} */}