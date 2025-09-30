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

export function LivroForm() {

  const form = useForm({
    defaultValues: {
      cover: "",
      title: "",
      author: "",
      status: "",
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

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        {/* Capa */}
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capa do Livro</FormLabel>
              <FormControl>
                <div className="w-full max-w-[250px] aspect-[2/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
                  <Image alt="Capa padrão" src={"/covers/placeholder.png"} width={120} height={180} className="w-full h-full object-cover" />
                </div>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Campo Título */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">Título*</FormLabel>
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
            <FormItem>
              <FormLabel>Autor</FormLabel>
              <FormControl>
                <Input label="" placeholder="Digite o nome do autor do livro" {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* CAPA */}
        <FormField
          control={form.control}
          name="capa"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Capa do Livro</FormLabel>
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
              <FormLabel>Status do Livro</FormLabel>
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



        {/* Ano Pulicação */}
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano de Publicação</FormLabel>
              <FormControl>
                <Input label="" placeholder="Digite o ano de publicação do livro" {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
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
              <FormLabel>Sua avaliação</FormLabel>
              <FormControl>
                <RatingStars value={field.value} onChange={field.onChange} />
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
              <FormLabel>Total de Páginas</FormLabel>
              <FormControl>
                <Input label="" placeholder="Digite o total de páginas do livro" {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Página Atual */}
        <FormField
          control={form.control}
          name="currentPage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Página Atual</FormLabel>
              <FormControl>
                <Input label="" placeholder="Digite a quantidade de páginas lidas do livro" {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
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
              <FormLabel>Notas pessoais</FormLabel>
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
              <FormLabel>Sinopse</FormLabel>
              <FormControl>
                <Textarea placeholder="Digite a sinopse livro..." {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* International Standard Book Number - ISBN */}
        <FormField
          control={form.control}
          name="isbn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ISBN</FormLabel>
              <FormControl>
                <Input label="" placeholder="Digite o ISBN do livro..." {...field} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </form>
    </Form>
  )

}