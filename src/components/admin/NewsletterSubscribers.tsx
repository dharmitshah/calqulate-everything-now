
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail } from "lucide-react";

export const NewsletterSubscribers = () => {
  const [subscribers, setSubscribers] = useState<string[]>([]);

  useEffect(() => {
    // Load subscribers from localStorage
    try {
      const subscribersJSON = localStorage.getItem("newsletterSubscribers");
      if (subscribersJSON) {
        setSubscribers(JSON.parse(subscribersJSON));
      }
    } catch (error) {
      console.error("Error loading subscribers:", error);
    }
  }, []);

  const handleCopyToClipboard = () => {
    if (subscribers.length === 0) {
      toast.info("No subscribers to copy");
      return;
    }

    const emailsText = subscribers.join("\n");
    navigator.clipboard.writeText(emailsText)
      .then(() => toast.success("Emails copied to clipboard"))
      .catch(() => toast.error("Failed to copy emails"));
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      toast.info("No subscribers to export");
      return;
    }

    // Create CSV content
    const csvContent = "Email\n" + subscribers.join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "newsletter_subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 border rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Mail className="mr-2" />
          Newsletter Subscribers ({subscribers.length})
        </h2>
        <div className="flex gap-2">
          <Button onClick={handleCopyToClipboard} variant="outline" size="sm">
            Copy All
          </Button>
          <Button onClick={handleExportCSV} variant="outline" size="sm">
            Export CSV
          </Button>
        </div>
      </div>

      {subscribers.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No subscribers yet</p>
      ) : (
        <Textarea 
          className="h-60" 
          value={subscribers.join("\n")} 
          readOnly 
        />
      )}
    </div>
  );
};
