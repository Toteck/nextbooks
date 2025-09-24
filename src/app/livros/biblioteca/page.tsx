"use client"; // Necessário para usar hooks como useState

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LivroCard } from "@/components/livros/LivroCard";

import { livrosIniciais } from "@/data/livros";
import { GENEROS_DISPONIVEIS } from "@/types/genre";

export default function BibliotecaPage() {
  const [termoBusca, setTermoBusca] = useState("");
  const [generoFiltro, setGeneroFiltro] = useState("todos"); // Filtra os livros com base na busca e no gênero selecionado

  const livrosFiltrados = useMemo(() => {
    return livrosIniciais
      .filter((livro) => {
        // Filtro por gênero ajustado para ser mais robusto
        const generoFiltroNormalizado = generoFiltro
          .toLowerCase()
          .replace(/\s/g, "");
        const generosLivroNormalizados = Array.isArray(livro.genre)
          ? livro.genre.map((g) => g.toLowerCase().replace(/\s/g, ""))
          : [livro.genre?.toLowerCase().replace(/\s/g, "")];

        return (
          generoFiltroNormalizado === "todos" ||
          generosLivroNormalizados.includes(generoFiltroNormalizado)
        );
      })
      .filter((livro) => {
        // Sistema de busca por título ou autor
        const termo = termoBusca.toLowerCase();
        return (
          livro.title.toLowerCase().includes(termo) ||
          livro.author.toLowerCase().includes(termo)
        );
      });
  }, [termoBusca, generoFiltro]);

  return (
    <div className="container mx-auto">
      {" "}
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Minha Biblioteca</h1>       {" "}
        <p className="text-muted-foreground">
          Catalogue, organize e acompanhe seus livros.
        </p>
        {" "}
      </header>
      {/* Controles de Busca e Filtro */}     {" "}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {" "}
        <Input
          type="text"
          placeholder="Buscar por título ou autor..."
          className="flex-grow"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />
        {" "}
        <Select value={generoFiltro} onValueChange={setGeneroFiltro}>
          {" "}
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filtrar por gênero" />
            {" "}
          </SelectTrigger>
          {" "}
          <SelectContent>
            <SelectItem value="todos">Todos os Gêneros</SelectItem>
            {" "}
            {GENEROS_DISPONIVEIS.map((genero) => (
              <SelectItem key={genero} value={genero}>
                {genero}             {" "}
              </SelectItem>
            ))}
            {" "}
          </SelectContent>
          {" "}
        </Select>
        {" "}
      </div>

      <div>

        {livrosFiltrados.length > 0 ? (
          livrosFiltrados.map((livro) => (
            <LivroCard key={livro.id} livro={livro} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            Nenhum livro encontrado. Tente ajustar sua busca ou
            filtros.
          </p>
        )}

      </div>

    </div>
  );
}
