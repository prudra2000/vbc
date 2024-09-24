"use client";
import React, { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const tooltipVariants = cva(
  "absolute w-auto text-xs text-center transition-opacity duration-300 whitespace-normal z-20",
  {
    variants: {
      variant: {
        default:
          "bg-dark-primary text-white outline outline-1 outline-dark-secondary",
        secondary: "bg-light-primary  text-black outline outline-1 outline-light-secondary",
        custom: "",
      },
      rounded: {
        small: "rounded-sm",
        medium: "rounded-md",
        large: "rounded-lg",
        full: "rounded-full",
      },
      position: {
        top: "bottom-full mb-2",
        bottom: "top-full mt-2",
        left: "right-full mr-2",
        right: "left-full ml-2",
      },
      size: {
        default: "px-4 py-1",
        large: "px-5 py-1.5 text-base",
        small: "px-2 py-0.5 ",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "small",
      position: "top",
    },
  }
);

interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  text: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  variant,
  size,
  rounded,
  text,
  children,
  position,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex flex-col justify-center items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={twMerge(
            tooltipVariants({ variant, size, rounded, position, className }), "z-50"
          )}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
