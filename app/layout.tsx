import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muslim Utilities",
  description: "Muslim Utilities and Quran SM Download — Islamic tools for everyone",
  verification: {
    google: "V76HNLMiHxYovQk5dt_s91hUZTE-hZyLl6E_hNIsJA8",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-6PK87EWQR0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-6PK87EWQR0');`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
