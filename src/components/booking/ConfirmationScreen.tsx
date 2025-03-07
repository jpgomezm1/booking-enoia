
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, CalendarDays, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ClassType } from "./ClassCard";
import { TimeSlotType } from "./TimeSlot";
import { BookingFormData } from "./BookingForm";

interface ConfirmationScreenProps {
  selectedClass: ClassType;
  selectedDate: Date;
  selectedTime: TimeSlotType;
  formData: BookingFormData;
  onReset: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  selectedClass,
  selectedDate,
  selectedTime,
  formData,
  onReset,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                top: `-50px`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                borderRadius: '50%',
                background: `${['#D4DDBF', '#8B7355', '#F5F2EB', '#BFB3A8'][
                  Math.floor(Math.random() * 4)
                ]}`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="w-20 h-20 rounded-full bg-enoia-beige flex items-center justify-center mb-6 animate-breathe">
        <CheckCircle size={40} className="text-enoia-brown" />
      </div>

      <h2 className="text-2xl font-serif mb-2 text-center">Booking Confirmed</h2>
      <p className="text-muted-foreground text-center mb-8">
        We can't wait to move with you at Enoia. Your space is ready.
      </p>

      <div className="enoia-card p-6 w-full max-w-md mb-8">
        <h3 className="text-lg font-serif mb-4 text-center">Booking Details</h3>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 mt-0.5 rounded-full bg-enoia-beige flex items-center justify-center flex-shrink-0">
              <CalendarDays size={14} className="text-enoia-brown" />
            </div>
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-base">{format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 mt-0.5 rounded-full bg-enoia-beige flex items-center justify-center flex-shrink-0">
              <Clock size={14} className="text-enoia-brown" />
            </div>
            <div>
              <p className="text-sm font-medium">Time</p>
              <p className="text-base">{selectedTime.time} with {selectedTime.instructor}</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 mt-0.5 rounded-full bg-enoia-beige flex items-center justify-center flex-shrink-0">
              <span className="text-xs text-enoia-brown font-medium">C</span>
            </div>
            <div>
              <p className="text-sm font-medium">Class</p>
              <p className="text-base">{selectedClass.name}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Intensity: <span className="capitalize">{selectedClass.intensity}</span>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 mt-0.5 rounded-full bg-enoia-beige flex items-center justify-center flex-shrink-0">
              <User size={14} className="text-enoia-brown" />
            </div>
            <div>
              <p className="text-sm font-medium">Client</p>
              <p className="text-base">{formData.firstName} {formData.lastName}</p>
              <p className="text-sm text-muted-foreground">{formData.email}</p>
              {formData.phone && (
                <p className="text-sm text-muted-foreground">{formData.phone}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-muted-foreground text-center mb-6 max-w-md">
        <p>
          A confirmation email has been sent to {formData.email}. Please arrive 15 minutes before class starts.
        </p>
      </div>

      <Button 
        onClick={onReset} 
        className="enoia-button-secondary"
      >
        Book Another Class
      </Button>
    </div>
  );
};

export default ConfirmationScreen;
