import { Livro, StatusLeitura } from "@/types/livro";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Image from "next/image";

import { Calendar, MoreVertical, Pen, Pencil, PenSquare, Star, Trash, Trash2, X } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
import { RatingStars } from "../RatingStars";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { LivroForm } from "./LivroForm";

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

export function LivroCard({
  livro,
  onEditar,
  onExcluir,
  onVisualizar,
}: LivroCardProps) {
  return (

    <Card className="group p-0 gap-x-0 bg-gray-50 flex flex-row transition-transform duration-200 hover:scale-105 hover:shadow-lg max-w-md w-full">
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

            <h6 className="truncate text-[16px] text-gray-800 font-bold group-hover:text-purple-500 transition-colors duration-200">
              {livro.title}
            </h6>

            <p className="text-muted-foreground text-[12px]">
              {livro.author}
            </p>
          </div>
        </CardHeader>

        {/* Avaliação */}
        <CardContent className="flex flex-col gap-1">
          {!livro.rating && (
            <span className="text-sm text-muted-foreground">
              Sem avaliações
            </span>
          )}

          <div className="flex flex-row items-center gap-1">
            {livro.rating && (
              <>
                <span className="text-sm">{livro.rating}</span>
                <RatingStars
                  value={livro.rating || 1}
                  key={livro.id}
                  onChange={() => { }}
                />
              </>
            )}
          </div>
        </CardContent>

        {/* Rodapé */}
        <CardFooter className=" flex flex-row items-end justify-between gap-1">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="w-3 h-3 text-muted-foreground" />
              Publicado em: {livro.year || "N/D"}
            </span>

            {livro.genre && (
              <Badge key={livro.id} variant={"outline"}>
                {livro.genre[0]}
              </Badge>
            )}
          </div>
          <div className="flex flex-row items-center gap-2">

            <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"} size={"sm"} className="shadow-sm border-purple-600">
                  <Pencil className="text-purple-600" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-purple-700 font-bold">Editar Livro</DialogTitle>
                  <DialogDescription>
                    Edite-os manualmente o livro que você deseja.
                  </DialogDescription>
                </DialogHeader>

                <LivroForm
                  livro={livro}
                  onSubmit={(values) => {
                    console.log("Atualizando livro:", values);
                    // chamada API PUT/PATCH
                  }}
                  onCancel={() => console.log("Cancelou edição")}
                />
              </DialogContent>
            </Dialog>
            <Button variant={"outline"} size={"sm"} className="">
              <Trash2 />
            </Button>
          </div>

          {/* Status do livro */}

          {/* {livro.status && (
              <Badge className={`${statusConfig[livro.status]?.className} justify-self-end`}>
                {statusConfig[livro.status]?.label}
              </Badge>
            )} */}
        </CardFooter>
      </div>
    </Card>

  );
}
