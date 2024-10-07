import { X } from "lucide-react";


const Element = ( {title, icon}: {title: string, icon: React.ReactNode} ) => {
  return (
    <div className="w-full flex justify-between items-center px-4 py-2">
        <div className="flex flex-row items-center justify-start gap-2 text-black">
            {icon}
            <h2 className="text-lg font-bold text-black">{title}</h2>
        </div>
        <div className="cursor-pointer">
            <X />
        </div>
    </div>
  );
};

export default Element;
