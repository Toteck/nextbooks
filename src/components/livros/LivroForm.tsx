"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

// Importando seus tipos e os componentes de UI
import { Livro, StatusLeitura } from "@/types/livro";
import { Genre, GENEROS_DISPONIVEIS } from "@/types/genre";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

interface LivroFormProps {
  initialData?: Livro;
  isEditing?: boolean;
}

const formFields: (keyof Omit<Livro, "id">)[] = [
  "title",
  "author",
  "genre",
  "year",
  "pages",
  "qtdPagesRead",
  "rating",
  "synopsis",
  "cover",
  "status",
];

export default function LivroForm({
  initialData,
  isEditing = false,
}: LivroFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Livro, "id">>(
    initialData || {
      title: "",
      author: "",
      genre: [],
      year: undefined,
      pages: undefined,
      qtdPagesRead: undefined,
      rating: undefined,
      synopsis: "",
      cover: "",
      status: StatusLeitura.QUERO_LER,
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        e.target.type === "number" && value !== ""
          ? parseInt(value, 10)
          : value,
    }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value as Genre
    );
    setFormData((prev) => ({ ...prev, genre: selectedOptions }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.title.trim()) newErrors.title = "Título é obrigatório";
    if (!formData.author.trim()) newErrors.author = "Autor é obrigatório";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    console.log("Dados a serem enviados:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    alert(
      `Livro ${
        isEditing ? "atualizado" : "cadastrado"
      } com sucesso! (Simulação)`
    );
    router.push("/livros/biblioteca");
    router.refresh();
  };

  const progress = useMemo(() => {
    const filledFields = formFields.filter((field) => {
      const value = formData[field];
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === "string") return value.trim() !== "";
      return value !== undefined && value !== null && value !== 0;
    }).length;
    return (filledFields / formFields.length) * 100;
  }, [formData]);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-purple-600 rounded-lg shadow">
      {/* Barra de progresso */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-neutral-50">
          Progresso do Cadastro
        </h2>
        <Progress value={progress} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Coluna da capa */}
        <div className="md:col-span-1 flex flex-col items-center">
          <h3 className="text-lg font-medium mb-4 text-zinc-900">
            Capa do Livro
          </h3>
          <div className="w-full max-w-[250px] aspect-[2/3] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border-2 border-dashed border-gray-300">
            {formData.cover ? (
              <img
                src={formData.cover}
                alt="Pré-visualização da capa"
                className="w-full h-full object-cover"
                onError={(e) =>
                  (e.currentTarget.src =
                    "https://placehold.co/300x450/cccccc/999999?text=Capa+Inválida")
                }
              />
            ) : (
              <div className="text-center text-zinc-900 p-4 text-sm">
                <span>Cole a URL da capa para visualizar</span>
              </div>
            )}
          </div>
        </div>

        {/* Coluna dos detalhes */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-medium mb-4 text-zinc-900">
            Detalhes do Livro
          </h3>

          <Input
            label="Título *"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {errors.title && (
            <p className="text-red-500 text-sm -mt-2">{errors.title}</p>
          )}

          <Input
            label="Autor *"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          {errors.author && (
            <p className="text-purple-600 text-sm -mt-2">{errors.author}</p>
          )}

          <Input
            label="URL da Capa"
            name="cover"
            type="text"
            placeholder=".\public\covers\placeholder.png"
            value={formData.cover || ""}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Ano de Publicação"
              name="year"
              type="number"
              value={formData.year || ""}
              onChange={handleChange}
            />
            <Input
              label="Nota (0-5)"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.5"
              value={formData.rating || ""}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Total de Páginas"
              name="pages"
              type="number"
              value={formData.pages || ""}
              onChange={handleChange}
            />
            <Input
              label="Páginas Lidas"
              name="qtdPagesRead"
              type="number"
              value={formData.qtdPagesRead || ""}
              onChange={handleChange}
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-1 block text-sm font-medium text-zinc-900"
            >
              Status da Leitura
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            >
              {Object.values(StatusLeitura).map((status) => (
                <option key={status} value={status}>
                  {status.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="genre"
              className="mb-1 block text-sm font-medium text-zinc-900"
            >
              Gênero(s)
            </label>
            <select
              name="genre"
              id="genre"
              multiple
              value={formData.genre}
              onChange={handleGenreChange}
              className="w-full px-3 py-2 border border-bg-zinc-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition h-32"
            >
              {GENEROS_DISPONIVEIS.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <p className="text-xs text-zinc-900 mt-1">
              Segure Ctrl (ou Cmd no Mac) para selecionar mais de um.
            </p>
          </div>

          <div>
            <label
              htmlFor="synopsis"
              className="mb-1 block text-sm font-medium text-zinc-900"
            >
              Sinopse
            </label>
            <textarea
              name="synopsis"
              id="synopsis"
              rows={4}
              value={formData.synopsis || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Salvando..."
                : isEditing
                ? "Salvar Alterações"
                : "Cadastrar Livro"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
