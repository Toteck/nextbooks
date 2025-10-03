import type { Metadata } from "next";
import "./globals.css";

import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

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
        <main className="container mx-auto px-4 sm:px-6 py-6">{children}</main>

      </body>
    </html>
  );
}
