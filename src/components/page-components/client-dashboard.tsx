"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DigiMeCard } from "@prisma/client";
import { getCards } from "@/actions/get-user-cards";
import CardModal from "../editor/card-modal";
import {
  Trash2,
  Share2,
  PencilRuler,
  EllipsisVertical,
  Eye,
  Send,
} from "lucide-react";
import { deleteCard } from "@/actions/delete-card";
import DisplayCard from "../dashboard/display-card";
import ShareModal from "../card/card-qr-modal";

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
import { GridLoader } from "react-spinners";
import PublishCardModal from "../editor/publishCard";
import { CardData } from "@/types/cardTypes";
const ClientDashboard = () => {
  const { data: session } = useSession();
  const [cards, setCards] = useState<DigiMeCard[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const [publishModalCardId, setPublishModalCardId] = useState<string | null>(null);


  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const result = await getCards();
      if ("cards" in result) {
        setCards(result.cards ?? []);
      } else {
        console.error(result.error);
        setError(result.error);
      }
      setLoading(false);
    };

    fetchCards();
  }, []);

  if (error) return <div>{error}</div>; 
  if (!session) return <div>Loading...</div>;
  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-max pt-[30vh] gap-4">
        <GridLoader color="#3b82f6" />
        <h1 className="text-gray-500">Loading Cards...</h1>
      </div>
    );
  return (
    <div className="">
      <CardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />

      {cards.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards
              .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
              .map((card) => {
                return (
                  <>
                    <div key={card.id} className="flex flex-col h-full">
                      {publishModalCardId === card.id && (
                        <PublishCardModal
                          cardID={card.id}
                          cardTitle={card.cardTitle}
                          isOpen={publishModalCardId === card.id}
                          onClose={() => setPublishModalCardId(null)}
                          isPublished={card.isPublished}
                        />
                      )}
                      <DisplayCard
                        cardID={card.id}
                        cardTitle={card.cardTitle}
                        isPublished={card.isPublished}
                        formValues={{ cardData: card.cardData as unknown as CardData }}
                        dateUpdated={card.updatedAt.toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          }
                        )}
                      >
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
                                  {card.isPublished && (
                                    <Link
                                      href={`/card/${card.id}`}
                                      target="_blank"
                                    >
                                      <DropdownMenuItem>
                                        <span>View Card</span>
                                        <DropdownMenuShortcut>
                                          <Eye className="w-4 h-4" />
                                        </DropdownMenuShortcut>
                                      </DropdownMenuItem>
                                    </Link>
                                  )}
                                  {card.isPublished === false && (
                                    <Link
                                      href={`/preview/${card.id}`}
                                    >
                                      <DropdownMenuItem>
                                        <span>Preview Card</span>
                                        <DropdownMenuShortcut>
                                          <Eye className="w-4 h-4" />
                                        </DropdownMenuShortcut>
                                      </DropdownMenuItem>
                                    </Link>
                                  )}

                                  <Link href={`/editor/${card.id}`}>
                                    <DropdownMenuItem>
                                      <span>Edit</span>
                                      <DropdownMenuShortcut>
                                        <PencilRuler className="w-4 h-4" />
                                      </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                  </Link>
                                  {card.isPublished && (
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
                                  )}
                                  {!card.isPublished && (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setCurrentCardId(card.id);
                                        setPublishModalCardId(card.id);
                                      }}
                                    >
                                      <span className="text-green-600">
                                        Publish
                                      </span>
                                      <DropdownMenuShortcut>
                                        <Share2 className="w-4 h-4 text-green-600" />
                                      </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                  )}
                                  {card.isPublished && (
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setCurrentCardId(card.id);
                                        setPublishModalCardId(card.id);
                                      }}
                                    >
                                      <span className="text-destructive">
                                        Unpublish
                                      </span>
                                      <DropdownMenuShortcut>
                                        <Send className="w-4 h-4 text-destructive" />
                                      </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={async () => {
                                      await deleteCard(card.id);
                                      window.location.reload();
                                    }}
                                  >
                                    <span className="text-destructive">
                                      Delete
                                    </span>
                                    <DropdownMenuShortcut>
                                      <Trash2 className="w-4 h-4 stroke-destructive" />
                                    </DropdownMenuShortcut>
                                  </DropdownMenuItem>
                                </DropdownMenuGroup>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </DisplayCard>
                    </div>
                  </>
                );
              })}
            <div
              className="flex flex-col justify-center items-center bg-white w-full h-64 outline outline-1 outline-gray-300 shadow-md border-2 border-transparent rounded-lg overflow-hidden text-black p-6 group hover:scale-[1.02] transition-all duration-300"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="flex flex-col items-center gap-4">
                <svg
                  className="w-12 h-12 group-hover:text-blue-800 transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v16m8-8H4"
                    stroke="url(#gradient)"
                  ></path>
                </svg>
                <p className="text-gray-600 text-lg">Add more cards</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center bg-white w-full h-64 shadow-md border-2 border-transparent rounded-lg overflow-hidden text-black p-6 group hover:scale-[1.02] transition-all duration-300"
          style={{
            background:
              "linear-gradient(white, white), linear-gradient(to right, #3b82f6, #8b5cf6)",
            backgroundClip: "padding-box, border-box",
            borderImage: "linear-gradient(to right, #3b82f6, #8b5cf6) 1",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <div className="flex flex-col items-center gap-4">
            <svg
              className="w-12 h-12 group-hover:text-blue-800 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
                  />
                </linearGradient>
              </defs>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
                stroke="url(#gradient)"
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
        <ShareModal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          cardId={currentCardId || ""}
        />
      )}
    </div>
  );
};

export default ClientDashboard;
