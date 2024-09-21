import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/navbar";
import Logo from "@/components/logo"; // Add this import

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
            <Logo />
            <span className="ml-2 text-xl font-bold">VBC</span>
          </div>
        }
        links={undefined}
      ></Navbar>
      <div className="p-5">
        {children}
      </div>
    </SessionProvider>
  );
}
