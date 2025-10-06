import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

// Interface para garantir a tipagem dos dados do JSON
interface BookFromJson {
  id: string;
  title: string;
  author: string;
  genre: string;
  year: number;
  pages: number;
  rating: number;
  synopsis: string;
  cover: string;
  isbn?: string;
  notes?: string;
}

async function main() {
  console.log('Iniciando o processo de seed...');

  // 1️⃣ Limpar dados existentes
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  console.log('Banco de dados limpo.');

  // 2️⃣ Ler os dados do arquivo JSON
  const jsonPath = path.join(__dirname, 'data.json');
  const jsonData = await fs.readFile(jsonPath, 'utf-8');
  const books: BookFromJson[] = JSON.parse(jsonData);
  console.log(`${books.length} livros encontrados no arquivo JSON.`);

  // 3️⃣ Criar gêneros únicos
  const genres: string[] = [...new Set(books.map((book: BookFromJson) => book.genre))];
  console.log(`Encontrados ${genres.length} gêneros únicos.`);

  for (const genreName of genres) {
    await prisma.genre.create({
      data: { name: genreName },
    });
  }
  console.log('Gêneros criados com sucesso.');

  // 4️⃣ Mapear IDs dos gêneros
  const createdGenres: { id: string; name: string }[] = await prisma.genre.findMany();
  const genreMap = new Map(createdGenres.map((g) => [g.name, g.id]));

  // 5️⃣ Inserir livros no banco
  for (const book of books) {
    const genreId = genreMap.get(book.genre);
    if (!genreId) {
      console.warn(`Gênero "${book.genre}" para o livro "${book.title}" não encontrado. Pulando...`);
      continue;
    }

    await prisma.book.create({
      data: {
        title: book.title,
        author: book.author,
        year: book.year,
        pages: book.pages,
        rating: book.rating,
        synopsis: book.synopsis,
        cover: book.cover,
        genreId,
        status: 'QUERO_LER', // Valor padrão
        currentPage: 0,
        isbn: book.isbn ?? null,   // Preenche se existir, senão null
        notes: book.notes ?? null, // Preenche se existir, senão null
      },
    });
  }
  console.log('Livros inseridos com sucesso.');

  // 6️⃣ Backup do JSON original
  console.log('Renomeando arquivo JSON original para backup...');
  await fs.rename(jsonPath, path.join(__dirname, 'data-DEPRECATED.json'));
  console.log('Arquivo renomeado para "data-DEPRECATED.json".');

  console.log('Processo de seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
