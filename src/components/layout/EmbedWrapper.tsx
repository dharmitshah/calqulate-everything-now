
import React from "react";
import { useSearchParams } from "react-router-dom";

interface EmbedWrapperProps {
  children: React.ReactNode;
}

export const EmbedWrapper: React.FC<EmbedWrapperProps> = ({ children }) => {
  const [searchParams] = useSearchParams();
  const isEmbedded = searchParams.get("embed") === "true";
  
  if (isEmbedded) {
    return (
      <div className="embed-container p-4">
        {children}
        <div className="text-xs text-right mt-4 text-gray-500">
          <a 
            href="https://stat1pet.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Calculator by Stat1pet
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <>
      {children}
    </>
  );
};
