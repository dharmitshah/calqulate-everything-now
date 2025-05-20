
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const EmbedCodeButton: React.FC = () => {
  return (
    <Link to="/embed-code">
      <Button variant="outline" size="sm" className="text-xs">
        Embed this calculator
      </Button>
    </Link>
  );
};
