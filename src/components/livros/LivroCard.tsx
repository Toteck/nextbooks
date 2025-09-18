import { Livro, StatusLeitura } from "@/types/livro";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star } from "lucide-react";

interface LivroCardProps {
  livro: Livro;
}

// estrelas de avaliação
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

// Componente principal do Card
export function LivroCard({ livro }: LivroCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-lg">
      {/* Capa do Livro */}
      <CardHeader className="p-0 relative h-56">
        <Image
          // Utiliza a capa do livro ou uma imagem padrão como fallback
          src={livro.cover || "/covers/placeholder.png"}
          alt={`Capa do livro ${livro.title}`}
          fill
          style={{ objectFit: "cover" }}
          className="bg-muted"
        />
      </CardHeader>

      {/* Conteúdo com as informações do livro */}
      <CardContent className="p-4 flex-grow">
        {livro.status && (
          <Badge variant="secondary" className="mb-2 font-normal">
            {livro.status.replace("_", " ")}
          </Badge>
        )}
        
        {/* Título e Autor */}
        <h3 className="text-md font-bold truncate leading-tight">{livro.title}</h3>
        <p className="text-sm text-muted-foreground">{livro.author}</p>

        {/* Avaliação por Estrelas (só renderiza se existir) */}
        <div className="mt-2">
          {livro.rating && <RatingStars rating={livro.rating} />}
        </div>
      </CardContent>

      {/* Rodapé com os botões de ação */}
      <CardFooter className="p-4 pt-0">
        <div className="flex w-full gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            Ver Detalhes
          </Button>
          <Button variant="secondary" size="sm">
            Editar
          </Button>
          <Button variant="destructive" size="sm">
            Excluir
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}