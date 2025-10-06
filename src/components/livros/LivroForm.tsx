"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectDropdown } from "../SelectDropdown"
import { RatingStars } from "../RatingStars"
import { Progress } from "../ui/progress"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { toast } from "sonner"


import { Plus, X, RefreshCcw, Save } from "lucide-react"

import { useForm } from "react-hook-form"
import Image from "next/image"
import { z } from "zod"
import { DialogClose } from "../ui/dialog"

const currentYear = new Date().getFullYear()
const dataCreated = new Date().toLocaleString();

const statusOptions = [
  { label: "Quero Ler", value: "QUERO_LER" },
  { label: "Lendo", value: "LENDO" },
  { label: "Lido", value: "LIDO" },
  { label: "Pausado", value: "PAUSADO" },
  { label: "Abondonado", value: "ABONDONADO" },
] as const

const formSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  author: z.string().min(1, "Autor é obrigatório"),
  cover: z.url("A URL da capa deve ser válida").optional().or(z.literal("")),
  status: z.enum(statusOptions.map((o) => o.value) as [string, ...string[]], "Selecione uma opção de status do livro"),
  year: z.string().optional().refine((val) => !val || (/^\d+$/.test(val) && Number(val) >= 1500 && Number(val) <= currentYear), {
    error: `Ano deve ser entre 1500 e ${currentYear}`
  }),
  pages: z.coerce.number().int().min(0, "Numero de páginas deve ser maior que 0").optional(),
  currentPage: z.coerce.number().int().min(0, "Página atual não pode ser negativa").optional(),
  isbn: z.string().min(10, "ISBN deve ter no mínimo 10 números").max(13, "ISBN deve ter no máximo 13 números").optional().refine((val) => !val || /^[0-9-]+$/.test(val), {
    error: "ISBN deve conter apenas números",
  }),
  rating: z.number().min(0).max(5).optional(),
  notes: z.string().max(500, "No máximo 500 caracteres").optional(),
  synopsis: z.string().max(2000).optional()
}).refine(
  (data) => {
    // Só valida se ambos tiverem valor
    if (data.pages && data.currentPage) {
      return data.currentPage <= data.pages;
    }
    return true; // se não tiver um dos dois, passa
  },
  {
    message: "Página atual não pode ser maior que o total de páginas",
    path: ["currentPage"], // indica onde mostrar o erro
  }
);

export type LivroFormValidation = z.infer<typeof formSchema>

type LivroFormProps = {
  livro?: Partial<LivroFormValidation>; // livro existente (para edição)
  onSubmit: (values: LivroFormValidation) => void; // callback de salvar
  onCancel?: () => void; // opcional
}

