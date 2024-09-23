import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDraggable
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/components/SortableItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faX } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faTwitter,
  faInstagram,
  faFacebook,
  faTiktok,
  faYoutube,
  faTwitch,
  faDiscord,
  faSnapchat,
  faWhatsapp,
  faTelegram,
  faReddit,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

const socialIcons = {
  linkedin: faLinkedin,
  github: faGithub,
  twitter: faTwitter,
  instagram: faInstagram,
  facebook: faFacebook,
  tiktok: faTiktok,
  youtube: faYoutube,
  twitch: faTwitch,
  discord: faDiscord,
  snapchat: faSnapchat,
  whatsapp: faWhatsapp,
  telegram: faTelegram,
  reddit: faReddit,
  pinterest: faPinterest,
};

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
  const removeInput = (social: string) => {
    // Remove the social input from the selectedInputs array
    setSelectedInputs((prev) => prev.filter((input) => input !== social));
    
    // Remove the corresponding URL from the urls object
    setUrls((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [social]: _, ...rest } = prev;
      return rest;
    });
  };

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
    <DndContext
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
            <SortableItem key={social} id={social}>
              <div className="flex flex-row gap-2 group">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faGripVertical}
                    className=" w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  />
                  <FontAwesomeIcon
                    icon={socialIcons[social as keyof typeof socialIcons]}
                    className=" w-4 h-4"
                  />
                </div>
                <Input
                  placeholder={social.charAt(0).toUpperCase() + social.slice(1)}
                  value={urls[social]}
                  onChange={(e) =>
                    setUrls((prev) => ({ ...prev, [social]: e.target.value }))
                  }
                />
              </div>
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
    </div>
  );
};

export default SocialInputs;
