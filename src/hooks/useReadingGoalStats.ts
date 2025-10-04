import { Livro, StatusLeitura } from "@/types/livro";
import { livrosIniciais } from "@/data/livros";

export interface ReadingGoalStats {
  year: number;
  booksRead: number;
  annualGoal: number;
}

// O hook agora recebe um objeto com os livros e a meta
export function useReadingGoalStats({
  allBooks = livrosIniciais,
  annualGoal, // A meta agora vem como parâmetro
}: {
  allBooks?: Livro[];
  annualGoal: number;
}): ReadingGoalStats {
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
    annualGoal: annualGoal,
  };
}