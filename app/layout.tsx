import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jose Bravo | I build apps that run businesses",
  description:
    "Founder of FirstIn. I design and ship full web apps with logins, payments, texting and AI agents, built fast with Claude, GitHub and Vercel.",
  openGraph: {
    title: "Jose Bravo | I build apps that run businesses",
    description: "Full web apps with payments, texting and AI agents. Founder of FirstIn.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen font-sans antialiased">{children}</body>
    </html>
  );
}
