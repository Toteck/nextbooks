// app/api/stats/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
import { StatusLeitura } from "@/types/livro"; 

// Tipagem 

interface LivroParaStats {
  status: string;
  pages: number | null;
  qtdPagesRead: number | null;
}

// GET /api/stats - Retorna estatísticas dos livros
export async function GET() {
  try {
    // Buscar Apenas os Campos Necessários do Banco de Dados
    const todosLivros = (await prisma.livro.findMany({
      select: {
        status: true,
        pages: true,
        qtdPagesRead: true,
      },
    })) as LivroParaStats[]; 

    // Inicializar o Objeto de Estatísticas
    const stats = {
      livrosLidos: 0,
      lendoAtualmente: 0,
      queroLer: 0,
      paginasLidas: 0,
    };

    // Iterar e Calcular as Estatísticas
    todosLivros.forEach((livro) => {
      const totalPaginas = livro.pages ?? 0;
      const totalPaginasLidasNoLivro = livro.qtdPagesRead ?? 0;

      switch (livro.status) {
        case StatusLeitura.LIDO:
          stats.livrosLidos += 1;
          stats.paginasLidas += totalPaginas;
          break;

        case StatusLeitura.LENDO:
        case StatusLeitura.PAUSADO:
          stats.lendoAtualmente += 1;
          stats.paginasLidas += totalPaginasLidasNoLivro;
          break;

        case StatusLeitura.QUERO_LER:
          stats.queroLer += 1;
          break;

        default:
          break;
      }
    });

    //  Retornar o resultado
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Erro ao calcular estatísticas:", error);

    // Retornar um erro de servidor em caso de falha de DB
    return NextResponse.json(
      { message: "Erro interno ao buscar estatísticas do banco de dados." },
      { status: 500 }
    );
  }
}
