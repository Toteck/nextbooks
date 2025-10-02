"use client";
import Dashboard from "./Dashboard/Dashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { LivroCard } from "./livros/LivroCard";
import { livrosMock } from "./livros/LivrosMock";
import { Livro, StatusLeitura } from "@/types/livro";
import { useState } from "react";
import { calcularEstatisticasLivros } from "@/lib/book-stats";
import BibliotecaPage from "@/app/livros/biblioteca/page";
import {
  LayoutDashboard,
  BookOpen,
  Clock,
  CheckCircle,
  LibraryBig,
} from "lucide-react";

// Componente de Tabs

export default function TabsComponent() {
  const [userBooks] = useState<Livro[]>(livrosMock);
  const [activeTab, setActiveTab] = useState("dashboard");
  const stats = calcularEstatisticasLivros(userBooks);

  const livrosSendoLidos = userBooks.filter((book) => book.status === StatusLeitura.LENDO || book.status === StatusLeitura.PAUSADO);
  const livrosLidos = userBooks.filter((book) => book.status === StatusLeitura.LIDO);
  const livrosQueroLer = userBooks.filter(
    (book) => book.status === StatusLeitura.QUERO_LER
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex flex-col gap-6 w-full max-w-7xl"
    >
      <TabsList
        className="bg-purple-800 rounded-md w-full p-1.5 
           flex overflow-x-auto whitespace-nowrap gap-6 
            md:flex md:justify-between md:p-3 md:gap-0 
            h-auto min-h-fit"
      >
        <TabsTrigger
          value="dashboard"
          className="rounded-md flex items-center justify-center gap-2 mr-2"
        >
          <LayoutDashboard className="text-white !w-6 !h-6" />
          <span className="text-white hidden sm:block">Dashboard</span>
        </TabsTrigger>
        <TabsTrigger
          value="lendo"
          className="rounded-md flex items-center justify-center gap-2 mr-2"
        >
          <BookOpen className="text-white !w-6 !h-6" />
          <span className="text-white hidden sm:block">Lendo Agora</span>
        </TabsTrigger>
        <TabsTrigger
          value="concluido"
          className="rounded-md flex items-center justify-center gap-2 mr-2"
        >
          <CheckCircle className=" text-white !w-6 !h-6" />
          <span className="text-white hidden sm:block">Concluídos</span>
        </TabsTrigger>
        <TabsTrigger
          value="quero"
          className="rounded-md flex items-center justify-center gap-2 mr-2"
        >
          <Clock className=" text-white !w-6 !h-6" />
          <span className="text-white hidden sm:block">Quero Ler!</span>
        </TabsTrigger>
        <TabsTrigger
          value="biblioteca"
          className="rounded-md flex items-center justify-center gap-2"
        >
          <LibraryBig className="text-white !w-6 !h-6" />
          <span className="text-white hidden sm:block">Biblioteca</span>
        </TabsTrigger>
      </TabsList>

      {/* Conteúdo das Abas */}
      <TabsContent value="dashboard">
        <Dashboard
          stats={stats}
          livrosLendo={livrosSendoLidos}
          livrosCompletos={livrosLidos}
        />
      </TabsContent>

      <TabsContent value="lendo">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <h2 className="text-lg font-semibold">Lendo Atualmente</h2>
          {livrosSendoLidos.length > 0 ? (
            livrosSendoLidos.map((book) => (
              <LivroCard key={book.id} livro={book} />
            ))
          ) : (
            <p className="text-center text-neutral-400 col-span-full py-10">
              Você não está lendo nenhum livro no momento.
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="concluido">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <h2 className="text-lg font-semibold">Lidos</h2>
          {livrosLidos.length > 0 ? (
            livrosLidos.map((book) => <LivroCard key={book.id} livro={book} />)
          ) : (
            <p className="text-center text-neutral-400 col-span-full py-10">
              Você não leu nenhum livro ainda.
            </p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="quero">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <h2 className="text-lg font-semibold">Quero Ler</h2>
          {livrosQueroLer.length > 0 ? (
            livrosQueroLer.map((book) => (
              <LivroCard key={book.id} livro={book} />
            ))
          ) : (
            <p className="text-center text-neutral-400 col-span-full py-10">
              Sua lista de desejos está vazia.
            </p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="biblioteca">
        <BibliotecaPage />
      </TabsContent>
    </Tabs>
  );
}
