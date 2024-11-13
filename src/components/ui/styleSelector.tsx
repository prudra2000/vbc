import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"; // Import the Checkbox component from shadcn/ui

interface StyleSelectorProps {
  selectedStyle?: string;
  onSelectStyle: (style: string) => void;
}

const StyleSelector = ({
  onSelectStyle,
}: StyleSelectorProps) => {
  // State to track a single selected item
  const [selected, setSelected] = useState<number | null>(null);

  // Set selected item index, or deselect if already selected
  const selectItem = (index: number) => {
    setSelected((prev) => (prev === index ? null : index));
  };

  const style = {
    defaultLight: {
      id: "defaultLight",
      displayName: "Default Light",
      image: "/images/default-light.png",
    },
    defaultDark: {
      id: "defaultDark",
      displayName: "Default Dark",
      image: "/images/default-dark.png",
    },
    glassLight: {
      id: "glassLight",
      displayName: "Glass Light",
      image: "/images/glass-light.png",
    },
  };

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 h-64 overflow-y-auto justify-items-center">
      {Object.values(style).map((item, index) => (
        <div className="flex flex-col items-center" key={item.id}>
          <div
            onClick={() => {
              selectItem(index);
              onSelectStyle(item.id);
            }}
            className={`relative flex items-center justify-center w-32 h-32 border  bg-gray-100 cursor-pointer rounded-lg ${
              selected === index ? "border-blue-500" : "border-gray-300"
            }`}
          >
            {selected === index && (
              <Checkbox
                checked
                className="absolute top-2 right-2"
                aria-label={`Select item ${index + 1}`}
              />
            )}
          </div>
          <span>{item.displayName}</span>
        </div>
      ))}
    </div>
  );
};

export default StyleSelector;
