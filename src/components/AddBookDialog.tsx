"use client"
import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DefaultButton } from "@/components/livros/DefaultButton"
import { LivroForm } from "@/components/livros/LivroForm"
import { Plus, Search } from "lucide-react"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { WithTooltip } from "./Tooltip"

export function AddBookDialog() {
    const [mode, setMode] = useState<"search" | "manual">("search")

    return (
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

{/* Alternador entre modos */ }
{/* <div className="flex gap-2 mb-4">
                        <Button
                            variant={"outline"}
                            onClick={() => setMode("search")}
                            className={`px-3 py-2 rounded-md text-sm font-medium ${mode === "search" ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            <Search />Procurar
                        </Button>
                        <Button
                            variant={"outline"}
                            onClick={() => setMode("manual")}
                            className={`px-3 py-2 rounded-md text-sm font-medium ${mode === "manual" ? "bg-purple-600 text-white" : ""
                                }`}
                        >
                            + Adicionar manualmente
                        </Button>
                    </div> */}

{/* Conteúdo dependendo do modo */ }
{/* {mode === "search" && (
                        <div className="flex flex-col gap-4">
                            <select className="border rounded-md px-3 py-2">
                                <option>Want to Read</option>
                                <option>Lendo</option>
                                <option>Lido</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Procure por título, autor, ou ISBN..."
                                className="border rounded-md px-3 py-2"
                            />
                            <DefaultButton label="Buscar" icon={Plus} />
                        </div>
                    )}

                    {mode === "manual" && (
                        <LivroForm />
                    )} */}