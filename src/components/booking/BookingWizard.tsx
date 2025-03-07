
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ClassCard, { ClassType } from "./ClassCard";
import DatePicker from "./DatePicker";
import TimeSlot, { TimeSlotType } from "./TimeSlot";
import BookingForm, { BookingFormData } from "./BookingForm";
import ConfirmationScreen from "./ConfirmationScreen";
import PageTransition from "../layout/PageTransition";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample data
const CLASSES: ClassType[] = [
  {
    id: "signature-barre",
    name: "class.signature-barre.name",
    description: "class.signature-barre.description",
    intensity: "medium",
    suitableFor: ["audience.all-levels", "audience.beginners-welcome"],
  },
  {
    id: "barre-fusion",
    name: "class.barre-fusion.name",
    description: "class.barre-fusion.description",
    intensity: "strong",
    suitableFor: ["audience.intermediate", "audience.advanced"],
  },
  {
    id: "barre-stretch",
    name: "class.barre-stretch.name",
    description: "class.barre-stretch.description",
    intensity: "gentle",
    suitableFor: ["audience.all-levels", "audience.recovery"],
  },
  {
    id: "prenatal-barre",
    name: "class.prenatal-barre.name",
    description: "class.prenatal-barre.description",
    intensity: "gentle",
    suitableFor: ["audience.expectant-mothers", "audience.all-trimesters"],
  },
  {
    id: "private-barre",
    name: "class.private-barre.name",
    description: "class.private-barre.description",
    intensity: "medium",
    suitableFor: ["audience.all-levels", "audience.personalized"],
  },
  {
    id: "barre-sculpt",
    name: "class.barre-sculpt.name",
    description: "class.barre-sculpt.description",
    intensity: "strong",
    suitableFor: ["audience.intermediate", "audience.advanced"],
  },
];

// Sample time slots
const generateTimeSlots = (): TimeSlotType[] => {
  const instructors = ["Maria", "Sofia", "Carolina", "Valentina", "Isabella"];
  const times = ["07:00 AM", "09:30 AM", "12:00 PM", "05:30 PM", "07:00 PM"];
  
  return times.map((time, index) => ({
    id: `time-${index}`,
    time,
    availableSpots: Math.floor(Math.random() * 12),
    instructor: instructors[Math.floor(Math.random() * instructors.length)],
  }));
};

const BookingWizard: React.FC = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlotType[]>([]);
  const [selectedTime, setSelectedTime] = useState<TimeSlotType | null>(null);
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [direction, setDirection] = useState<"right" | "left">("right");

  const STEPS = [
    { name: t("step.class"), description: t("step.class.description") },
    { name: t("step.date"), description: t("step.date.description") },
    { name: t("step.time"), description: t("step.time.description") },
    { name: t("step.details"), description: t("step.details.description") },
    { name: t("step.confirmation"), description: t("step.confirmation.description") },
  ];

  // Generate time slots when date changes
  useEffect(() => {
    if (selectedDate) {
      setAvailableTimeSlots(generateTimeSlots());
    }
  }, [selectedDate]);

  const goToNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection("right");
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setDirection("left");
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleClassSelect = (classInfo: ClassType) => {
    setSelectedClass(classInfo);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: TimeSlotType) => {
    setSelectedTime(time);
  };

  const handleFormChange = (newData: BookingFormData) => {
    setFormData(newData);
  };

  const handleFormSubmit = () => {
    goToNextStep();
  };

  const resetBooking = () => {
    setCurrentStep(0);
    setSelectedClass(null);
    setSelectedDate(undefined);
    setSelectedTime(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const isNextDisabled = () => {
    switch (currentStep) {
      case 0:
        return !selectedClass;
      case 1:
        return !selectedDate;
      case 2:
        return !selectedTime;
      default:
        return false;
    }
  };

  // Animated background blobs
  const renderBackgroundBlobs = () => {
    return (
      <>
        <div 
          className="organic-blob w-64 h-64 top-[-20%] left-[-10%] animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div 
          className="organic-blob w-72 h-72 bottom-[-10%] right-[-20%] animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div 
          className="organic-blob w-48 h-48 top-[40%] left-[-15%] animate-float" 
          style={{ animationDelay: "3s" }}
        />
      </>
    );
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-enoia-beige to-enoia-cream">
      {renderBackgroundBlobs()}
      
      <div className="enoia-container py-8 md:py-16 relative z-10">
        {currentStep < STEPS.length - 1 && (
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-serif text-center mb-6">
              {currentStep === 0 ? (
                t("app.title")
              ) : (
                STEPS[currentStep].name
              )}
            </h1>
            
            <div className="hidden sm:flex justify-center items-center space-x-2 mb-4">
              {STEPS.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={cn(
                      "step-indicator",
                      currentStep === index ? "step-indicator-active" : "",
                      currentStep > index ? "step-indicator-completed" : "step-indicator-inactive"
                    )}
                  >
                    {currentStep > index ? (
                      <span>✓</span>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div 
                      className={cn(
                        "step-connector",
                        currentStep > index ? "step-connector-active" : ""
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-sm text-center text-muted-foreground">
              {STEPS[currentStep].description}
            </p>
          </div>
        )}
        
        <div className="max-w-3xl mx-auto">
          {currentStep === 0 && (
            <PageTransition isVisible={true} direction={direction}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CLASSES.map((classInfo) => (
                  <ClassCard
                    key={classInfo.id}
                    classInfo={classInfo}
                    selected={selectedClass?.id === classInfo.id}
                    onSelect={() => handleClassSelect(classInfo)}
                  />
                ))}
              </div>
            </PageTransition>
          )}
          
          {currentStep === 1 && selectedClass && (
            <PageTransition isVisible={true} direction={direction}>
              <DatePicker 
                date={selectedDate} 
                onDateChange={handleDateSelect} 
              />
            </PageTransition>
          )}
          
          {currentStep === 2 && selectedDate && (
            <PageTransition isVisible={true} direction={direction}>
              <div className="space-y-6">
                <h3 className="text-lg font-serif">{t("time.select")}</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {availableTimeSlots.map((timeSlot) => (
                    <TimeSlot
                      key={timeSlot.id}
                      slot={timeSlot}
                      selected={selectedTime?.id === timeSlot.id}
                      onSelect={() => handleTimeSelect(timeSlot)}
                    />
                  ))}
                </div>
              </div>
            </PageTransition>
          )}
          
          {currentStep === 3 && selectedTime && (
            <PageTransition isVisible={true} direction={direction}>
              <BookingForm
                formData={formData}
                onFormChange={handleFormChange}
                onSubmit={handleFormSubmit}
              />
            </PageTransition>
          )}
          
          {currentStep === 4 && selectedClass && selectedDate && selectedTime && (
            <PageTransition isVisible={true} direction="right">
              <ConfirmationScreen
                selectedClass={selectedClass}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                formData={formData}
                onReset={resetBooking}
              />
            </PageTransition>
          )}
          
          {currentStep < STEPS.length - 1 && (
            <div className="flex justify-between mt-10">
              {currentStep > 0 ? (
                <Button 
                  onClick={goToPreviousStep} 
                  className="enoia-button-outline"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  {t("nav.back")}
                </Button>
              ) : (
                <div />
              )}
              
              {currentStep < 3 && (
                <Button
                  onClick={goToNextStep}
                  disabled={isNextDisabled()}
                  className="enoia-button-primary"
                >
                  {t("nav.next")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingWizard;
