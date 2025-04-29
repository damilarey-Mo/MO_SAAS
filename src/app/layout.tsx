import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Support SaaS Platform",
  description: "A modern tech support platform for your business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
