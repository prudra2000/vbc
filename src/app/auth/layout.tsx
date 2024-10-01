import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home } from "lucide-react";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-200">
      <header className="container mx-auto px-4 h-10 w-full">
        <nav className="flex justify-between items-center pt-4">
          <h1 className="text-xl font-bold text-blue-800 font-poppins">
            DigiMe
          </h1>
          <Link href="/">
            <Button variant="link" className="text-blue-800 font-semibold">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex items-center justify-center container mx-auto px-4 py-16">
        {children}
      </main>
      <footer className="bg-gray-100 py-8 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; 2024 DigiCard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
