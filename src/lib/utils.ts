import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Funções utilitárias
// Helpers (ex: formatar datas, cortar texto)
// Tudo que pode ser reaproveitado.

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
