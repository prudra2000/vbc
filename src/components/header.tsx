import React from "react";

interface HeaderProps {
  headerTitle: string;
  icon?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  headerTitle,
  icon,
}) => {
  return (
    <div className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-5 rounded-md shadow-md">
      <div className="flex items-center gap-2 text-white">
        <div>{icon}</div>
        <h1 className="text-2xl font-semibold">{headerTitle}</h1>
      </div>
    </div>
  );
};

export default Header;
