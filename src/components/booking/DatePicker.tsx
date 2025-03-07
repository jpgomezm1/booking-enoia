
import { useState } from "react";
import { format, isToday, isAfter, isBefore, addDays } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLanguage } from "@/contexts/LanguageContext";

interface DatePickerProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ date, onDateChange }) => {
  const { t } = useLanguage();
  const [calendarOpen, setCalendarOpen] = useState(false);
  
  const today = new Date();
  const tomorrow = addDays(today, 1);
  const dayAfterTomorrow = addDays(today, 2);

  const quickDates = [today, tomorrow, dayAfterTomorrow];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-serif">{t("date.select")}</h3>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="enoia-button-outline inline-flex items-center"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>{t("date.pick-a-date")}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm border border-enoia-sand" align="center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={onDateChange}
              initialFocus
              disabled={(date) => isBefore(date, today)}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {quickDates.map((quickDate, index) => (
          <Button
            key={index}
            variant="outline"
            className={cn(
              "enoia-card h-24 flex flex-col items-center justify-center space-y-1 p-2 hover:bg-enoia-beige/50",
              date && isToday(date) && isToday(quickDate) ? "ring-2 ring-enoia-brown ring-offset-2" : "",
              date && !isToday(date) && !isToday(quickDate) && 
              date.getDate() === quickDate.getDate() && 
              date.getMonth() === quickDate.getMonth() && 
              date.getFullYear() === quickDate.getFullYear() ? "ring-2 ring-enoia-brown ring-offset-2" : ""
            )}
            onClick={() => onDateChange(quickDate)}
          >
            <span className="text-sm font-medium">
              {isToday(quickDate) ? t("date.today") : format(quickDate, "EEEE")}
            </span>
            <span className="text-2xl font-serif">{format(quickDate, "d")}</span>
            <span className="text-xs text-muted-foreground">{format(quickDate, "MMMM")}</span>
          </Button>
        ))}
      </div>

      <div className="mt-6 flex justify-center items-center space-x-1 text-muted-foreground">
        <CalendarIcon className="h-3 w-3 opacity-70" />
        <span className="text-xs">{t("date.classes-available")}</span>
      </div>
    </div>
  );
};

export default DatePicker;
