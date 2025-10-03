import { Genre } from "./genre";

export enum StatusLeitura {
    QUERO_LER = "QUERO LER",
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
  dataConclusao?: string;
}

export interface Stats {
  livrosLidos: number;
  lendoAtualmente: number;
  queroLer: number;
  paginasLidas: number;
}