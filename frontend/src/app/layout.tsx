import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Million Miles — Premium Car Search & Delivery",
  description:
    "Premium service for the search and delivery of any vehicles to any destination worldwide.",
  openGraph: {
    title: "Million Miles — Premium Car Search & Delivery",
    description:
      "Premium service for the search and delivery of any vehicles to any destination worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
