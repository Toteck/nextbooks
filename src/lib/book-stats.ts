import { Livro, Stats, StatusLeitura } from "@/types/livro"; 

export function calcularEstatisticasLivros(livros: Livro[]): Stats {
  const stats: Stats = {
    livrosLidos: 0,
    lendoAtualmente: 0,
    queroLer: 0,
    paginasLidas: 0,
  };

  livros.forEach((livro) => {
   const totalPaginasLidasNoLivro = livro.qtdPagesRead ?? 0;

    switch (livro.status) {
      case StatusLeitura.LIDO:
        stats.livrosLidos += 1;
        stats.paginasLidas += livro.pages || 0; 
        break;

      case StatusLeitura.LENDO:
      case StatusLeitura.PAUSADO:
       
        stats.lendoAtualmente += 1;
        stats.paginasLidas += totalPaginasLidasNoLivro; 
   
        break;

      case StatusLeitura.QUERO_LER:
        
        stats.queroLer += 1;
        break;

      case StatusLeitura.ABANDONADO:
        
        break;

      default:
       
        break;
    }
  });

  return stats;
}
