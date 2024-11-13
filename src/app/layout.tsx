import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Poppins } from "next/font/google"; // Import Poppins font

const poppins = Poppins({
  subsets: ["latin"], // Specify the subsets you need
  weight: ["400", "500", "600", "700"], // Specify the weights you want to use
});

export const metadata: Metadata = {
  title: "DigiMe",
  description: "Create your digital footprint with DigiMe!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" href="/favicon/favicon.ico"  />
        <link rel="icon" href="/favicon/favicon.svg" sizes="any" type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="DigiMe" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={`${poppins.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
