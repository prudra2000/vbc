"use client";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic
import React from "react";
import {
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/components/SortableItem";

// Dynamic import for DndContext
const DndContextWithNoSSR = dynamic(
  () => import("@dnd-kit/core").then((mod) => mod.DndContext),
  { ssr: false }
);

const SocialInputs: React.FC<{
  selectedInputs: string[];
  urls: Record<string, string>;
  setUrls: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setSelectedInputs: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ selectedInputs, urls, setUrls, setSelectedInputs }) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSelectedInputs((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over?.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div>
      <DndContextWithNoSSR
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={selectedInputs}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {selectedInputs.map((social) => (
              <SortableItem
                key={social}
                id={social}
                social={social}
                urls={urls}
                setUrls={setUrls}
              />
            ))}
          </div>
        </SortableContext>
      </DndContextWithNoSSR>
    </div>
  );
};

export default SocialInputs;