// app/actions/bookDb.ts (Compatível com schema.prisma)

import prisma from '@/lib/prisma';
import { Book, Prisma, ReadingStatus } from '@prisma/client';

// TIPAGEM EXPLÍCITA E CORRIGIDA

export type BookType = Book; 

/**
 * Interface para CRIAÇÃO de um novo livro.
 * Campos numéricos são definidos como 'number' (Int/Float no Prisma).
 */
export interface CreateBookData {
  title: string;
  author: string;
  genreId: string; // String (cuid)
  
  year?: number; // Int
  pages?: number; // Int
  rating?: number; // Float
  synopsis: string;
  cover: string;

  status: ReadingStatus; // Enum
  currentPage: number; // Int
  isbn?: string;
  notes?: string;
}

/**
 * Interface para ATUALIZAÇÃO de um livro existente.
 */
export type UpdateBookData = Partial<CreateBookData>;

/**
 * Interface para os filtros de busca.
 */
export interface BookFilters {
    q?: string;
    status?: string;
    genreId?: string;
    [key: string]: string | undefined;
}

// OPERAÇÕES DE LIVROS (CRUD)

export async function getBooks(filters: BookFilters = {}): Promise<BookType[]> {
  const { q, status, genreId } = filters;
  const where: Prisma.BookWhereInput = {};

  if (status) {
    try {
        // Usa o Enum tipado
        where.status = status.toUpperCase() as ReadingStatus;
    } catch (e) {
        console.warn(`Status de leitura inválido ignorado: ${status}`);
    }
  }
  if (genreId) {
    where.genreId = genreId;
  }
  if (q) {
    where.OR = [
      // Corrigido para SQLite: Removemos 'mode: insensitive'
      { title: { contains: q } }, 
      { author: { contains: q } },
    ];
  }

  try {
    const books = await prisma.book.findMany({
      where,
      include: { genre: true },
      orderBy: { createdAt: 'desc' },
    });
    return books;
  } catch (error) {
    throw new Error('Falha na consulta ao banco de dados para listar livros.');
  }
}

// ... (Outras funções getBook, createBook, updateBook, deleteBook) ...

export async function createBook(data: CreateBookData): Promise<BookType> {
  try {
    const newBook = await prisma.book.create({
      data: {
        ...data,
        // Garante que o status seja o valor do ENUM se estiver ausente no input
        status: data.status || ReadingStatus.QUERO_LER, 
        currentPage: data.currentPage || 0,
      }
    });
    return newBook;
  } catch (error) {
    // Trata erros específicos do Prisma
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new Error('Já existe um livro com os dados principais.');
    }
    throw new Error('Falha ao criar o livro no banco de dados.');
  }
}

export async function updateBook(id: string, data: UpdateBookData): Promise<BookType> {
    try {
        const updatedBook = await prisma.book.update({
            where: { id },
            data: {
                ...data,
                
                updatedAt: new Date(), 
            },
        });
        return updatedBook;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new Error(`Livro com ID ${id} não encontrado para atualização.`);
        }
        throw new Error('Falha ao atualizar o livro.');
    }
}

export async function deleteBook(id: string): Promise<void> { 
    try {
        await prisma.book.delete({ where: { id } });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
            throw new Error(`Livro com ID ${id} não encontrado para remoção.`);
        }
        throw new Error('Falha ao remover o livro.');
    }
}

export async function getBook(id: string): Promise<BookType | null> {
    try {
      const book = await prisma.book.findUnique({
        where: { id },
        include: { genre: true },
      });
      return book;
    } catch (error) {
      throw new Error(`Falha ao obter o livro com ID: ${id}.`);
    }
}