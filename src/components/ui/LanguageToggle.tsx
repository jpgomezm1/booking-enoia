
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={cn(
        "text-xs font-medium tracking-wider hover:bg-transparent hover:text-enoia-brown/80 transition-colors",
        className
      )}
    >
      {language === "en" ? "ES" : "EN"}
    </Button>
  );
};

export default LanguageToggle;
