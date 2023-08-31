import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white h-5">
          <h1>NavBar</h1>
        </header>
        <main className="h-[calc(100vh-5rem)] container mx-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
