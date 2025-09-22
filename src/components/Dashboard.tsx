'use client'
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { CheckCircle } from "lucide-react"
import { useState } from "react"; 
import { calcularEstatisticasLivros } from "@/lib/book-stats";
import { Livro } from "@/types/livro";
import { Genre } from "@/types/genre";
import { Button } from "./ui/button";



export default function Dashboard() {
  // Mock de livros para demonstração
  const livrosMock: Livro[] = [
    {
      id: "1",
      title: "Dom Casmurro",
      author: "Machado de Assis",
      genre: [Genre.LITERATURA_BRASILEIRA],
      year: 1899,
      pages: 320,
      rating: 5,
      synopsis: "Um romance sobre ciúmes e traição.",
      cover: "https://example.com/dom-casmurro.jpg",
      isReading: false,
      isCompleted: true,
      pageCount: 320,
    },
    {
      id: "2",
      title: "1984",
      author: "George Orwell",
      genre: [Genre.FICCAO_CIENTIFICA],
      year: 1949,
      pages: 328,
      rating: 4.5,
      synopsis: "Um romance distópico sobre um regime totalitário.",
      cover: "https://example.com/1984.jpg",
      isReading: true,
      isCompleted: false,
      pageCount: 150,
    },
    {
      id: "3",
      title: "O Senhor dos Anéis",
      author: "J.R.R. Tolkien",
      genre: [Genre.FANTASIA],
      year: 1954,
      pages: 1216,
      rating: 5,
      synopsis: "Uma épica jornada pela Terra Média.",
      cover: "https://example.com/senhor-dos-aneis.jpg",
      isReading: false,
      isCompleted: false,
      pageCount: 0,
    },
  ];
  const [userBooks, setUserBooks] = useState<Livro[]>(livrosMock);
  const stats = calcularEstatisticasLivros(userBooks);

  const adicionarLivro = () => {
    const novoLivro: Livro = {
      id: Date.now().toString(), 
      title: "O Guia do Mochileiro das Galáxias",
      author: "Douglas Adams",
      genre: [Genre.FICCAO_CIENTIFICA],
      year: 1979,
      pages: 192,
      rating: 4,
      synopsis: "Uma comédia de ficção científica intergaláctica.",
      cover: "https://example.com/mochileiro-das-galaxias.jpg",
      isReading: true,
      isCompleted: false,
      pageCount: 0,
    };

    setUserBooks(prevBooks => [...prevBooks, novoLivro]);
  };

  

  return (
    <div className="space-y-6">
      <div>
        <p>Acompanhe sua jornada de leitura!</p>
      </div>
      <Button onClick={adicionarLivro}>Adicionar Novo Livro</Button> 
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
            <p className="text-xs text-muted-foreground">+2 no último mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex text-sm font-medium">
              Lendo Atualmente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{stats.lendoAtualmente}</div>
            <p className="text-xs text-muted-foreground">Continue assim</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Quero Ler!</CardTitle>
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
            <CardTitle className="text-sm font-medium">Páginas Lidas</CardTitle>
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
