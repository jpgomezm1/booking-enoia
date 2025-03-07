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
import { motion } from "framer-motion";

// Sample data with expanded content for class browsing
const CLASSES: ClassType[] = [
  {
    id: "signature-barre",
    name: "class.signature-barre.name",
    description: "class.signature-barre.description",
    intensity: "medium",
    suitableFor: ["audience.all-levels", "audience.beginners-welcome"],
    benefits: [
      "benefit.signature-barre.posture",
      "benefit.signature-barre.strength",
      "benefit.signature-barre.flexibility",
      "benefit.signature-barre.balance"
    ],
    duration: "55 min",
  },
  {
    id: "barre-fusion",
    name: "class.barre-fusion.name",
    description: "class.barre-fusion.description",
    intensity: "strong",
    suitableFor: ["audience.intermediate", "audience.advanced"],
    benefits: [
      "benefit.barre-fusion.cardio",
      "benefit.barre-fusion.endurance",
      "benefit.barre-fusion.calorie-burn",
      "benefit.barre-fusion.toning"
    ],
    duration: "60 min",
  },
  {
    id: "barre-stretch",
    name: "class.barre-stretch.name",
    description: "class.barre-stretch.description",
    intensity: "gentle",
    suitableFor: ["audience.all-levels", "audience.recovery"],
    benefits: [
      "benefit.barre-stretch.flexibility",
      "benefit.barre-stretch.relaxation",
      "benefit.barre-stretch.recovery",
      "benefit.barre-stretch.stress-reduction"
    ],
    duration: "45 min",
  },
  {
    id: "prenatal-barre",
    name: "class.prenatal-barre.name",
    description: "class.prenatal-barre.description",
    intensity: "gentle",
    suitableFor: ["audience.expectant-mothers", "audience.all-trimesters"],
    benefits: [
      "benefit.prenatal-barre.safe-exercise",
      "benefit.prenatal-barre.pelvic-floor",
      "benefit.prenatal-barre.circulation",
      "benefit.prenatal-barre.comfort"
    ],
    duration: "50 min",
  },
  {
    id: "private-barre",
    name: "class.private-barre.name",
    description: "class.private-barre.description",
    intensity: "medium",
    suitableFor: ["audience.all-levels", "audience.personalized"],
    benefits: [
      "benefit.private-barre.personalized",
      "benefit.private-barre.technique",
      "benefit.private-barre.goals",
      "benefit.private-barre.adaptations"
    ],
    duration: "60 min",
  },
  {
    id: "barre-sculpt",
    name: "class.barre-sculpt.name",
    description: "class.barre-sculpt.description",
    intensity: "strong",
    suitableFor: ["audience.intermediate", "audience.advanced"],
    benefits: [
      "benefit.barre-sculpt.definition",
      "benefit.barre-sculpt.strength",
      "benefit.barre-sculpt.resistance",
      "benefit.barre-sculpt.sculpting"
    ],
    duration: "55 min",
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
        {/* We'll remove this since we're adding blobs to the main layout */}
      </>
    );
  };

  const renderBarreIntroduction = () => {
    return (
      <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-enoia-sand/50">
        <h2 className="text-2xl font-serif mb-3 text-enoia-brown">{t("barre.what-is-title")}</h2>
        <p className="text-sm mb-4">{t("barre.what-is-description")}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
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
    );
  };

  return (
    <div className="relative">
      {renderBackgroundBlobs()}
      
      <div className="enoia-container py-8 md:py-16 relative z-10">
        {currentStep < STEPS.length - 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-3xl md:text-4xl font-serif text-center mb-6 text-enoia-brown">
              {currentStep === 0 ? (
                t("app.title")
              ) : (
                STEPS[currentStep].name
              )}
            </h1>
            
            <div className="hidden sm:flex justify-center items-center space-x-2 mb-6 px-4">
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
                        "step-connector w-12 md:w-20",
                        currentStep > index ? "step-connector-active" : ""
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-sm text-center text-muted-foreground max-w-xl mx-auto">
              {STEPS[currentStep].description}
            </p>
          </motion.div>
        )}
        
        <div className="max-w-3xl mx-auto bg-white/40 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-sm border border-enoia-sand/50">
          {currentStep === 0 && (
            <PageTransition isVisible={true} direction={direction}>
              {renderBarreIntroduction()}
              
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
