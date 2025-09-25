import { Genre } from "./genre";

export enum StatusLeitura {
    QUERO_LER = "QUERO_LER",
    LENDO = "LENDO",
    LIDO = "LIDO",
    PAUSADO = "PAUSADO",
    ABANDONADO = "ABANDONADO",
}

// Definição do tipo Livro
export interface Livro {
  id: string;
  title: string;
  author: string;
  genre?: Genre[];
  year?: number;
  pages?: number;
  qtdPagesRead?: number;
  rating?: number;
  synopsis?: string;
  cover?: string;
  status?: StatusLeitura;
  isReading: boolean;
  isCompleted: boolean;
  pageCount: number;
}

export type Stats = {
  livrosLidos: number;
  lendoAtualmente: number;
  queroLer: number; 
  paginasLidas: number;
};

// Exemplo de uso

// import { StatusLeitura } from "@/types/livro";
// import { Genre } from "@/types/genre";

// const exemplo = {
//     id: "1",
//     titulo: "Dom Casmurro",
//     autor: "Machado de Assis",
//     status: StatusLeitura.LIDO,
//     genero: Genre.LITERATURA_BRASILEIRA,
// };