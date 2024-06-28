import type { Metadata } from "next";

import { Nunito } from "next/font/google";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "caso-0-nextjs",
  description: "A project by Paaauldev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="m-auto min-h-screen max-w-7xl bg-white" lang="en">
      <body className={`${font.className} m-0 box-border p-0`}>
        <main className="flex flex-col justify-between border-4 border-black">
          <header className="flex items-center gap-3 border-b-4 border-b-black p-4 text-2xl font-bold">
            <i className="nes-icon coin is-medium" />
            <span>PokeStore</span>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