export function LivroForm({ livro, onSubmit, onCancel }: LivroFormProps) {

  const form = useForm<LivroFormValidation>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: livro?.title || "",
      author: livro?.author || "",
      cover: livro?.cover || "",
      status: livro?.status || "",
      year: livro?.year || "",
      pages: livro?.pages || 0,
      currentPage: livro?.currentPage || 0,
      isbn: livro?.isbn || "",
      rating: livro?.rating || 0,
      notes: livro?.notes || "",
      synopsis: livro?.synopsis || "",
    },
  })

  const { handleSubmit } = form

  const cover = form.watch("cover")
  const status = form.watch("status")
  const pages = form.watch("pages")

  const watchedValues = form.watch();

  const requiredFields: (keyof LivroFormValidation)[] = ["title", "author"];
  const optionalFields: (keyof LivroFormValidation)[] = status !== "QUERO_LER" ? [
    "status",
    "cover",
    "year",
    "pages",
    "currentPage",
    "isbn",
    "rating",
    "notes",
    "synopsis",
  ] : [
    "status",
    "cover",
    "year",
    "pages",
    "isbn",
    "notes",
    "synopsis",
  ];

  // Total de campos
  const totalFields = requiredFields.length + optionalFields.length

  // Quantos já foram preenchidos (checando se não estão vazios/undefined)
  const filledFields = [...requiredFields, ...optionalFields].filter((field) => {
    const value = watchedValues[field];
    if (!value) return false
    return true;
  }).length;

  // porcentagem
  const progress = Math.round((filledFields / totalFields) * 100);


  function handleFormSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values)

    // try {
    //   console.log("Valores do form", values)
    //   toast.custom((id) => (
    //     <div className="bg-purple-600 text-white p-4 rounded-lg shadow-lg">
    //       <span className="flex flex-row items-center justify-center gap-4"><Book /> Livro criado com sucesso!</span>
    //     </div>
    //   ), {
    //     description: `O livro "${values.title}" foi salvo.`,
    //     position: "top-center",
    //     duration: 5000
    //   })

    // } catch (error) {
    //   toast.custom((id) => (
    //     <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg">
    //       <span className="flex flex-row items-center justify-center gap-4"><X /> Erro ao criar livro. Tente novamente!</span>
    //     </div>
    //   ), {
    //     description: `O livro "${values.title}" foi salvo.`,
    //     position: "top-center",
    //     duration: 5000
    //   })
    // }
  }

  function handleReset() {
    form.reset()
    onCancel?.();
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">

        <div className="space-y-2">
          <p className="text-sm text-purple-700 font-bold">Progresso do preenchimento: {progress}%</p>
          <Progress value={progress} className="w-full h-3 bg-gray-200 [&>div]:bg-purple-500" />
        </div>

        {/* Capa */}

        <div className="w-50 h-80 aspect-[2/3] self-center bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300 relative">
          <Image alt="Capa padrão" src={cover ? cover : "/covers/placeholder.png"} width={125}
            height={188} sizes="(max-width: 640px) 90px, (max-width: 768px) 120px, 150px" unoptimized className="w-full h-full object-cover rounded-lg" />
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
                  <Input label="" placeholder="Digite o título do livro" {...field} value={field.value ?? ""} className="text-md border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
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
                  <Input label="" placeholder="Digite o nome do autor" {...field} value={field.value ?? ""} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
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
                <Input label="" placeholder="Adicione o link da imagem da capa" {...field} value={field.value ?? ""} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
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
              <FormLabel className="text-md">Status do Livro</FormLabel>
              <FormControl>
                <SelectDropdown
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                  placeholder="Selecione um status..."
                  items={statusOptions.map((option) => ({
                    label: option.label,
                    value: option.value,
                  }))}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 
                     text-sm text-gray-700 shadow-sm transition 
                     focus-visible:border-purple-600 focus-visible:ring-2 
                     focus-visible:ring-purple-600 hover:border-purple-400"
                  isControlled
                />
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
              <FormLabel className="text-md">Ano de Publicação</FormLabel>
              <FormControl>
                <Input type="number" min={1500} minLength={4} max={new Date().getFullYear()} maxLength={4} label="" placeholder="Digite o ano de publicação do livro" {...field} value={field.value ?? ""} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
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
                <Input label="" min={0} type="number" placeholder="Digite o total de páginas do livro" {...field} value={field.value ?? ""} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Página Atual */}
        {status !== "QUERO_LER" && (<FormField
          control={form.control}
          name="currentPage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Página Atual</FormLabel>
              <FormControl>
                <Input type="number" min={0} max={pages} label="" placeholder="Digite à página atual..." {...field} value={field.value ?? ""} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
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
                <Input label="" type="number" min={0} placeholder="Digite o ISBN do livro..." {...field} value={field.value ?? ""} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Avaliação */}

        {status !== "QUERO_LER" && <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Sua avaliação</FormLabel>
              <FormControl className="flex flex-row aling-center">
                <div className="flex flex-row items-center gap-4">
                  <RatingStars value={field.value || 0} onChange={field.onChange} />
                  <RefreshCcw
                    className="text-purple-700 size-6 hover:cursor-pointer hover:text-purple-500"
                    onClick={() => form.resetField("rating")}
                  />
                </div>

              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />}


        {/* Notas pessoais */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Notas pessoais</FormLabel>
              <FormControl>
                <Textarea placeholder="Digite algo que queira tomar nota sobre o livro..." {...field} value={field.value ?? ""} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
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
                <Textarea placeholder="Digite a sinopse livro..." {...field} value={field.value ?? ""} className="border border-gray-300 bg-white focus-visible:border-purple-600 focus-visible:ring-2 focus-visible:ring-purple-600 shadow-sm focus-visible:shadow-md transition rounded-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" variant={"outline"} className="text-white bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 px-6 py-3 font-bold rounded-lg shadow-md hover:shadow-xl transition-all ring-2 ring-purple-300 hover:scale-105 active:scale-95 hover:cursor-pointer">{livro ? (<span className="flex items-center gap-2 hover:text-white"><Plus className="size-4" />Atualizar Livro</span>) : <span className="flex items-center gap-2 hover:text-white"><Save className="size-4" />Salvar Livro</span>}</Button>

        <DialogClose asChild>
          <Button variant={"outline"} onClick={handleReset} className="px-6 py-3 sm:text-sm text-sm font-bold rounded-lg shadow-md hover:shadow-xl transition-all ring-2 ring-purple-300 hover:scale-105 active:scale-95 hover:cursor-pointer">
            <X className="font-bold size-4" />Cancelar</Button>
        </DialogClose>


      </form>
    </Form>
  )

}