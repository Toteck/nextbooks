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

import { Plus, Search } from "lucide-react"

import { livrosIniciais } from "@/data/livros";

import { GENEROS_DISPONIVEIS } from "@/types/genre";
import { StatusLeitura } from "@/types/livro";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { DefaultButton } from "@/components/livros/Button";


export default function BibliotecaPage() {
  const [termoBusca, setTermoBusca] = useState("");
  const [generoFiltro, setGeneroFiltro] = useState("todos");
  const [statusLivro, setStatusLivro] = useState("todos");

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
      })
      .filter((livro) => {
        // Sistema de busca por status do livro
        return (
          statusLivro === "todos" || livro.status?.toUpperCase() === statusLivro.toUpperCase()
        )

      })

  }, [termoBusca, generoFiltro, statusLivro]);

  return (
    <div className="container mx-auto">
      {" "}
      <header className="mb-2">
        <h1 className="text-3xl font-bold">Minha Biblioteca</h1>       {" "}
        <p className="text-muted-foreground">
          Catalogue, organize e acompanhe seus livros.
        </p>
        {" "}
      </header>
      {/* Controles de Busca e Filtro */}
      <div className="relative w-full mb-2">

        <Input
          type="text"
          placeholder="Buscar por título ou autor..."
          className="bg-white border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 flex-grow mb-4 rounded-md shadow-sm"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
        />

        <div className="flex items-center gap-2">

          {/* Filtro por gênero */}

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {" "}
            <Select value={generoFiltro} onValueChange={setGeneroFiltro}>
              {" "}
              <SelectTrigger className="w-full md:w-[200px] bg-white border rounded-md shadow-sm">
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

          {/* Filtro por status de leitura */}

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {" "}
            <Select value={statusLivro} onValueChange={setStatusLivro}>
              {" "}
              <SelectTrigger className="w-full md:w-[200px] bg-white border border-gray-300 rounded-md shadow-sm">
                <SelectValue placeholder="Filtrar por status" />
                {" "}
              </SelectTrigger>
              {" "}
              <SelectContent>
                <SelectItem value="todos">Status de Leitura</SelectItem>
                {" "}
                {Object.values(StatusLeitura).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}             {" "}
                  </SelectItem>
                ))}
                {" "}
              </SelectContent>
              {" "}
            </Select>
            {" "}
          </div>

        </div>
      </div>

      <div>

        {livrosFiltrados.length > 0 ? (
          livrosFiltrados.map((livro) => (
            <LivroCard key={livro.id} livro={livro} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-2">

            <Image src={"/empity-books-no-bg.png"} width={300} height={300} className="object-contain mx-auto max-w-[250px] md:max-w-[350px] h-auto" alt="Ilustração em estilo flat de um menino sentado no chão, encostado em uma estante de livros vazia. Ele parece triste e solitásrio, transmitindo a sensação de que não há livros disponíveis. As cores predominantes são tons de roxo e cinza." />


            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum livro encontrado 📚</h3>
            <p className="text-muted-foreground mb-4">
              Não encontramos nada com os filtros atuais.
              Que tal adicionar um novo livro à sua biblioteca?
            </p>
            <DefaultButton label="Adicionar Livros" />

          </div>

        )}

      </div>

    </div>
  );
}
