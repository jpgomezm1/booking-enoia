
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeMessageProps {
  className?: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ className }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Auto-hide the welcome message after 8 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={cn(
            "fixed inset-x-0 top-16 z-50 mx-auto max-w-md px-4",
            className
          )}
        >
          <div className="relative overflow-hidden rounded-lg bg-white/95 px-6 py-8 shadow-lg backdrop-blur-sm border border-enoia-sand">
            <button
              onClick={handleClose}
              className="absolute right-3 top-3 rounded-full p-1 text-enoia-taupe hover:bg-enoia-beige hover:text-enoia-brown transition-colors"
            >
              <X size={18} />
            </button>
            
            <h2 className="mb-3 text-center text-2xl font-serif text-enoia-brown">
              {t("welcome.title")}
            </h2>
            
            <p className="text-center text-sm leading-relaxed text-foreground">
              {t("welcome.message")}
            </p>
            
            <div className="mt-5 flex justify-center">
              <button 
                onClick={handleClose}
                className="enoia-button-primary text-xs px-6 py-2"
              >
                {t("welcome.button")}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeMessage;
