"use client";
import { useEffect, useState, RefObject } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addCard } from "@/actions/add-card";
import { PersonalCard } from "@prisma/client";
import { getCards } from "@/actions/get-user-cards";
import CardModal from "../editor/card-modal";
import {
  Trash2,
  Plus,
  Share2,
  PencilRuler,
  EllipsisVertical,
  Eye,
} from "lucide-react";
import { deleteCard } from "@/actions/delete-card";
import DisplayCard from "../dashboard/display-card";
import QRModal from "../card/card-qr-modal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "next-auth/react";

const ClientDashboard = () => {
  const { data: session, status } = useSession();
  const [cards, setCards] = useState<PersonalCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  useEffect(() => {
    const fetchCards = async () => {
      const result = await getCards();
      if ("cards" in result) {
        setCards(result.cards ?? []);
      } else {
        console.error(result.error);
        setError(result.error);
      }
    };

    fetchCards();
  }, []);

  console.log(cards);
  const starterValues = {
    userId: session?.user?.id || "",
    title: "",
    description: "",
    image: "",
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    youtube: "",
    twitch: "",
    discord: "",
    snapchat: "",
    whatsapp: "",
    telegram: "",
    reddit: "",
    pinterest: "",
  };

  const handleAddCard = async (data: any) => {
    const starterValues = {
      userId: session?.user?.id || "",
      cardTitle: data.cardTitle || "", // Ensure this is correctly referenced
      cardStyle: data.cardStyle || "", // Provide a default value if necessary
      name: data.name || "Untitled Card", // Provide a default value if necessary
    };

    // Call your addCard function with starterValues
    await addCard(starterValues);
    // const result = await getCards();
    // if ("cards" in result) {
    //   setCards(result.cards ?? []);
    // }
  };

  if (!session) return <div>Loading...</div>;

  return (
    <div className=" h-max pt-8 px-10 bg-gray-100">
      <CardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onSubmit={handleAddCard}
      />
      {cards.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card) => {
              console.log("Card Title:", card.cardTitle);
              return (
                <div key={card.id}>
                  <DisplayCard
                    cardID={card.id}
                    cardTitle={card.cardTitle}
                    cardDescription={card.name}
                    dateUpdated={card.updatedAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    children={
                      <div className="">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm">
                              <EllipsisVertical className="w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                              {card.cardTitle}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                              <Link href={`/card/${card.id}`} target="_blank">
                                <DropdownMenuItem>
                                  <span>View Card</span>
                                  <DropdownMenuShortcut>
                                    <Eye className="w-4 h-4" />
                                  </DropdownMenuShortcut>
                                </DropdownMenuItem>
                              </Link>
                              <Link href={`/editor/${card.id}`}>
                                <DropdownMenuItem>
                                  <span>Edit</span>
                                  <DropdownMenuShortcut>
                                    <PencilRuler className="w-4 h-4" />
                                  </DropdownMenuShortcut>
                                </DropdownMenuItem>
                              </Link>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentCardId(card.id);
                                  setIsQRModalOpen(true);
                                }}
                              >
                                <span>Share</span>
                                <DropdownMenuShortcut>
                                  <Share2 className="w-4 h-4" />
                                </DropdownMenuShortcut>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={async () => {
                                  await deleteCard(card.id);
                                  window.location.reload();
                                }}
                              >
                                <span className="text-destructive">Delete</span>
                                <DropdownMenuShortcut>
                                  <Trash2 className="w-4 h-4 stroke-destructive" />
                                </DropdownMenuShortcut>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    }
                  />
                </div>
              );
            })}
            <div
              className="flex flex-col justify-center items-center bg-white w-full h-64 shadow-md border border-gray-300 hover:border-blue-800 transition-colors duration-300 rounded-lg overflow-hidden text-black p-6 group"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="flex flex-col items-center gap-4">
                <svg
                  className="w-12 h-12 text-gray-400 group-hover:text-blue-800 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
                <p className="text-gray-600 text-lg">Add more cards</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center bg-white w-full h-64 shadow-md border border-gray-300 hover:border-blue-800 transition-colors duration-300 rounded-lg overflow-hidden text-black p-6 group"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex flex-col items-center gap-4">
            <svg
              className="w-12 h-12 text-gray-400 group-hover:text-blue-800 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            <p className="text-gray-600 text-lg">No cards added yet</p>
            <p className="text-gray-500 text-sm">
              Get started by adding your first card.
            </p>
          </div>
        </div>
      )}
      {isQRModalOpen && (
        <QRModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          cardId={currentCardId || ""}
        />
      )}
    </div>
  );
};

export default ClientDashboard;
