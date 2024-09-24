"use client";
import { useEffect, useState, RefObject, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { addCard } from "@/actions/add-card";
import { Card } from "@prisma/client";
import { getCards } from "@/actions/get-user-cards";
import Table from "@/components/ui/table";
import CardModal from "../editor/card-modal";
import { Trash2, Plus, QrCode } from "lucide-react";
import { deleteCard } from "@/actions/delete-card";
import { QRCodeSVG } from "qrcode.react";
import Tooltip from "../ui/tooltip";
// Update the SessionType to include id
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
      // Add other fields as necessary
    };
    await addCard(starterValues);
    // Optionally, refresh the cards after adding
    const result = await getCards();
    if ("cards" in result) {
      setCards(result.cards ?? []);
    }
  };

  const downloadQRCode = (svgRef: RefObject<SVGSVGElement>, fileName: string): void => {
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
  const buttonTableColumns = [
    { col1: "Card Name", col2: "Y", col3: "Default" },
  ];
  const tableData: { prop: string; type: string; default: JSX.Element }[] =
    cards.map((card) => ({
      prop: card.title,
      type: card.updatedAt.toLocaleDateString("en-US", {
        // Modify date format
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric", // Add this line
        minute: "numeric", // Add this line
        hour12: true, // Keep this line
      }),
      default: (
        <div className="flex items-center gap-x-2">
          <Link href={`/card/${card.id}`}>
            <Button variant="outline" size="sm">
              View
            </Button>
          </Link>
          <Link href={`/editor/${card.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await deleteCard(card.id); // Wait for the deleteCard function to complete
              window.location.reload(); // Reload the page
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Tooltip
            text={<QRCodeSVG ref={qrSVGRef} value={`http://localhost:3000/card/${card.id}`} />}
            children={
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  downloadQRCode(qrSVGRef, `http://localhost:3000/card/${card.id}`)
                }}
              >
                <QrCode className="w-4 h-4" />
              </Button>
            }
            className="z-50"
          ></Tooltip>
        </div>
      ),
    }));

  return (
    <div>
      Dashboard
      <div className="flex w-max justify-between items-center">
        <h1 className="text-2xl font-bold">
          Welcome Back, {session?.user?.name}.
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="flex gap-2"
        >
          <Plus className="w-4 h-4 " />
          Add Card
        </Button>
      </div>
      <CardModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          window.location.reload();
        }}
        onSubmit={handleAddCard}
      />
      <div className="flex flex-col gap-2">
        <h1>Your Cards</h1>
        {error && <p>Error: {error}</p>}
        <Table data={tableData} columns={buttonTableColumns} />
      </div>
    </div>
  );
};

export default ClientDashboard;
