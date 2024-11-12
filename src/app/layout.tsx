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
