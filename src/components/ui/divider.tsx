import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ orientation = 'horizontal', className }) => {
  return (
    <div
      className={`${
        orientation === 'vertical' ? 'w-px h-full' : 'h-px w-full'
      } bg-gray-300 ${className}`}
    />
  );
};

export default Divider;
