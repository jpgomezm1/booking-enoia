
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { GlobeIcon } from "lucide-react";

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={cn(
        "rounded-full px-4 text-xs font-medium tracking-wider hover:bg-white/50 backdrop-blur-sm border-enoia-sand transition-colors",
        className
      )}
    >
      <GlobeIcon className="h-3.5 w-3.5 mr-1.5 opacity-80" />
      {language === "en" ? "Español" : "English"}
    </Button>
  );
};

export default LanguageToggle;
