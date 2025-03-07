
import LanguageToggle from "@/components/ui/LanguageToggle";
import BookingWizard from "@/components/booking/BookingWizard";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
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
    </LanguageProvider>
  );
};

export default Index;
