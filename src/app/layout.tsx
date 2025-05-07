import type { Metadata } from "next";
import { Poppins, Salsa } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CuteFont = Salsa({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Cek Kode Cinta",
  description: "Created by SirGhazian",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${CuteFont.className} antialiased `}>
        <div className="font-[Poppins]">{children}</div>
      </body>
    </html>
  );
}
