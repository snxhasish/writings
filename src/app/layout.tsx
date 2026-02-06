import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const font = Source_Code_Pro({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://writings.snehasish.xyz"),
  title: "writings by snehasish",
  description: "my writings about tech and personal interests.",
  generator: "Next.js",
  keywords: ["writings", "snehasish", "writings by snehasish", "writings.snehasish.xyz"],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#ffffff" },
  ],
  colorScheme: "dark",
  openGraph: {
    type: "website",
    url: "https://writings.snehasish.xyz",
    title: "writings by snehasish",
    description: "my writings about tech and personal interests",
    siteName: "writings by snehasish",
    images: [
      {
        url: "https://writings.snehasish.xyz/banner.png",
        width: 1200,
        height: 600,
        alt: "writings by snehasish",
      },
    ],
    locale: "en_US",
    alternateLocale: ["de_DE", "fr_FR"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@snehasishxyz",
    creator: "@snehasishxyz",
    title: "writings by snehasish",
    description: "my writings about tech and personal interests",
    images: ["https://writings.snehasish.xyz/banner.png"],
  },
  icons: {
    icon: "/favicon.ico",
  }
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
