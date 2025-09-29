"use client";
import Dashboard from "./Dashboard/Dashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { LivroCard } from "./livros/LivroCard";
import { livrosMock } from "./livros/LivrosMock";
import { Livro } from "@/types/livro";
import { useState } from "react";
import { calcularEstatisticasLivros } from "@/lib/book-stats";
import Profile from "./Profile"; // Assumindo que você tem um componente Profile
import BibliotecaPage from "@/app/livros/biblioteca/page";

// Componente de Tabs

export default function TabsComponent() {
  const [userBooks] = useState<Livro[]>(livrosMock);
  const [activeTab, setActiveTab] = useState("dashboard");
  const stats = calcularEstatisticasLivros(userBooks);

  const livrosSendoLidos = userBooks.filter((book) => book.isReading);
  const livrosLidos = userBooks.filter((book) => book.isCompleted);
  const livrosQueroLer = userBooks.filter(
    (book) => !book.isReading && !book.isCompleted
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="flex flex-col gap-6 w-full max-w-7xl"
    >
      <TabsList
        className="bg-gray-200 rounded-md w-full p-1.5 
              flex flex-wrap justify-center gap-1 sm:gap-2 
              md:grid md:grid-cols-6
              h-auto min-h-fit"
      >
        <TabsTrigger
          value="dashboard"
          className="rounded-md flex-grow md:flex-none"
        >
          Dashboard
        </TabsTrigger>
        <TabsTrigger
          value="lendo"
          className="rounded-md flex-grow md:flex-none"
        >
          Lendo Agora
        </TabsTrigger>
        <TabsTrigger
          value="concluido"
          className="rounded-md flex-grow md:flex-none"
        >
          Concluídos
        </TabsTrigger>
        <TabsTrigger
          value="quero"
          className="rounded-md flex-grow md:flex-none"
        >
          Quero Ler!
        </TabsTrigger>
        <TabsTrigger
          value="perfil"
          className="rounded-md flex-grow md:flex-none"
        >
          Perfil
        </TabsTrigger>
        <TabsTrigger
          value="biblioteca"
          className="rounded-md flex-grow md:flex-none"
        >
          Biblioteca
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

      <TabsContent value="perfil">
        {/* Substitua por seu componente real de Perfil */}
        <h2 className="text-xl font-semibold mb-4">Configurações de Perfil</h2>
        {/* <Profile /> */}
        <p className="text-muted-foreground">Em construção...</p>
      </TabsContent>

      <TabsContent value="biblioteca">
        <BibliotecaPage />
      </TabsContent>
    </Tabs>
  );
}
