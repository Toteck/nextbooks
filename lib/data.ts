import prisma from './prisma';
import { Book, Genre, Prisma, ReadingStatus } from '@prisma/client';

// 2.3. Interfaces TypeScript
export type CreateBookData = Omit<Book, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateBookData = Partial<CreateBookData>;

// --- Operações de Livros ---

/**
 * @description Lista todos os livros, ordenados por data de criação (mais recentes primeiro).
 * @returns Promise<Book[]>
 */
export async function getBooks(): Promise<Book[]> {
  try {
    const books = await prisma.book.findMany({
      include: {
        genre: true, // Inclui os dados do gênero relacionado
      },
      orderBy: {
        createdAt: 'desc', // 2.4. Ordenação padrão
      },
    });
    return books;
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    throw new Error('Não foi possível obter a lista de livros.');
  }
}

/**
 * @description Busca um livro específico pelo seu ID.
 * @param id O ID do livro a ser buscado.
 * @returns Promise<Book | null>
 */
export async function getBook(id: string): Promise<Book | null> {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        genre: true,
      },
    });
    return book;
  } catch (error) {
    console.error(`Erro ao buscar o livro com ID ${id}:`, error);
    throw new Error('Não foi possível obter os detalhes do livro.');
  }
}

/**
 * @description Cria um novo livro no banco de dados.
 * @param data Os dados do livro a ser criado.
 * @returns Promise<Book>
 */
export async function createBook(data: CreateBookData): Promise<Book> {
  try {
    const newBook = await prisma.book.create({
      data,
    });
    return newBook;
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    // 2.5. Tratamento de Erros: Erro de campo único (ex: se título fosse único)
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new Error('Já existe um livro com esses dados.');
    }
    throw new Error('Não foi possível criar o livro.');
  }
}

/**
 * @description Atualiza um livro existente.
 * @param id O ID do livro a ser atualizado.
 * @param data Os dados a serem atualizados.
 * @returns Promise<Book>
 */
export async function updateBook(id: string, data: UpdateBookData): Promise<Book> {
    try {
        const updatedBook = await prisma.book.update({
            where: { id },
            data,
        });
        return updatedBook;
    } catch (error) {
        console.error(`Erro ao atualizar o livro com ID ${id}:`, error);
        throw new Error('Não foi possível atualizar o livro.');
    }
}

/**
 * @description Remove um livro do banco de dados.
 * @param id O ID do livro a ser removido.
 * @returns Promise<Book>
 */
export async function deleteBook(id: string): Promise<Book> {
    try {
        const deletedBook = await prisma.book.delete({
            where: { id },
        });
        return deletedBook;
    } catch (error) {
        console.error(`Erro ao deletar o livro com ID ${id}:`, error);
        throw new Error('Não foi possível remover o livro.');
    }
}


// --- Operações de Gêneros ---

/**
 * @description Lista todos os gêneros disponíveis.
 * @returns Promise<Genre[]>
 */
export async function getGenres(): Promise<Genre[]> {
    try {
        const genres = await prisma.genre.findMany({
            orderBy: { name: 'asc' },
        });
        return genres;
    } catch (error) {
        console.error('Erro ao buscar gêneros:', error);
        throw new Error('Não foi possível obter a lista de gêneros.');
    }
}

/**
 * @description Cria um novo gênero.
 * @param name O nome do gênero a ser criado.
 * @returns Promise<Genre>
 **/
export async function createGenre(name: string): Promise<Genre> {
    try {
        const newGenre = await prisma.genre.create({
            data: { name },
        });
        return newGenre;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error(`O gênero "${name}" já existe.`);
        }
        console.error('Erro ao criar gênero:', error);
        throw new Error('Não foi possível criar o gênero.');
    }
}

// --- Operações de Status ---

/**
 * @description Retorna a lista de opções de status de leitura do Enum.
 * @returns string[]
 */
export function getReadingStatusOptions(): string[] {
    return Object.values(ReadingStatus);
}