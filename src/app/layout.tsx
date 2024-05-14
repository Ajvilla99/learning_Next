import type { Metadata } from "next";

import "./globals.css";
import { inter } from "@/config/fonts";



export const metadata: Metadata = {
  title: "Teslo | Shop",
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
