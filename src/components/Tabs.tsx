'use client'
import Dashboard from "./Dashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { LivroCard } from "./livros/LivroCard";
import { livrosMock } from "./livros/LivrosMock";
import { Livro } from "@/types/livro";
import { useState } from "react";
import { calcularEstatisticasLivros } from "@/lib/book-stats";
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
      className="grid gap-4 w-full max-w-7xl"
    >
      <TabsList className="bg-gray-200 rounded-full w-full grid-cols-5">
        <TabsTrigger value="dashboard" className="rounded-full">
          Dashboard
        </TabsTrigger>
        <TabsTrigger value="lendo" className="rounded-full">
          Lendo Agora
        </TabsTrigger>
        <TabsTrigger value="concluido" className="rounded-full">
          Concluídos
        </TabsTrigger>
        <TabsTrigger value="quero" className="rounded-full">
          Quero Ler!
        </TabsTrigger>
        <TabsTrigger value="perfil" className="rounded-full">
          Perfil
        </TabsTrigger>
      </TabsList>
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
            <p className="text-center text-neutral-400 col-span-full">
              Você não está lendo nenhum livro no momento.
            </p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="concluido">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {livrosLidos.length > 0 ? (
            livrosLidos.map((book) => (
              <LivroCard key={book.id} livro={book} />
            ))
          ) : (
            <p className="text-center text-neutral-400 col-span-full">
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
            <p className="text-center text-neutral-400 col-span-full">
              Você ainda não adicionou nenhum livro à sua lista de desejos.
            </p>
          )}
        </div>
      </TabsContent>
      <TabsContent value="perfil">Content for Perfil</TabsContent>
    </Tabs>
  );
}