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

import { WithTooltip } from "./Tooltip"
import { Livro } from "@/types/livro"

type FormBookDialogProps = {
  livro?: Livro;
  isEditing?: boolean;
  isOpen?: boolean;
  onClose: () => void;
}

export function FormBookDialog({ livro, isEditing = false, isOpen = false, onClose }: FormBookDialogProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-purple-700 font-bold">
            Adicionar Livro
          </DialogTitle>
          <DialogDescription>
            Adicione-os manualmente o livro que você deseja.
          </DialogDescription>
        </DialogHeader>

        {livro ?
          <LivroForm livro={livro} onCancel={() => console.log("Editar livros cancelado")} onSubmit={(values) => {
            console.log("Criando livro: ", values);
          }} /> :
          <LivroForm onSubmit={(values) => {
            console.log("Criando livro: ", values);
          }} />}
      </DialogContent>

    </Dialog>
  );
}

