import type { Metadata } from "next";

import { Nunito } from "next/font/google";

import "./globals.css";
import Link from "next/link";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "concourse-challenge",
  description: "A project by Paaauldev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
        <header className="text-xl font-bold leading-[4rem]">
          <Link href="/">Concourse-challenge</Link>
        </header>
        <main className="py-8">{children}</main>
        <footer className="text-center leading-[4rem] opacity-70">
          © {new Date().getFullYear()} Concourse-challenge
        </footer>
      </body>
    </html>
  );
}
