import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Aqui você define cabeçalho, sidebar, rodapé(se tiver).
// Normalmente mexe pouco nesse arquivo, só se precisar de layout global.
// Paleta base: usar Tailwind purple(ex: bg - purple - 600 no header).

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
      <body
        className={`antialiased bg-gray-50`}
      >
        {/* {Container Global} */}
        <main className="container mx-auto px-6 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
