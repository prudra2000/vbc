import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/navbar/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar
        logo={
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-800 font-poppins">
            DigiMe
          </h1>
          </div>
        }
        links={undefined}
      ></Navbar>
      <div className="">
        {children}
      </div>
    </SessionProvider>
  );
}
