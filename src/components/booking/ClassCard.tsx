
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface ClassType {
  id: string;
  name: string;
  description: string;
  intensity: "gentle" | "medium" | "strong";
  suitableFor: string[];
  image?: string;
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
        "enoia-card p-5 cursor-pointer group transition-all duration-300 overflow-hidden",
        selected ? "ring-2 ring-enoia-brown ring-offset-2" : "",
        isHovered ? "translate-y-[-4px]" : ""
      )}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-selected={selected}
    >
      <div className="absolute top-2 right-2">
        {selected && (
          <div className="flex items-center justify-center bg-enoia-brown text-white rounded-full w-6 h-6 animate-scale-in">
            <Check size={14} />
          </div>
        )}
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
