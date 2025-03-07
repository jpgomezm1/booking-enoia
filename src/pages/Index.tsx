
import { useState } from "react";
import LanguageToggle from "@/components/ui/LanguageToggle";
import BookingWizard from "@/components/booking/BookingWizard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-enoia-beige to-enoia-cream relative overflow-hidden">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>
      
      {/* Main Content */}
      <main>
        <BookingWizard />
      </main>
    </div>
  );
};

export default Index;
