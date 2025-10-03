import type { Metadata } from "next";
import "./globals.css";
<<<<<<< HEAD
import { Plus, BookOpen, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DefaultButton } from "@/components/livros/Button";
=======

import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
>>>>>>> main

// Metadados da aplicação
export const metadata: Metadata = {
  title: "NextBooks",
  description: "A book reading progress tracking app",
};

// Layout raiz (envolve todas as páginas)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-gray-100">
        <Header />
        <Toaster />
        {/* {Container Global} */}
<<<<<<< HEAD
        <main className="container mx-auto px-4 sm:px-6 py-6 pb-[100px] sm:pb-[100px]">
          {children}
        </main>
=======
        <main className="container mx-auto px-4 sm:px-6 py-6">{children}</main>

>>>>>>> main
      </body>
    </html>
  );
}
