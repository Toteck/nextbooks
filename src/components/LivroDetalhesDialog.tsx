// src/components/livros/LivroDetalhesDialog.tsx

import { Livro } from "@/types/livro";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Calendar, BookOpen, Star } from "lucide-react";

interface LivroDetalhesDialogProps {
  livro: Livro;
  isOpen: boolean;
  onClose: () => void;
}

const RatingStar = ({ rating }: { rating: number }) => (
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

export function LivroDetalhesDialog({
  livro,
  isOpen,
  onClose,
}: LivroDetalhesDialogProps) {
  const pagesInfo =
    livro.status === "LIDO"
      ? `${livro.pages} páginas (Total)`
      : `${livro.qtdPagesRead ?? 0} de ${livro.pages ?? "N/D"} páginas lidas`;

  return (
    // 'open' e 'onOpenChange' controlam se o modal está aberto ou fechado
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        {/* Layout do Detalhe (Duas Colunas em Desktop) */}
        <div className="flex flex-col md:flex-row">
          {/* Coluna 1: Capa e Status (Fixo/Imagem) */}
          <div className="w-full md:w-1/3 flex flex-col items-center p-6 bg-gray-50 dark:bg-zinc-800">
            <Image
              src={livro.cover || "/covers/placeholder.png"}
              alt={`Capa do livro ${livro.title}`}
              width={150}
              height={225}
              className="object-cover rounded-md shadow-lg"
            />

            <h3 className="text-xl font-bold mt-4 text-center">
              {livro.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 text-center">
              {livro.author}
            </p>

            {livro.status && <Badge className="text-sm">{livro.status}</Badge>}
          </div>

          {/* Coluna 2: Detalhes e Conteúdo (Scrollable) */}
          <div className="w-full md:w-2/3 p-6 max-h-[80vh] overflow-y-auto">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl hidden md:block">
                {livro.title}
              </DialogTitle>
              <DialogDescription className="text-md hidden md:block">
                {livro.author}
              </DialogDescription>
            </DialogHeader>

            {/* Metadados */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4" />
                {livro.rating ? (
                  <RatingStar rating={livro.rating} />
                ) : (
                  "Sem Avaliação"
                )}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                {pagesInfo}
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Publicado em: {livro.year || "N/D"}
              </div>

              {livro.genre?.map((g) => (
                <Badge key={g} variant="secondary">
                  {g}
                </Badge>
              ))}
            </div>

            {/* Sinopse */}
            <h4 className="text-lg font-semibold mb-2">Sinopse</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {livro.synopsis || "Sinopse não disponível."}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
