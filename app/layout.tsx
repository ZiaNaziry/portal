import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmad Zia Naziry",
  description: "Muslim Utilities and Quran SM Download — Tools by Ahmad Zia Naziry",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
