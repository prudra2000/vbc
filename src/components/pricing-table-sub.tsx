"use client";
import { Check, HelpCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSession } from "next-auth/react";
export default function PricingTable() {
  const { data: session } = useSession();
  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "For individuals and small projects",
      features: ["1 DigiMe Card", "Basic Card Styles"],
      cta: "Get Started",
      link: "/auth/register",
    },
    {
      name: "Pro",
      price: "$5",
      period: "/year",
      description: "For professionals and growing teams",
      features: ["5 DigiMe Cards", "All Card Styles", "Access to all OAuth Social Providers"],
      cta: "Upgrade to Pro",
      priceId: process.env.NODE_ENV === "development" ? "price_1QCNW8BbLd4KETBcxDQ0lqYb" : "",
      link: process.env.NODE_ENV === "development" ? `https://buy.stripe.com/test_9AQeVzawI0aQ7Ha000?prefilled_email=${session?.user?.email}` : "",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with specific needs",
      features: ["All Pro features", "Unlimited DigiMe Cards", "Custom Integrations", "24/7 Dedicated Support", "Dedicated Account Manager"],
      cta: "Contact Sales",
      link: "#contact",
    },
  ]

  const featureComparison = [
    { feature: "DigiMe Cards", free: "1", pro: "5", enterprise: "Unlimited" },
    { feature: "Card Styles", free: "Basic", pro: "All", enterprise: "All" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 justify-center">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Choose Your Plan</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.popular ? 'border-blue-800' : ''}`}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-3xl font-bold mb-2">
                {tier.price}
                {tier.period && <span className="text-xl font-normal">{tier.period}</span>}
              </div>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-blue-800 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={tier.link} target="_blank">{tier.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">Feature Comparison</h2>
      <TooltipProvider>
        <Table className="w-1/2 mx-auto ">
          <TableHeader>
            <TableRow className="text-neutral-800">
              <TableHead className="text-neutral-800">Feature</TableHead>
              <TableHead className="text-neutral-800">Free</TableHead>
              <TableHead className="text-neutral-800">Pro</TableHead>
              <TableHead className="text-neutral-800">Enterprise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {featureComparison.map((row) => (
              <TableRow key={row.feature} className="text-neutral-800" >
                <TableCell className="font-medium ">
                  {row.feature}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-4 w-4 inline-block ml-1 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="">Details about {row.feature}</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>{row.free}</TableCell>
                <TableCell>{row.pro}</TableCell>
                <TableCell>{row.enterprise}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TooltipProvider>
    </div>
  )
}