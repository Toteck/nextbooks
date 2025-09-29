import { Livro, Stats } from "@/types/livro";

export function calcularEstatisticasLivros(livros: Livro[]): Stats {
  const stats: Stats = {
    livrosLidos: 0,
    lendoAtualmente: 0,
    queroLer: 0,
    paginasLidas: 0,
  };

  livros.forEach((livro) => {
   if (livro.isCompleted) {
      stats.livrosLidos += 1;
      stats.paginasLidas += livro.pageCount;
   } else if (livro.isReading) {
      stats.lendoAtualmente += 1;
   } else {
      stats.queroLer += 1;
   }
  });

  return stats;
}