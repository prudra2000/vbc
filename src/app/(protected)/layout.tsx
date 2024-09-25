import { SessionProvider } from "next-auth/react";
import { Navbar } from "@/components/navbar/navbar";
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
            <span className="ml-2 text-xl font-bold text-black">VBC</span>
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
