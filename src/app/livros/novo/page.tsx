
import LivroForm from "@/components/livros/LivroForm";

export default function NovoLivroPage() {
  return (
    <main>
      <h1 className="text-4xl font-bold text-center text-zinc-950 mb-8">
        Adicionar Novo Livro
      </h1>
      <LivroForm />
    </main>
  );
}