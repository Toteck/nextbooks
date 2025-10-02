"use client"

import { LivroForm } from "@/components/livros/LivroForm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NovoLivroPage() {

  const router = useRouter()

  function navigateBack() {
    router.back()
    router.refresh()
  }


  return (
    <div className="pb-4">

      <div className="flex items-center gap-4 mb-4">
        <ArrowLeft className="w-8 h-8 text-purple-600" onClick={navigateBack} />

        <h1 className="text-2xl font-bold text-center text-purple-600">
          Adicionar Novo Livro
        </h1>
      </div>



      <LivroForm />

    </div>
  )
}