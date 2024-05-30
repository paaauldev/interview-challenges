import type {Metadata} from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "caso-0",
  description: "Generated by appncy",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body >{children}
      </body>
    </html>
  );
}
