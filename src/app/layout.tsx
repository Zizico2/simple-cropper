import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@cloudflare/kumo/styles/standalone";

export const metadata: Metadata = {
  title: "Simple Image Cropper",
  description: "A lightweight, client-side image cropping tool",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
