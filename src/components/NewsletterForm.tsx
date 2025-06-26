
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Save } from "lucide-react";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Save email to localStorage
    try {
      // Get existing subscribers
      const existingSubscribersJSON = localStorage.getItem("newsletterSubscribers");
      let subscribers = existingSubscribersJSON ? JSON.parse(existingSubscribersJSON) : [];
      
      // Check if email already exists
      if (subscribers.includes(email)) {
        toast.info("You're already subscribed!");
        setIsLoading(false);
        return;
      }
      
      // Add new email and save back to localStorage
      subscribers.push(email);
      localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers));
      
      // Show success message
      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Newsletter subscription error:", error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubscribe} className="space-y-2">
        <Label htmlFor="email-newsletter" className="text-sm font-medium mb-2">
          Subscribe to our newsletter
        </Label>
        <div className="flex space-x-2">
          <Input
            id="email-newsletter"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow"
            disabled={isLoading}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              "Subscribing..."
            ) : (
              <>
                <Save size={18} />
                <span className="ml-1">Subscribe</span>
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Get the latest calculator updates and tips delivered to your inbox.
        </p>
      </form>
    </div>
  );
};
