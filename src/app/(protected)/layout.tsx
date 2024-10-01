import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/navbar/navbar";
import DigiMeLogo from "@/components/DigiMeLogo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar
        logo={
          <DigiMeLogo />
        }
        links={undefined}
      ></Navbar>
      <div className="">
        {children}
      </div>
    </SessionProvider>
  );
}
