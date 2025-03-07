
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface ClassType {
  id: string;
  name: string;
  description: string;
  intensity: "gentle" | "medium" | "strong";
  suitableFor: string[];
  image?: string;
  benefits?: string[];
  duration?: string;
}

interface ClassCardProps {
  classInfo: ClassType;
  selected: boolean;
  onSelect: () => void;
}

const ClassCard: React.FC<ClassCardProps> = ({ classInfo, selected, onSelect }) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const intensityColors = {
    gentle: "bg-enoia-green",
    medium: "bg-enoia-taupe",
    strong: "bg-enoia-brown",
  };

  return (
    <div
      className={cn(
        "enoia-card p-5 cursor-pointer group transition-all duration-300 overflow-hidden relative",
        selected ? "ring-2 ring-enoia-brown ring-offset-2" : "",
        isHovered ? "translate-y-[-4px]" : ""
      )}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-selected={selected}
    >
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {selected && (
          <div className="flex items-center justify-center bg-enoia-brown text-white rounded-full w-6 h-6 animate-scale-in">
            <Check size={14} />
          </div>
        )}
        
        <Dialog>
          <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
            <button className="flex items-center justify-center bg-enoia-taupe/80 hover:bg-enoia-taupe text-white rounded-full w-6 h-6 transition-colors">
              <Info size={14} />
            </button>
          </DialogTrigger>
          <DialogContent className="enoia-card max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-serif">{t(classInfo.name)}</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {classInfo.duration && (
                  <span className="text-sm font-medium block mt-1 text-enoia-brown">
                    {t("class.duration")}: {classInfo.duration}
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-3">
              <div className="bg-enoia-beige/50 rounded-md p-4">
                <p className="text-base">{t(classInfo.description)}</p>
              </div>
              
              {classInfo.benefits && classInfo.benefits.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">{t("class.benefits")}:</h4>
                  <ul className="space-y-2">
                    {classInfo.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <span className="inline-block h-2 w-2 rounded-full bg-enoia-sage mt-2" />
                        <span>{t(benefit)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{t("class.intensity")}:</span>
                  <span 
                    className={cn(
                      "inline-block h-3 w-3 rounded-full",
                      intensityColors[classInfo.intensity]
                    )}
                  />
                  <span className="text-sm capitalize">{t(`intensity.${classInfo.intensity}`)}</span>
                </div>
                
                <div>
                  <span className="text-sm font-medium block mb-1">{t("class.suitable-for")}:</span>
                  <div className="flex flex-wrap gap-1">
                    {classInfo.suitableFor.map((suitable, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-enoia-beige/80 rounded-full"
                      >
                        {t(suitable)}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-enoia-sand mt-4">
                <Button 
                  className="w-full enoia-button-primary"
                  onClick={() => {
                    onSelect();
                    document.querySelector('[role="dialog"]')?.querySelector('button[aria-label="Close"]')?.click();
                  }}
                >
                  {t("class.select")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div 
        className={cn(
          "w-full h-40 mb-4 rounded-md overflow-hidden bg-enoia-beige",
          isHovered ? "scale-[1.02]" : "scale-100",
          "transition-all duration-500 ease-in-out"
        )}
      >
        {classInfo.image ? (
          <img 
            src={classInfo.image} 
            alt={t(classInfo.name)} 
            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-enoia-beige">
            <span className="text-enoia-brown/40 text-lg font-serif italic">Enoia</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-serif mb-2 transition-colors duration-300 group-hover:text-enoia-brown">
        {t(classInfo.name)}
      </h3>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {t(classInfo.description)}
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1">
          <span className="text-xs">{t("class.intensity")}:</span>
          <span 
            className={cn(
              "inline-block h-2 w-2 rounded-full ml-1",
              intensityColors[classInfo.intensity]
            )}
          />
          <span className="text-xs capitalize ml-1">{t(`intensity.${classInfo.intensity}`)}</span>
        </div>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-1">
        {classInfo.suitableFor.map((suitable, index) => (
          <span 
            key={index} 
            className="text-xs px-2 py-1 bg-enoia-beige/80 rounded-full"
          >
            {t(suitable)}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ClassCard;
