"use client";

import { Button } from "./button"; // Changed to named import


interface FloatButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const FloatButton: React.FC<FloatButtonProps> = ({  children, onClick, ...props }) => {
    return (
        <Button 
            variant="outline"
            
            {...props}
            className={`fixed bottom-5 right-5 p-5 rounded-full `}
            onClick={onClick}
        >
          <div className="flex flex-row gap-x-2 items-center justify-center">
            {children}
          </div>
        </Button>
    );
}

export default FloatButton;
