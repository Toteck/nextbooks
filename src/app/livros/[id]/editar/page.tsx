import { Livro, StatusLeitura } from "@/types/livro";
import { Genre } from "@/types/genre";
import { LivroForm } from "@/components/livros/LivroForm";

async function getBookData(id: string): Promise<Livro | null> {
  console.log(`Buscando dados para o livro com ID: ${id}`);

  // Simulação de chamada de API: Retorna um livro de exemplo se o id for "123"
  if (id === "123") {
    return {
      id: "123",
      title: "Duna",
      author: "Frank Herbert",
      cover: "https://m.media-amazon.com/images/I/81dI0e5w6iL._SL1500_.jpg",
      pages: 688,
      qtdPagesRead: 688,
      status: StatusLeitura.LIDO,
      genre: [Genre.FICCAO_CIENTIFICA],
      year: 1965,
      rating: 5,
      synopsis:
        "Uma saga épica de ficção científica ambientada em um futuro distante.",
    };
  }
  return null;
}
interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditarLivroPage({ params }: PageProps) {
  const bookData = await getBookData(params.id);

  if (!bookData) {
    return (
      <main className="text-center py-8">
        <h1 className="text-2xl text-purple-950">Livro não encontrado.</h1>
      </main>
    );
  }

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
        Editar Livro: <span className="text-purple-950">{bookData.title}</span>
      </h1>
      <LivroForm livro={bookData} onSubmit={(values) => {
        console.log("Atualizando livro:", values)
      }} onCancel={() => console.log("Cancelou edição")} />
    </main>
  );
}
