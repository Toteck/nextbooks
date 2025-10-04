"use client"
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

import { LivroForm } from "@/components/livros/LivroForm"
import { Plus } from "lucide-react"
import { Button } from "./ui/button"


export function AddBookDialog() {

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-3 sm:text-sm md:text-lg font-semibold rounded-lg shadow-md hover:shadow-xl transition-all ring-2 ring-purple-300 hover:scale-105 active:scale-95 hover:cursor-pointer"><Plus className="w-6 h-6 text-white" />Adicionar Livro</Button>

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