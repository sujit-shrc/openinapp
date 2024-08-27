import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./provider";
import { ThemeProvider } from "@/context/theme-provider";

export const metadata: Metadata = {
  title: "Base App",
  description: "Base App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className="bg-white text-black dark:bg-gray-800 dark:text-white transition-colors duration-200">
          <ThemeProvider> {children}</ThemeProvider>
        </body>
      </Providers>
    </html>
  );
}
