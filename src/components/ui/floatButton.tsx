"use client";

import { twMerge } from "tailwind-merge";
import { Button } from "./button"; // Changed to named import


interface FloatButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled?: boolean;
}

const FloatButton: React.FC<FloatButtonProps> = ({  children,  disabled, onClick, ...props }) => {
    return (
        <Button 
            variant="outline"
            
            {...props}
            className="fixed bottom-5 right-5 p-5 rounded-full bg-black/50"
            onClick={onClick}
        >
          <div className="flex flex-row gap-x-2 items-center justify-center">
            {children}
          </div>
        </Button>
    );
}

export default FloatButton;
