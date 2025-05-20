
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterSubscribers } from "@/components/admin/NewsletterSubscribers";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AdminPage = () => {
  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
          
          <div className="space-y-8">
            <NewsletterSubscribers />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminPage;
