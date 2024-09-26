"use client";
import { useEffect, useState, RefObject, useRef } from "react";
import React from "react";
import { X, Download, Copy } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Input } from "../ui/input";

interface QRModalProps {
  cardId: string;
  onClose: () => void;
  isOpen: boolean;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, cardId }) => {
  const svgRef = useRef<SVGSVGElement>(null);
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

  const inputRef = useRef<HTMLInputElement>(null);

  const handleCopy = () => {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 w-96 text-black border border-1 border-gray-300 gap-4 modal-enter">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Share Card</h2>
          <span
            className="close text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={onClose}
          >
            <X />
          </span>
        </div>
        <hr />
        <div className="flex flex-col justify-center gap-2">
          <h2 className="text-base">Share link via:</h2>
          <div className="flex gap-2 justify-center items-center">
            <Button
              className="rounded-full w-14 h-14 border-[#1877F2] hover:bg-[#1877F2]/10"
              variant="outline"
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/card/${cardId}`, '_blank')}
            >
              <FontAwesomeIcon icon={faFacebookF} className="w-5 h-5 " style={{ color: '#1877F2' }} />
            </Button>
            <Button
              className="rounded-full w-14 h-14 border-[#000000] hover:bg-[#000000]/10"
              variant="outline"
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=http://localhost:3000/card/${cardId}`, '_blank')}
            >
              <FontAwesomeIcon icon={faXTwitter} className="w-5 h-5" style={{ color: '#000000' }} />
            </Button>
            <Button
              className="rounded-full w-14 h-14 border-[#E1306C] hover:bg-[#E1306C]/10"
              variant="outline"
              onClick={() => alert('Instagram does not support direct URL sharing.')}
            >
              <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" style={{ color: '#E1306C' }} />
            </Button>
            <Button
              className="rounded-full w-14 h-14 border-[#25D366] hover:bg-[#25D366]/10"
              variant="outline"
              onClick={() => window.open(`https://api.whatsapp.com/send?text=http://localhost:3000/card/${cardId}`, '_blank')}
            >
              <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5"  style={{ color: '#25D366' }} />
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <h2 className="text-base">Download QR Code:</h2>
          <div className="relative group">
            <div className="flex bg-white w-min p-2 rounded-md justify-center items-center mx-auto">
              <QRCodeSVG
                value={`http://localhost:3000/card/${cardId}`}
                ref={svgRef}
              />
            </div>
            <div className="absolute w-min top-1/2 left-1/2 h-10 transform -translate-x-1/2 -translate-y-1/2 opacity-0 bg-white/10 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                className="bg-black rounded-full w-14 h-14 "
                onClick={() => downloadQRCode(svgRef, "vbc_qr.png")}
              >
                <Download />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <h2 className="text-base">Copy Link:</h2>
          <div className="flex gap-2 justify-center items-center">
            <Input
              value={`http://localhost:3000/card/${cardId}`}
              readOnly
              ref={inputRef}
            />
            <Button variant="outline" onClick={handleCopy}>
              <Copy className="w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
