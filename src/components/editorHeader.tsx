import React, { useState } from "react";
import { Button } from "./ui/button";
import EditCardNameModal from "./editor/editCardNameModal";
import { Pencil } from "lucide-react";
interface EditorHeaderProps {
  headerTitle: string;
  cardTitle: string;
  cardID: string;
  icon?: React.ReactNode;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  headerTitle,
  cardTitle,
  cardID,
  icon,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
    {isModalOpen && <EditCardNameModal cardID={cardID} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={() => Promise.resolve()} />}
    <div className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 py-10 px-5 rounded-md shadow-md">
      <div className="flex items-center gap-2 text-white justify-center">
        <div>{icon}</div>
        <div className="flex flex-row justify-center items-center">
          <h1 className="text-2xl font-semibold">{headerTitle}</h1>

          <div className="relative group bg-white/10 hover:bg-white/20 rounded-md px-2 ml-1 py-1" onClick={() => setIsModalOpen(true)}>
            <h1 className="text-2xl font-semibold text-white underline decoration-2 underline-offset-[3px] ">{cardTitle}</h1>
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-md p-1">
              {/* Replace with your edit icon component */}
              <Pencil className=" w-4 h-4 text-blue-500" />
            </div>
          </div>
  
        </div>
      </div>
    </div></>
  );
};

export default EditorHeader;
