import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Guess that Pokémon!",
  description:
    "Engage in a thrilling Pokémon trivia experience with Guess That Pokémon! Test your knowledge of the vast Pokémon universe as you try to identify the mysterious creatures from their silhouettes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
