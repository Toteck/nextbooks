// src/components/livros/LivroCard.tsx

import { Livro, StatusLeitura } from "@/types/livro";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
<<<<<<< HEAD

import { Calendar, MoreVertical, Pen, Pencil, PenSquare, Star, Trash, Trash2, X } from "lucide-react";
import Link from "next/link";
=======
import { Calendar, MoreVertical, Star, CheckCircle } from "lucide-react";
>>>>>>> main
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";
<<<<<<< HEAD
import { RatingStars } from "../RatingStars";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { LivroForm } from "./LivroForm";
=======
import { useState } from "react"; // 💡 Importação de useState
import { LivroDetalhesDialog } from "../LivroDetalhesDialog"; // 💡 Novo import
>>>>>>> main

interface LivroCardProps {
  livro: Livro;
  onEditar?: () => void;
  onExcluir?: () => void;
  onVisualizar?: () => void;
  className?: string;
}

// Configuração para os status do livro (Mantida)
const statusConfig = {
  [StatusLeitura.LIDO]: {
    label: "Concluído",
    className: "bg-purple-600 text-white border-purple-600",
  },
  [StatusLeitura.LENDO]: {
    label: "Lendo",
    className: "bg-purple-400 text-zinc-900 border-purple-400",
  },
  [StatusLeitura.PAUSADO]: {
    label: "Pausado",
    className: "bg-zinc-500 text-white border-zinc-500",
  },
  [StatusLeitura.QUERO_LER]: {
    label: "Quero Ler",
    className: "bg-zinc-700 text-white border-zinc-700",
  },
  [StatusLeitura.ABANDONADO]: {
    label: "Abandonado",
    className: "bg-zinc-900 text-zinc-400 border-zinc-900",
  },
};

// Estrelas de avaliação (Mantido)
const RatingStars = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
        }`}
      />
    ))}
  </div>
);

export function LivroCard({
  livro,
  onEditar,
  onExcluir,
}: LivroCardProps) {
  // ESTADO PARA O DIALOG
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isLido = livro.status === StatusLeitura.LIDO;

  // LÓGICA DE CLIQUE PARA ABRIR O DIALOG
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Evita abrir o dialog se o clique for no botão do menu
    const target = e.target as HTMLElement; 
    if (target.closest("button")) {
      return;
    }
    setIsDialogOpen(true);
  };

  const cardBaseClasses =
    "group p-0 gap-x-0 flex flex-row transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl max-w-md w-full relative";

  const cardCompletedStyle = isLido
    ? "bg-purple-50"
    : "bg-gray-50 border border-gray-200";

  return (
<<<<<<< HEAD

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

=======
    <>
      {/* 💡 Substituímos o <Link> pela <div> com onClick */}
      <div onClick={handleCardClick} className="cursor-pointer w-full">
        <Card className={`${cardBaseClasses} ${cardCompletedStyle}`}>
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
            <CardHeader className="flex flex-row gap-1 justify-between pb-1">
              <div className="flex-1 min-w-0">
                <h6 className="truncate text-[16px] text-gray-800 font-bold group-hover:text-purple-500 transition-colors duration-200">
                  {livro.title}
                </h6>
                <p className="text-muted-foreground text-[12px]">
                  {livro.author}
                </p>
              </div>

              {/* Menu de ações */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-1 rounded-full hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation(); // ⬅️ IMPEDE O MODAL DE ABRIR
                      e.preventDefault();
                    }}
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={onEditar}>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={onExcluir}>
                    Excluir
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
                    Visualizar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            {/* Avaliação */}
            <CardContent className="flex flex-col gap-1 py-1">
              {livro.rating ? (
                <div className="flex flex-row items-center gap-1">
                  <span className="text-sm">{livro.rating}</span>
                  <RatingStars rating={livro.rating} key={livro.id} />
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Sem avaliação
                </span>
              )}
            </CardContent>

            {/* Rodapé */}
            <CardFooter className="flex flex-col items-start gap-1 pt-1 pr-4">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                Publicado: {livro.year || "N/D"}
              </span>

              <div className="flex flex-wrap gap-1">
                {livro.genre && (
                  <Badge key={livro.id} variant={"outline"}>
                    {livro.genre[0]}
                  </Badge>
                )}

                {livro.status && (
                  <Badge className={`${statusConfig[livro.status]?.className}`}>
                    {statusConfig[livro.status]?.label}
                  </Badge>
                )}
              </div>
            </CardFooter>
          </div>
        </Card>
      </div>

      {/* 💡 Renderiza o Dialog */}
      <LivroDetalhesDialog
        livro={livro}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
>>>>>>> main
  );
}
