import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muslim Utilities — Free Islamic Tools and Quran Downloads",
  description: "Muslim Utilities: Your all-in-one Islamic companion. Zakat Calculator, Prayer Times, Dhikr Counter, Hijri Converter, Qibla Finder, and Quran SM Download for social media recitation videos. Free, private, and easy to use.",
  keywords: ["Muslim Utilities", "Islamic tools", "Quran SM Download", "Zakat Calculator", "Prayer Times", "Dhikr Counter", "Hijri Converter", "Qibla Finder", "Quran recitation", "Islamic app", "Muslim app"],
  openGraph: {
    title: "Muslim Utilities — Free Islamic Tools and Quran Downloads",
    description: "Your all-in-one Islamic companion. Zakat Calculator, Prayer Times, Dhikr Counter, Hijri Converter, Qibla Finder, and Quran SM Download.",
    url: "https://muslim-utilities.vercel.app",
    siteName: "Muslim Utilities",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muslim Utilities — Free Islamic Tools and Quran Downloads",
    description: "Your all-in-one Islamic companion. Zakat Calculator, Prayer Times, Dhikr Counter, Hijri Converter, Qibla Finder, and Quran SM Download.",
  },
  alternates: {
    canonical: "https://muslim-utilities.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
  },
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
