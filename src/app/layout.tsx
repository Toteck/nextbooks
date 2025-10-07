import type { Metadata } from "next";
import "./globals.css";

import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider"

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
    // Adiciona suppressHydrationWarning na tag <html>
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased bg-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-purple-900 dark:via-gray-900/100">
        <ThemeProvider
          attribute="class" // Aplica a classe 'dark' no <html>
          defaultTheme="system" // Usa a configuração de tema do SO por padrão
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <Toaster />
          {/* {Container Global} */}
          <main className="container mx-auto px-4 sm:px-6 py-6">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
