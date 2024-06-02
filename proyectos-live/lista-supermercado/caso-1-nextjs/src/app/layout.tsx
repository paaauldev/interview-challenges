import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "caso-1-nextjs",
  description: "A project by Paaauldev",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
