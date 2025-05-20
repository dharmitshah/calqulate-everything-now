
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterSubscribers } from "@/components/admin/NewsletterSubscribers";

const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
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
