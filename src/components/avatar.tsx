import Image from "next/image";
import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { User } from "lucide-react";

const avatarVariants = cva(
  "relative ",
  {
    variants: {
      border: {
        true: "outline outline-1 border-color-class",
        false: "border-none",
      },
      variant: {
        default: "bg-dark-primary text-white outline-dark-secondary",
        secondary: "bg-light-primary text-black outline-light-secondary",
      },
      rounded: {
        none: "rounded-none",
        large: "rounded-lg",
        full: "rounded-full aspect-square",
      },
      size: {
        default: "w-10 h-10 text-sm",
        small: "w-8 h-8 text-xs",
        large: "w-12 h-12 text-lg",
        xl: "w-16 h-16 text-xl",
        xxl: "w-20 h-20 text-2xl",
        xxxl: "w-24 h-24 text-3xl",
        xxxxl: "w-28 h-28 text-4xl",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      border: false,
      variant: "default",
      rounded: "full",
      size: "default",
      disabled: false,
    },
  }
);


interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string;
  alt: string;
  className?: string;
  variant?: "default" | "secondary";
  border?: boolean;
  size?: "default" | "small" | "large" | "xl" | "xxl" | "xxxl" | "xxxxl";
  disabled?: boolean;
  rounded?: "none" | "large" | "full";
  onLoad?: () => void;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  border = false,
  className,
  variant = "default",
  size = "default",
  disabled = false,
  rounded = "full",
  onLoad,
    ...props
}) => {
  return (
    <div
      className={twMerge(avatarVariants({variant, border, className, size, disabled , rounded})) + " flex items-center justify-center"}
    >
      {src ? (
        <Image 
          src={src} 
          alt={alt} 
          fill={true}
          {...props}
          onLoad={onLoad}
          objectFit="cover"
          className={twMerge(avatarVariants({rounded}))} 
          loading="lazy" // Enable lazy loading
        />
      ) : alt ? (
          <span className={twMerge(size)}>
            {alt.split(' ').slice(0, 2).map(word => word.charAt(0)).join('').toUpperCase()}
          </span>
      ) : (
          <User className={twMerge(size)} />
      )}

    </div>
  );
};

export default Avatar;