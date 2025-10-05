import { NextResponse } from "next/server";
import { livrosIniciais } from "@/data/livros";

// GET /api/stats - Retorna estatísticas dos livros
export async function GET() {
  const livrosLidos = livrosIniciais.filter(livro=> livro.status === "LIDO").length;
  const lendoAtualmente = livrosIniciais.filter(livro=> livro.status === "LENDO" || livro.status === "PAUSADO").length;
  const queroLer = livrosIniciais.filter(livro=> livro.status === "QUERO LER").length;
  const paginasLidas = livrosIniciais.reduce((total, livro) => total + (livro.qtdPagesRead || 0), 0);

  const stats = {
    livrosLidos,
    lendoAtualmente,
    queroLer,
    paginasLidas
  };

  return NextResponse.json(stats);
}