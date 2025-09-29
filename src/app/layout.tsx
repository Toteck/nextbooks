import type { Metadata } from "next";
import "./globals.css";
import { Plus, BookOpen, Moon } from "lucide-react"
import { Button } from "@/components/ui/button";
import { DefaultButton } from "@/components/livros/Button";

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
        <header className="border-b bg-gray-50">
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            {/* Logo + Nome */}
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-semibold">NextBooks</span>
            </div>

            {/* Ações do Header */}
            <div className="flex items-center gap-4">
              <Button
                variant={"ghost"}
                size={"icon"}
                className="hover:bg-gray-200 hover:cursor-pointer"
              >
                <Moon className="h-4 w-4" />
              </Button>

              {/* <DefaultButton label="Adicionar Livros" /> */}
            </div>
          </div>
        </header>
        {/* {Container Global} */}
        <main className="container mx-auto px-4 sm:px-6 py-6">{children}</main>
      </body>
    </html>
  );
}
