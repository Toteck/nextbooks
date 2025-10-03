import { Livro, StatusLeitura } from "@/types/livro";
import { livrosIniciais } from "@/data/livros";

export interface ReadingGoalStats {
  year: number;
  booksRead: number;
  annualGoal: number;
}

const META_ANUAL_PADRAO = 20;

export function useReadingGoalStats(
  allBooks: Livro[] = livrosIniciais
): ReadingGoalStats {
  const currentYear = new Date().getFullYear();

  const booksReadThisYear = allBooks.filter((livro) => {
    const isCompleted = livro.status === StatusLeitura.LIDO;

    if (!isCompleted || !livro.dataConclusao) {
      return false;
    }

    const completionYear = new Date(livro.dataConclusao).getFullYear();
    return completionYear === currentYear;
  });

  return {
    year: currentYear,
    booksRead: booksReadThisYear.length,
    annualGoal: META_ANUAL_PADRAO,
  };
}