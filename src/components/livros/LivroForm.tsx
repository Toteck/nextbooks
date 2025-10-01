"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { RatingStars } from "../RatingStars"
import Image from "next/image"
import { Textarea } from "../ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup } from "../ui/select"
import { SelectItem, SelectLabel } from "@radix-ui/react-select"
import { StatusLeitura } from "@/types/livro"
import { Button } from "../ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Save, X } from "lucide-react"


const currentYear = new Date().getFullYear()

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  author: z.string().min(1, "Autor é obrigatório"),
  cover: z.url("A URL da capa deve ser válida").optional().or(z.literal("")),
  status: z.enum(StatusLeitura),
  year: z.string().optional().refine((val) => !val || (/^\d+$/.test(val) && Number(val) >= 0 && Number(val) <= currentYear), {
    error: `Ano deve ser entre 0 e ${currentYear}`
  }),
  pages: z.coerce.number().int().positive("Numero de páginas deve ser maior que 0").optional(),
  currentPage: z.coerce.number().int().min(0, "Página atual não pode ser negativa").optional(),
  isbn: z.string().optional().refine((val) => !val || /^[0-9-]+$/.test(val), {
    error: "ISBN deve conter apenas números ou traços",
  }),
  rating: z.number().min(0).max(5).optional(),
  notes: z.string().max(500, "No máximo 500 caracteres").optional(),
  synopsis: z.string().max(2000).optional()

})


export function LivroForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      cover: "",
      status: StatusLeitura.LENDO,
      year: "",
      pages: undefined,
      currentPage: undefined,
      isbn: "",
      rating: 0,
      notes: "",
      synopsis: "",
    },
  })

  const { handleSubmit } = form


  const status = form.watch("status")
  console.log(form.watch("status"))

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Valores do form:", values)
  }

  function onReset() {
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Capa */}

        <div className="w-[150px] aspect-[2/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 relative">
          <Image alt="Capa padrão" src={"/covers/placeholder.png"} width={125}
            height={188} sizes="(max-width: 640px) 90px, (max-width: 768px) 120px, 150px" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col flex-1 items-start gap-4">
          {/* Campo Título */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md text-purple-700">Título*</FormLabel>
                <FormControl>
                  <Input label="" placeholder="Digite o título do livro" {...field} className="text-md border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Autor */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-md text-purple-700">Autor*</FormLabel>
                <FormControl>
                  <Input label="" placeholder="Digite o nome do autor" {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* CAPA */}
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">URL da Capa do Livro</FormLabel>
              <FormControl>
                <Input label="" placeholder="Adicione o link da imagem da capa" {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Status do Livro */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Adicionar para</FormLabel>
              <FormControl>
                <Select
                  value={field.value || ""} // 🔑 aqui fica controlado
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 hover:border-purple-400">
                    <SelectValue placeholder="Selecione um status..." />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg shadow-lg border border-gray-200">
                    <SelectGroup className="p-2 flex flex-col">
                      <SelectLabel className="text-gray-500">Status</SelectLabel>
                      <SelectItem value="QUERO_LER" className="text-md font-semibold hover:bg-purple-50 cursor-pointer p-1 hover:border hover:border-purple-500 rounded-lg">
                        Quero Ler
                      </SelectItem>
                      <SelectItem value="LENDO" className="text-md font-semibold hover:bg-purple-50 cursor-pointer p-1 hover:border hover:border-purple-500 rounded-lg">
                        Lendo
                      </SelectItem>
                      <SelectItem value="LIDO" className="text-md font-semibold hover:bg-purple-50 cursor-pointer p-1 hover:border hover:border-purple-500 rounded-lg">
                        Lido
                      </SelectItem>
                      <SelectItem value="PAUSADO" className="text-md font-semibold hover:bg-purple-50 cursor-pointer p-1 hover:border hover:border-purple-500 rounded-lg">
                        Pausado
                      </SelectItem>
                      <SelectItem value="ABANDONADO" className="text-md font-semibold hover:bg-purple-50 cursor-pointer p-1 hover:border hover:border-purple-500 rounded-lg">
                        Abandonado
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />



        <div className="flex items-center gap-2">


          {/* Ano Pulicação */}
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Ano de Publicação</FormLabel>
                <FormControl>
                  <Input label="" placeholder="Digite o ano de publicação do livro" {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Total de páginas */}
          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Total de Páginas</FormLabel>
                <FormControl>
                  <Input label="" placeholder="Digite o total de páginas do livro" {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        </div>
        {/* Página Atual */}
        {status !== StatusLeitura.QUERO_LER && (<FormField
          control={form.control}
          name="currentPage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Página Atual</FormLabel>
              <FormControl>
                <Input label="" placeholder="Digite a quantidade de páginas lidas do livro" {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />)}


        {/* International Standard Book Number - ISBN */}
        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">ISBN</FormLabel>
              <FormControl>
                <Input label="" placeholder="Digite o ISBN do livro..." {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Avaliação */}
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Sua avaliação</FormLabel>
              <FormControl>
                <RatingStars value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Notas pessoais */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Notas pessoais</FormLabel>
              <FormControl>
                <Textarea placeholder="Digite algo que queira tomar nota sobre o livro..." {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Sinopse do Livro */}
        <FormField
          control={form.control}
          name="synopsis"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Sinopse</FormLabel>
              <FormControl>
                <Textarea placeholder="Digite a sinopse livro..." {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"outline"} onClick={handleSubmit(onSubmit)} className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white px-6 py-3 text-lgltw1 font-bold rounded-lg shadow-md hover:shadow-xl transition-all ring-2 ring-purple-300 hover:scale-105 active:scale-95 hover:cursor-pointer"><Plus />Adicionar Livro</Button>

        <Button variant={"outline"} onClick={onReset} className=" text-purple-700 px-6 py-3 sm:text-sm md:text-lg font-bold rounded-lg shadow-md hover:shadow-xl transition-all ring-2 ring-purple-300 hover:scale-105 active:scale-95 hover:cursor-pointer"><X className="text-purple-700 font-bold size-10" />Cancelar</Button>

      </form>
    </Form>
  )

}