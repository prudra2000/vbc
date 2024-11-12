import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import * as React from "react";

const chipVariants = cva(
  "flex flex-row max-w-[10rem] justify-center items-center rounded-full text-xs  truncate ... disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-dark-primary text-white hover:bg-dark-secondary outline outline-1 outline-dark-secondary",
        secondary: "bg-light-primary hover:bg-light-secondary text-black outline outline-1 outline-light-secondary",
        warning:
          "bg-warning-primary text-black hover:bg-warning-secondary outline outline-1 outline-warning-secondary",
        success:
          "bg-success-primary text-black hover:bg-success-secondary outline outline-1 outline-success-secondary",
        info: "bg-info-primary text-white hover:bg-info-secondary outline outline-1 outline-info-secondary",
        error:
          "bg-error-primary text-white hover:bg-error-secondary outline outline-1 outline-error-secondary",
        custom: "",
      },
      size: {
        default: "px-3 py-1.5",
        large: "px-6 py-2",
        small: "px-3 py-0.5",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ChipProps extends VariantProps<typeof chipVariants> {
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  avatar?: React.ReactNode;
  size?: "default" | "large" | "small";
  disabled?: boolean;
  variant?: "default" | "secondary" | "warning" | "success" | "info" | "error" | "custom";
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({ variant, avatar, children, className, icon, size, disabled, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(chipVariants({ variant, size, className, disabled }))}
      {...props}
    >
      {icon && <div className="mr-2">{icon}</div>}
      {avatar && <div className="mr-2">{avatar}</div>}
      {children}
    </div>
  )
);
Chip.displayName = "Chip";

export { Chip, chipVariants };
