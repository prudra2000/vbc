"use client";
import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LogIn,
  Smartphone,
  Globe,
  Zap,
  IdCard,
  CircleUserRound,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import DigiMeLogo from "@/components/DigiMeLogo";
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-200">
      <header className="container mx-auto px-4 h-10 w-full">
        <nav className="flex justify-between items-center pt-4">
          <DigiMeLogo />
          <div className="flex gap-2">
            <LoginButton>
              <Button
                variant="link"
                className="text-blue-800 font-semibold hover:bg-slate-100"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            </LoginButton>
            <Link href="/auth/register">
              <Button
                variant="link"
                className="text-blue-800 font-semibold hover:bg-slate-100"
              >
                <CircleUserRound className="w-4 h-4 mr-2" />
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4">
        <section className="w-full py-12 md:py-24 lg:py-32 h-screen flex flex-col justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
              <div className="flex justify-center">
                <Image
                  alt="Digital Business Card Mockup"
                  className="w-full max-w-3xl md:max-w-5xl lg:max-w-7xl aspect-[1/1] overflow-hidden object-contain object-center"
                  height="600"
                  src="/004.png"
                  width="1000"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Digital Business Cards
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Connect instantly with our innovative digital business
                    cards. Share your professional profile with a tap.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white text-md font-semibold hover:scale-105 shadow-md transition-all duration-300 hover:outline-white">
                      <IdCard className="mr-2" />
                      Create Your DigiMe Card
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col  items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Features</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of professionals using DigiCard
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Mobile-First",
                description: "Optimized for smartphones and tablets",
              },
              {
                icon: Globe,
                title: "Share Anywhere",
                description: "Easy to share via QR code or link",
              },
              {
                icon: Zap,
                title: "Instant Updates",
                description: "Change your info in real-time",
              },
            ].map((feature, index) => (
              <div key={index}>
                <Card className="shadow-md rounded-lg border border-blue-600">
                  <CardContent className="flex flex-col items-center p-6">
                    <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col  items-center mt-20">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Business Options
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of professionals using DigiCard
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Smartphone,
                title: "Mobile-First",
                description: "Optimized for smartphones and tablets",
              },
              {
                icon: Globe,
                title: "Share Anywhere",
                description: "Easy to share via QR code or link",
              },
              {
                icon: Zap,
                title: "Instant Updates",
                description: "Change your info in real-time",
              },
            ].map((feature, index) => (
              <div key={index}>
                <Card className="shadow-md rounded-lg border border-blue-600">
                  <CardContent className="flex flex-col items-center p-6">
                    <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; 2024 DigiMe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
