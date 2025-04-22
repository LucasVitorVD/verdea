import type { Metadata } from "next";
import { soDoSans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verdea",
  description: "O Verdea é um sistema de irrigação automática que monitora e cuida das suas plantas quando você não pode.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body className={`${soDoSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
