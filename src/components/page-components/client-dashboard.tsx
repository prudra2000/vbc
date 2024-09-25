"use client";
import { useEffect, useState, RefObject, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addCard } from "@/actions/add-card";
import { Card } from "@prisma/client";
import { getCards } from "@/actions/get-user-cards";
import Table from "@/components/ui/table";
import CardModal from "../editor/card-modal";
import {
  Trash2,
  Plus,
  Share2,
  PencilRuler,
  QrCode,
  EllipsisVertical,
  Eye,
} from "lucide-react";
import { deleteCard } from "@/actions/delete-card";
import { QRCodeSVG } from "qrcode.react";
import Tooltip from "../ui/tooltip";
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

type SessionType = {
  user?: {
    name?: string;
    id?: string; // Add this line
  };
};

const ClientDashboard = () => {
  const qrSVGRef = useRef<SVGSVGElement>(null);
  // Update the useState hook with the correct type
  const [session, setSession] = useState<SessionType | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [isQRModalOpen, setIsQRModalOpen] = useState(false); // State for QRModal visibility
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  useEffect(() => {
    const fetchSession = async () => {
      // Replace this with your actual method to fetch the session
      const response = await fetch("/api/auth/session");
      const sessionData = await response.json();
      setSession(sessionData);
    };
    const fetchCards = async () => {
      const result = await getCards();
      if ("cards" in result) {
        setCards(result.cards ?? []);
      } else {
        console.error(result.error);
        setError(result.error);
      }
    };

    fetchSession();
    fetchCards();
  }, []);

  console.log(cards);
  // Update the starterValues
  const starterValues = {
    userId: session?.user?.id || "", // Add this line
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
      title: data.title,
      description: data.description,
      style: data.style,
    };
    await addCard(starterValues);
    const result = await getCards();
    if ("cards" in result) {
      setCards(result.cards ?? []);
    }
  };

  const downloadQRCode = (
    svgRef: RefObject<SVGSVGElement>,
    fileName: string
  ): void => {
    const svg = svgRef.current;
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `vbc_qr.png`;
        a.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
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
              console.log("Card Title:", card.title);
              return (
                <div key={card.id}>
                  <DisplayCard
                    cardID={card.id}
                    cardTitle={card.title}
                    cardDescription={card.description}
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
                            <DropdownMenuLabel>{card.title}</DropdownMenuLabel>
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
          className="flex flex-col justify-center items-center bg-white w-full h-64 shadow-md border border-gray-300 rounded-lg overflow-hidden text-black p-6"
        >
          <div className="flex flex-col items-center gap-4">
            <svg
              className="w-12 h-12 text-gray-400"
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
            <p className="text-gray-500 text-sm">Get started by adding more cards.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="flex gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Card
            </Button>
          </div>
        </div>
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col justify-center items-center bg-white w-full h-64 shadow-md border border-gray-300 rounded-lg overflow-hidden text-black p-6"
        >
          <div className="flex flex-col items-center gap-4">
            <svg
              className="w-12 h-12 text-gray-400"
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
            <p className="text-gray-500 text-sm">Get started by adding your first card.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="flex gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Card
            </Button>
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
