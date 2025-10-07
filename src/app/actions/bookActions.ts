// app/actions/bookActions.ts
'use server'; // ESSENCIAL: Define que todas as funções neste arquivo rodam no servidor.

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { createBook, deleteBook, updateBook, ReadingStatus } from '@/app/actions/bookDb';
// Importamos o apiUtils para ter um tratamento de erro consistente
import { handleApiError } from '@/utils/apiUtils'; 

// ----------------------------------------------------
// 1. ZOD SCHEMA DE VALIDAÇÃO (Requisito: Form Validation)
// ----------------------------------------------------

// Define o Zod Schema baseado na tipagem do seu banco de dados
const BookSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório.' }),
  author: z.string().min(1, { message: 'O nome do autor é obrigatório.' }),
  genreId: z.string().cuid({ message: 'Selecione um gênero válido.' }),
  synopsis: z.string().min(10, { message: 'A sinopse deve ter pelo menos 10 caracteres.' }),
  cover: z.string().url({ message: 'A capa deve ser uma URL válida.' }),
  
  // Campos opcionais/numéricos com transformação
  year: z.string().optional().transform(v => v ? parseInt(v) : undefined),
  pages: z.string().optional().transform(v => v ? parseInt(v) : undefined),
  rating: z.string().optional().transform(v => v ? parseFloat(v) : undefined),
  isbn: z.string().optional(),
  notes: z.string().optional(),
  
  // Enum e campos com valores padrão (garantindo que são number/enum)
  status: z.nativeEnum(ReadingStatus).default(ReadingStatus.QUERO_LER),
  currentPage: z.string().optional().default('0').transform(v => parseInt(v)),
});

// ----------------------------------------------------
// 2. SERVER ACTION DE CRIAÇÃO
// ----------------------------------------------------

/**
 * @description Cria um novo livro no banco de dados.
 * @param formData Dados recebidos de um formulário HTML.
 */
export async function createBookAction(formData: FormData) {
  // Converte FormData para um objeto simples
  const rawData = Object.fromEntries(formData.entries());
  
  // 1. Validação
  const validatedFields = BookSchema.safeParse(rawData);

  if (!validatedFields.success) {
    // Retorna os erros de validação para o frontend (a serem tratados em um useFormState ou useFormStatus)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Falha na validação dos campos.',
    };
  }

  // 2. Persistência
  try {
    // Chama a função de abstração de dados
    const newBook = await createBook(validatedFields.data as any); 
    
    // 3. Revalidação e Redirecionamento
    // 'revalidatePath' limpa o cache de todas as páginas da rota /dashboard/books
    revalidatePath('/dashboard/books'); 
    
    // Redireciona o usuário para a página de detalhes do novo livro
    redirect(`/dashboard/books/${newBook.id}`); 

  } catch (error) {
    // Usa o utilitário de erro que criamos, transformando em um objeto amigável
    const { status, message } = handleApiError(error);
    return {
      message: status === 409 ? message : 'Erro inesperado ao criar o livro.',
      errors: null,
    };
  }
}

// ----------------------------------------------------
// 3. SERVER ACTION DE EXCLUSÃO
// ----------------------------------------------------

/**
 * @description Remove um livro e revalida o cache.
 * @param id O CUID do livro a ser excluído.
 */
export async function deleteBookAction(id: string) {
  try {
    await deleteBook(id);
    
    // Revalida a lista principal para que o livro excluído suma
    revalidatePath('/dashboard/books');
    
    // Não precisamos redirecionar aqui, quem chama (o formulário) lida com isso.
    return { success: true, message: 'Livro excluído com sucesso.' };
    
  } catch (error) {
    const { message } = handleApiError(error);
    return { 
      success: false, 
      message: message || 'Erro ao excluir o livro.' 
    };
  }
}

// ----------------------------------------------------
// 4. SERVER ACTION DE ATUALIZAÇÃO (Estrutura Básica)
// ----------------------------------------------------

/**
 * @description Atualiza um livro existente.
 * @param id ID do livro
 * @param formData Dados recebidos de um formulário HTML.
 */
export async function updateBookAction(id: string, formData: FormData) {
  
  return { message: 'Ação de atualização de livro não implementada.' };
}