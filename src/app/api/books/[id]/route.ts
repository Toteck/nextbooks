import { NextRequest, NextResponse } from "next/server";
import { livrosIniciais, updateLivro, deleteLivro } from "@/data/livros";


//GET para os detalhes do livro

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const livro = livrosIniciais.find((livro) => livro.id === params.id);
  if (!livro) {
    return NextResponse.json({ message: "Livro não encontrado" }, { status: 404 });
  }
  return NextResponse.json(livro);
}

//PATCH para atualizar o livro
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const dadosAtualizados = await req.json();
  const livroExistente = livrosIniciais.find((livro) => livro.id === params.id);

  if (!livroExistente) {
    return NextResponse.json({ message: "Livro não encontrado" }, { status: 404 });
  }

  const livroAtualizado = { ...livroExistente, ...dadosAtualizados };
  updateLivro(livroAtualizado);
  return NextResponse.json(livroAtualizado);
}

//DELETE para deletar o livro
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const livroExistente = livrosIniciais.find((livro) => livro.id === params.id);
  if (!livroExistente) {
    return NextResponse.json({ message: "Livro não encontrado" }, { status: 404 });
  }
  deleteLivro(params.id);
  return NextResponse.json({ message: "Livro deletado com sucesso" });
}