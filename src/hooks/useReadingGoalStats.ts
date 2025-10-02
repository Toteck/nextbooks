import { Livro, StatusLeitura } from "@/types/livro";
import { livrosIniciais } from "@/data/livros";

export interface ReadingGoalStats {
  year: number;
  booksRead: number;
  annualGoal: number;
}

export function useReadingGoalStats(
  allBooks: Livro[] = livrosIniciais,
  annualGoal: number = 10 // Valor mock default para a meta anual
): 
ReadingGoalStats {
  const booksReadCount = allBooks.filter(
    (livro) => livro.status === StatusLeitura.LIDO
  )
  .length;  
  const currentYear = new Date().getFullYear();
  return {
    year: currentYear,
    booksRead: booksReadCount,
    annualGoal: annualGoal,
  };
}