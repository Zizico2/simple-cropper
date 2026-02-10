import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simple Image Cropper",
  description: "A lightweight, client-side image cropping tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
