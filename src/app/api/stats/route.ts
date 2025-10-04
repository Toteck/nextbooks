import { NextResponse } from "next/server";
import { livrosDb } from "@/data/livros";

// GET /api/stats - Retorna estatísticas dos livros
export async function GET() {
  const livrosLidos = livrosDb.filter(livro=> livro.status === "LIDO").length;
  const lendoAtualmente = livrosDb.filter(livro=> livro.status === "LENDO" || livro.status === "PAUSADO").length;
  const queroLer = livrosDb.filter(livro=> livro.status === "QUERO LER").length;
  const paginasLidas = livrosDb.reduce((total, livro) => total + (livro.qtdPagesRead || 0), 0);

  const stats = {
    livrosLidos,
    lendoAtualmente,
    queroLer,
    paginasLidas
  };

  return NextResponse.json(stats);
}