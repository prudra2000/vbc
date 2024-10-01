"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Social } from "./social";
import { BackButton } from "./back-button";
import { Separator } from "../ui/separator";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonUrl: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonUrl,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[300px] sm:w-[400px] shadow-md">
      <CardHeader>
        <CardTitle className="mb-2">{headerLabel}</CardTitle>
        <Separator />
      </CardHeader>

      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} url={backButtonUrl} />
      </CardFooter>
    </Card>
  );
};
