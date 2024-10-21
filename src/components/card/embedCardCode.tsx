"use client";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy } from "lucide-react";
import Tooltip from "@/components/ui/tooltip";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
interface EmbedCardCodeProps {
  githubFileUrl: string;
}

const EmbedCardCode: React.FC<EmbedCardCodeProps> = ({
  githubFileUrl,
}) => {
  const [code, setCode] = useState("");
  const embedCode = `<iframe 
  src="https://google.com" 
  width="600" 
  height="400" 
  frameborder="0" 
  allowfullscreen>
</iframe>`;

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(code)
        .then(() => {
          setIsCopied(true);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setIsCopied(true);
      } catch (err) {
        console.error("Fallback: Failed to copy: ", err);
      }
      document.body.removeChild(textarea);
    }
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(githubFileUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); 
        }
        setCode(embedCode);
      } catch (error) {
        console.error("Error fetching code: ", error);
      }
    };
    fetchCode();
  }, [githubFileUrl, embedCode]);

  const [isCopied, setIsCopied] = useState(false);
  return (
    <div className="">
      <div className="">
        <Tooltip
          text={isCopied ? "Copied!" : "Copy to clipboard"}
          position="left"
          className="absolute top-3.5 right-10"
        >
          <Button
            onClick={copyToClipboard}
            className="absolute top-3 right-3 md:right-3 stroke-white"
            variant="ghost"
            size="default"
          >
            <Copy className="w-3 h-3" />
          </Button>
        </Tooltip>
      </div>

      <SyntaxHighlighter
        language="tsx"
        style={atomDark}
        customStyle={{
          color: "#ffffff",
          background: "#1e293b",
          fontFamily: '"Fira Code", "Fira Mono", monospace',
          fontSize: "0.8rem",
          padding: "0px",
          paddingTop: "10px",
          paddingBottom: "10px",
          height: "100%",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "",
          overflowY: "auto",
          lineHeight: "1",
          maxHeight: "50vh",
        }}
        className="overflow-x-auto w-full"
        wrapLines={true}
        showLineNumbers={true}
        lineNumberStyle={{
          color: "#888",
          backgroundColor: "#1e293b",
          fontSize: "0.8rem",
          paddingRight: "10px",
          paddingLeft: "20px",
        }}
        lineProps={{
          style: { wordBreak: "normal", whiteSpace: "pre" },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default EmbedCardCode;
