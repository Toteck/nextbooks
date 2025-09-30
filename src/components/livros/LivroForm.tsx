"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { RatingStars } from "../RatingStars"
import Image from "next/image"
import { Textarea } from "../ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup } from "../ui/select"
import { SelectItem, SelectLabel } from "@radix-ui/react-select"
import { StatusLeitura } from "@/types/livro"
import { DefaultButton } from "./DefaultButton"
import { Link } from "lucide-react"

export function LivroForm() {

  const form = useForm({
    defaultValues: {
      cover: "",
      title: "",
      author: "",
      status: StatusLeitura.LENDO,
      capa: "",
      year: "",
      rating: 0,
      pages: 0,
      currentPage: 0,
      notes: "",
      isbn: "",
      synopsis: "", // Talvez gerar a sinopse do livro com IA
    }
  })

  const status = form.watch("status")

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <div className="flex flex-row gap-2 w-full">

          {/* Capa */}
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">Capa do Livro</FormLabel>
                <FormControl>
                  <div className="w-[90px] sm:w-[120px] md:w-[150px] aspect-[2/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 relative">
                    <Image alt="Capa padrão" src={"/covers/placeholder.png"} width={125}
                      height={188} sizes="(max-width: 640px) 90px, (max-width: 768px) 120px, 150px" className="w-full h-full object-cover" />
                  </div>

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                <Select {...field}>
                  <SelectTrigger className="w-full border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md">
                    <SelectValue placeholder={"Status"} />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectGroup >
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value={StatusLeitura.QUERO_LER}>Quero Ler</SelectItem>
                      <SelectItem value={StatusLeitura.LENDO}>Lendo</SelectItem>
                      <SelectItem value={StatusLeitura.LIDO}>Lido</SelectItem>
                      <SelectItem value={StatusLeitura.PAUSADO}>Pausado</SelectItem>
                      <SelectItem value={StatusLeitura.ABANDONADO}>Abondonado</SelectItem>
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

        <DefaultButton label="Adicionar Livro" />

      </form>
    </Form>
  )

}