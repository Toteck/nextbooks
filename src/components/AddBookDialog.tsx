"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { LivroForm } from "@/components/livros/LivroForm"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"
<<<<<<< HEAD

=======
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { WithTooltip } from "./Tooltip"
>>>>>>> main

export function AddBookDialog() {

    return (
<<<<<<< HEAD
        <Dialog>

            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-3 sm:text-sm md:text-lg font-semibold rounded-lg shadow-md hover:shadow-xl transition-all ring-2 ring-purple-300 hover:scale-105 active:scale-95 hover:cursor-pointer"><Plus className="w-6 h-6 text-white" />Adicionar Livro</Button>
=======
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <WithTooltip label="Adicionar Novo Livro" side="left">
              <Button
                className="fixed z-50 bottom-8 right-8 w-[50px] h-[50px] bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:shadow-xl transition-all ring-2 ring-purple-300 hover:scale-105 active:scale-95 hover:cursor-pointer
            md:top-2"
              >
                <Plus className="w-6 h-6 text-white" />
              </Button>
            </WithTooltip>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-purple-700 font-bold">
                Adicionar Livro
              </DialogTitle>
              <DialogDescription>
                Adicione-os manualmente o livro que você deseja.
              </DialogDescription>
            </DialogHeader>

            <LivroForm />
          </DialogContent>
        </form>
      </Dialog>
    );
}
>>>>>>> main

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-purple-700 font-bold">Adicionar Livro</DialogTitle>
                    <DialogDescription>
                        Adicione-os manualmente o livro que você deseja.
                    </DialogDescription>
                </DialogHeader>

                <LivroForm onSubmit={(values) => {
                    console.log("Criando livro:", values)
                }} />
            </DialogContent>

        </Dialog>
    )
}
