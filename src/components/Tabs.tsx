'use client'
import Dashboard from "./Dashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
// Componente de Tabs

export default function TabsComponent() {

  return (
    <Tabs
      defaultValue="dashboard"
      className="w-full max-w-3xl flex flex-col items-center"
    >
      <TabsList className="bg-gray-200 rounded-full w-full grid-cols-5">
        <TabsTrigger 
        value="dashboard"
        className="rounded-full">
          Dashboard
          </TabsTrigger>
        <TabsTrigger value="lendo" className="rounded-full">Lendo Atualmente</TabsTrigger>
        <TabsTrigger value="concluido" className="rounded-full">Concluídos</TabsTrigger>
        <TabsTrigger value="quero" className="rounded-full">Quero Ler!</TabsTrigger>
        <TabsTrigger value="perfil" className="rounded-full">Perfil</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <Dashboard />
      </TabsContent>
      <TabsContent value="lendo">Content for Lendo Atualmente</TabsContent>
      <TabsContent value="concluido">Content for Concluídos</TabsContent>
      <TabsContent value="quero">Content for Quero Ler!</TabsContent>
      <TabsContent value="perfil">Content for Perfil</TabsContent>
    </Tabs>
  );
}