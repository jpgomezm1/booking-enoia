
import LanguageToggle from "@/components/ui/LanguageToggle";
import WelcomeMessage from "@/components/ui/WelcomeMessage";
import BookingWizard from "@/components/booking/BookingWizard";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-enoia-beige to-enoia-cream relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="organic-blob w-96 h-96 top-[-10%] left-[-15%] animate-float opacity-30" 
               style={{ animationDelay: "0s" }} />
          <div className="organic-blob w-80 h-80 bottom-[-5%] right-[-10%] animate-float opacity-30" 
               style={{ animationDelay: "2s" }} />
          <div className="organic-blob w-64 h-64 top-[30%] right-[-20%] animate-float opacity-20" 
               style={{ animationDelay: "4s" }} />
          <div className="organic-blob w-72 h-72 bottom-[20%] left-[-10%] animate-float opacity-25" 
               style={{ animationDelay: "6s" }} />
        </div>
        
        {/* Language Toggle */}
        <div className="absolute top-4 right-4 z-20">
          <LanguageToggle className="hover:bg-white/50 backdrop-blur-sm" />
        </div>
        
        {/* Welcome Message */}
        <WelcomeMessage />
        
        {/* Main Content */}
        <main className="relative z-10">
          <BookingWizard />
        </main>
        
        {/* Toaster for notifications */}
        <Toaster />
      </div>
    </LanguageProvider>
  );
};

export default Index;
