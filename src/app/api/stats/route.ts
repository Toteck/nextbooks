// app/api/stats/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 
import { ReadingStatus } from "@prisma/client"; 

// --- Tipagem dos Dados Buscados ---
interface LivroParaStats {
  status: ReadingStatus; 
  pages: number | null; 
  currentPage: number;   
}

interface Stats {
  livrosLidos: number;
  lendoAtualmente: number;
  queroLer: number;
  paginasLidas: number;
}


// GET /api/stats - Retorna estatísticas dos livros
export async function GET() {
  try {
    const todosLivros = (await prisma.book.findMany({
      select: {
        status: true,
        pages: true,
        currentPage: true, 
      },
    })) as LivroParaStats[]; 
    
    // Inicializar o Objeto de Estatísticas
    const stats: Stats = { 
      livrosLidos: 0,
      lendoAtualmente: 0,
      queroLer: 0,
      paginasLidas: 0,
    };

    // Iterar e Calcular as Estatísticas
    todosLivros.forEach((livro) => {
      const totalPaginas = livro.pages ?? 0;
      const totalPaginasLidasNoLivro = livro.currentPage; 

      switch (livro.status) {
        case ReadingStatus.LIDO:
          stats.livrosLidos += 1;
          stats.paginasLidas += totalPaginas; 
          break;

        case ReadingStatus.LENDO:
        case ReadingStatus.PAUSADO:
          stats.lendoAtualmente += 1;
          stats.paginasLidas += totalPaginasLidasNoLivro; 
          break;

        case ReadingStatus.QUERO_LER:
          stats.queroLer += 1;
          break;

        default:
          break;
      }
    });

    // Retornar o resultado
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
