import type { Metadata } from "next";
import { soDoSans } from "@/lib/fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import TanstackProvider from "@/context/TanstackQueryContext";
import { AuthProvider } from "@/context/AuthContext";

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
        <TanstackProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster richColors />
        </TanstackProvider>
      </body>
    </html>
  );
}