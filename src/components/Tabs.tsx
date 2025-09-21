'use client'
import Dashboard from "./Dashboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useState } from "react";

// Componente de Tabs

export default function TabsComponent() {

  return (
    <Tabs defaultValue="dashboard" 
    className="w-full max-w-3xl flex flex-col items-center">
      <TabsList className="w-full max-w-md">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="lendo">Lendo Atualmente</TabsTrigger>
        <TabsTrigger value="concluido">Concluídos</TabsTrigger>
        <TabsTrigger value="quero">Quero Ler!</TabsTrigger>
        <TabsTrigger value="perfil">Perfil</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard"><Dashboard /></TabsContent>
      <TabsContent value="lendo">Content for Lendo Atualmente</TabsContent>
      <TabsContent value="concluido">Content for Concluídos</TabsContent>
      <TabsContent value="quero">Content for Quero Ler!</TabsContent>
      <TabsContent value="perfil">Content for Perfil</TabsContent>
    </Tabs>
  )
}