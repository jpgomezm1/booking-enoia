
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

export interface TimeSlotType {
  id: string;
  time: string;
  availableSpots: number;
  instructor: string;
}

interface TimeSlotProps {
  slot: TimeSlotType;
  selected: boolean;
  onSelect: () => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ slot, selected, onSelect }) => {
  const isAlmostFull = slot.availableSpots <= 3 && slot.availableSpots > 0;
  const isFull = slot.availableSpots === 0;

  return (
    <div
      className={cn(
        "enoia-card p-4 cursor-pointer transition-all duration-300 hover:translate-y-[-2px]",
        selected ? "ring-2 ring-enoia-brown ring-offset-2" : "",
        isFull ? "opacity-60 pointer-events-none" : ""
      )}
      onClick={onSelect}
      aria-selected={selected}
      aria-disabled={isFull}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-enoia-brown/70 mr-2" />
          <span className="font-medium">{slot.time}</span>
        </div>
        <div className="text-xs">
          {isFull ? (
            <span className="text-destructive">Full</span>
          ) : isAlmostFull ? (
            <span className="text-enoia-brown animate-pulse-soft">{slot.availableSpots} spots left</span>
          ) : (
            <span className="text-muted-foreground">{slot.availableSpots} available</span>
          )}
        </div>
      </div>
      <div className="mt-2 text-xs text-muted-foreground">
        Instructor: <span className="font-medium text-foreground">{slot.instructor}</span>
      </div>
    </div>
  );
};

export default TimeSlot;
