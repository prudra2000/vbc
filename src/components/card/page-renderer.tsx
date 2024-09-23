import Image from "next/image";
import React from "react";

interface PageProps {
  formValues: {
    title: string;
    description: string;
    image: string;
  };
  style?: string;
}

export const Page: React.FC<PageProps> = ({ style, formValues }) => {
  return (
    <div>

      <section>
        <p>{formValues.title || "No title provided"}</p>
        <p>{formValues.description || "No title provided"}</p>
      </section>
    </div>
  );
};
