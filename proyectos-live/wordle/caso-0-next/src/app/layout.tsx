import type { Metadata } from "next";

import { Nunito } from "next/font/google";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "caso-0-next",
  description: "A project by Paaauldev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="m-0 box-border h-full bg-black p-0 text-white" lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
