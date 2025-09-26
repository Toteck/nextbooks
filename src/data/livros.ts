import { Genre } from "@/types/genre";
import { Livro, StatusLeitura } from "@/types/livro";

// Dados iniciais (mock)

export const livrosIniciais: Livro[] = [
  {
    id: "1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    year: 1899,
    genre: [Genre.LITERATURA_BRASILEIRA, Genre.ROMANCE],
    pages: 256,
    qtdPagesRead: 100,
    status: StatusLeitura.QUERO_LER,
    rating: 4,
    cover: "/covers/dom-casmurro.jpeg",
    synopsis:
      "Dom Casmurro conta as memórias de Bento Santiago(Bentinho/ Dom Casmurro), um homem amargurado que, ao se sentir traído por sua esposa Capitu com seu melhor amigo Escobar, relembra e interpreta os eventos de sua vida para justificar a dor e a desconfiança que o consumiram.Através de um estilo subjetivo e irônico, a obra explora temas como ciúme, amor, traição e a ambiguidade da memória, deixando o leitor em dúvida sobre a culpa ou inocência de Capitu.",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    year: 1949,
    genre: [Genre.FICCAO_CIENTIFICA],
    pages: 328,
    qtdPagesRead: 50,
    status: StatusLeitura.PAUSADO,
    rating: 5,
    cover: "/covers/1984.jpeg",
    synopsis: "Distopia que inspira reflexões sobre vigilância.",
  },
  {
    id: "3",
    title: "O Hobbit",
    author: "J.R.R. Tolkien",
    year: 1937,
    genre: [Genre.FANTASIA],
    pages: 310,
    qtdPagesRead: 310,
    status: StatusLeitura.LIDO,
    rating: 4,
    cover: "/covers/o-hobbit.jpeg",
    synopsis: "Aventura leve que introduz o mundo de Tolkien.",
  },
  {
    id: "4",
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    year: 1945,
    genre: [Genre.FICCAO, Genre.POLITICA],
    pages: 112,
    qtdPagesRead: 10,
    status: StatusLeitura.LENDO,
    rating: 4,
    cover: "/covers/revolucao-dos-bichos.jpeg",
    synopsis: "O livro narra uma história de corrupção e traição e recorre a figuras de animais para retratar as fraquezas humanas e demolir o paraíso comunista proposto pela União Soviética na época de Stalin. A revolta dos animais da quinta contra os humanos é liderada pelos porcos Bola-de-Neve (Snowball) e Napoleão (Napoleon).",
  },
  {
    id: "5",
    title: "Harry Potter e a Pedra Filosofal",
    author: "J.K. Rowling",
    year: 1997,
    genre: [Genre.FANTASIA],
    pages: 223,
    qtdPagesRead: 150,
    status: StatusLeitura.ABANDONADO,
    rating: 5,
    cover: "/covers/hp1.jpeg",
    synopsis: "Primeiro livro da saga mundialmente famosa.",
  }

];
