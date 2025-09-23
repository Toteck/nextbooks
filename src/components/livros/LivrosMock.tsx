import { Livro, StatusLeitura } from "@/types/livro";
import { Genre } from "@/types/genre";


export const livrosMock: Livro[] = [
  {
    id: "1",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    genre: [Genre.LITERATURA_BRASILEIRA],
    year: 1899,
    pages: 320,
    rating: 5,
    synopsis: "Um romance sobre ciúmes e traição.",
    cover:
      "https://nextjs.org/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F3H50xK2X0D28uO5v9B45Qj%2Fa3b0d2d31e9c2f664537128502f9024f%2Fnextjs-social-card-v16.png&w=1920&q=75",
    isReading: false,
    isCompleted: true,
    pageCount: 320,
    status: StatusLeitura.LIDO,
    qtdPagesRead: 320,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: [Genre.FICCAO_CIENTIFICA],
    year: 1949,
    pages: 328,
    rating: 4.5,
    synopsis: "Um romance distópico sobre um regime totalitário.",
    cover:
      "https://nextjs.org/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F3H50xK2X0D28uO5v9B45Qj%2Fa3b0d2d31e9c2f664537128502f9024f%2Fnextjs-social-card-v16.png&w=1920&q=75",
    isReading: true,
    isCompleted: false,
    pageCount: 150,
    status: StatusLeitura.LENDO,
    qtdPagesRead: 150,
  },
  {
    id: "3",
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    genre: [Genre.FANTASIA],
    year: 1954,
    pages: 1216,
    rating: 5,
    synopsis: "Uma épica jornada pela Terra Média.",
    cover:
      "https://nextjs.org/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F3H50xK2X0D28uO5v9B45Qj%2Fa3b0d2d31e9c2f664537128502f9024f%2Fnextjs-social-card-v16.png&w=1920&q=75",
    isReading: false,
    isCompleted: false,
    pageCount: 0,
    status: StatusLeitura.QUERO_LER,
    qtdPagesRead: 0,
  },
];
