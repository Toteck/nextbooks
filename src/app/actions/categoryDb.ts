// app/actions/categoryDb.ts (Compatível com schema.prisma)

import prisma from '@/lib/prisma';
import { Genre, Prisma, ReadingStatus } from '@prisma/client';

// ----------------------------------------------------
// TIPAGEM
// ----------------------------------------------------
export type GenreType = Genre;

// ----------------------------------------------------
// OPERAÇÕES DE GÊNEROS (CRUD)
// ----------------------------------------------------

export async function getGenres(): Promise<GenreType[]> {
    try {
        const genres = await prisma.genre.findMany({
            orderBy: { name: 'asc' },
        });
        return genres;
    } catch (error) {
        throw new Error('Falha na consulta ao banco de dados para listar gêneros.');
    }
}

export async function createGenre(name: string): Promise<GenreType> {
    const trimmedName = name.trim();
    try {
        const newGenre = await prisma.genre.create({
            data: { name: trimmedName },
        });
        return newGenre;
    } catch (error) {
        // Trata a violação de unicidade (P2002) - Requisito 1.5
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            throw new Error(`O gênero "${trimmedName}" já existe.`);
        }
        throw new Error('Falha ao criar o gênero no banco de dados.');
    }
}

export async function removeGenre(name: string): Promise<void> {
    const trimmedName = name.trim();
    try {
        // Deletamos pelo campo 'name', que é @unique
        await prisma.genre.delete({
            where: { name: trimmedName }, 
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // P2003: Falha de chave estrangeira (gênero está em uso)
            if (error.code === 'P2003') {
                throw new Error(`Não é possível remover o gênero "${trimmedName}" pois existem livros associados a ele.`);
            }
            // P2025: Registro não encontrado
            if (error.code === 'P2025') {
                throw new Error(`Gênero "${trimmedName}" não encontrado.`);
            }
        }
        throw new Error(`Falha ao remover o gênero ${trimmedName}.`);
    }
}

export function getReadingStatusOptions(): string[] {
    return Object.values(ReadingStatus);
}