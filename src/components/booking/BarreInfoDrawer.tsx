
import React from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Info, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type BarreInfoDrawerProps = {
  className?: string;
};

const BarreInfoDrawer: React.FC<BarreInfoDrawerProps> = ({ className }) => {
  const { t } = useLanguage();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className={`enoia-button-outline flex items-center gap-2 ${className}`}>
          <Info size={18} />
          <span>{t("barre.what-is-title")}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white p-4 rounded-t-xl border-t border-enoia-sand">
        <div className="mx-auto w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-serif text-enoia-brown">{t("barre.what-is-title")}</h2>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X size={20} />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>
          
          <div className="space-y-6">
            <p className="text-sm">{t("barre.what-is-description")}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-md p-4 bg-enoia-beige/50">
                <h3 className="text-lg font-serif mb-2">{t("barre.benefits-title")}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((num) => (
                    <li key={num} className="flex items-start gap-2 text-sm">
                      <span className="inline-block h-2 w-2 rounded-full bg-enoia-sage mt-2" />
                      <span>{t(`barre.benefit-${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="rounded-md p-4 bg-enoia-beige/50">
                <h3 className="text-lg font-serif mb-2">{t("barre.for-who-title")}</h3>
                <p className="text-sm mb-2">{t("barre.for-who-description")}</p>
                <p className="text-sm italic">{t("barre.no-experience")}</p>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BarreInfoDrawer;
