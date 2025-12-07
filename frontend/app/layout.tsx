import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Using Outfit for headings if available, or just Inter
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from 'react-hot-toast';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: "FlareTrust",
  description: "Real-time Reputation Layer on Flare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-slate-950 text-slate-100 min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
