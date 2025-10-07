import { Livro, StatusLeitura } from "@/types/livro";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, MoreVertical, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent, // Adicionado aqui para o import não ser do Radix direto
  DropdownMenuItem,    // Adicionado aqui para o import não ser do Radix direto
} from "@/components/ui/dropdown-menu"; // Corrigido para a importação centralizada
import { useState } from "react";
import { LivroDetalhesDialog } from "../LivroDetalhesDialog";
import { FormBookDialog } from "../FormBookDialog";

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
        className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
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
  const [isDialogDetailsOpen, setIsDialogDetailsOpen] = useState(false);
  const [isFormBookDialogOpen, setIsFormBookDialogOpen] = useState(false)

  const isLido = livro.status === StatusLeitura.LIDO;

  // LÓGICA DE CLIQUE PARA ABRIR O DIALOG
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Evita abrir o dialog se o clique for no botão do menu
    const target = e.target as HTMLElement;
    // Verifica se o clique foi em qualquer elemento dentro do DropdownMenuTrigger (ou o próprio botão)
    if (target.closest("[data-radix-popper-content-wrapper]") || target.closest("button")) {
      return;
    }
    setIsDialogDetailsOpen(true);
  };

  const handleEditForm = () => {
    setIsFormBookDialogOpen(true)
  }

  const cardBaseClasses =
    "group p-0 gap-x-0 flex flex-row transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl max-w-md w-full relative";

  const cardCompletedStyle = isLido
    ? "bg-purple-50"
    : "bg-gray-50 border border-gray-200";

  return (
    <>
      <div className="cursor-pointer w-full">
        <Card onClick={handleCardClick} className={`${cardBaseClasses} ${cardCompletedStyle}`}>
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
                    className="hover:bg-gray-200 hover:cursor-pointer flex items-center justify-center text-purple-800"
                    onClick={(e) => {
                      // Impede que o clique no botão abra o dialog de detalhes
                      e.stopPropagation();
                    }}
                  >
                    <MoreVertical className="size-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleEditForm}>Editar</DropdownMenuItem>
                  <DropdownMenuItem onClick={onExcluir}>
                    Excluir
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsDialogDetailsOpen(true)}>
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
                {/* 💡 CORREÇÃO PRINCIPAL: Garante que livro.genre é um array antes de acessar [0] */}
                {Array.isArray(livro.genre) && livro.genre.length > 0 && (
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

      <FormBookDialog
        livro={livro}
        isOpen={isFormBookDialogOpen}
        onClose={() => setIsFormBookDialogOpen(false)} isEditing />

      {/* 💡 Renderiza o Dialog */}
      <LivroDetalhesDialog
        livro={livro}
        isOpen={isDialogDetailsOpen}
        onClose={() => setIsDialogDetailsOpen(false)}
      />
    </>
  );
}