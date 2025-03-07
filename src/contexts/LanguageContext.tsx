import { createContext, useContext, useState, ReactNode } from "react";

type LanguageContextType = {
  language: "es" | "en";
  toggleLanguage: () => void;
  t: (key: string) => string;
};

type TranslationsType = {
  [key: string]: {
    en: string;
    es: string;
  };
};

// All translations for the app
const translations: TranslationsType = {
  // Welcome Message
  "welcome.title": {
    en: "Welcome to Enoia Barre",
    es: "Bienvenido a Enoia Barre"
  },
  "welcome.message": {
    en: "Discover the perfect harmony of movement, strength, and mindfulness in our sanctuary. We invite you to explore our classes and join our community of conscious movement.",
    es: "Descubre la perfecta armonía de movimiento, fuerza y mindfulness en nuestro santuario. Te invitamos a explorar nuestras clases y unirte a nuestra comunidad de movimiento consciente."
  },
  "welcome.button": {
    en: "Start My Journey",
    es: "Comenzar Mi Experiencia"
  },
  
  // General
  "app.title": {
    en: "Book Your Barre Experience",
    es: "Reserva Tu Experiencia de Barre"
  },
  
  // Barre Information
  "barre.what-is-title": {
    en: "What is Barre?",
    es: "¿Qué es Barre?"
  },
  "barre.what-is-description": {
    en: "Barre is a full-body workout that combines elements of ballet, Pilates, and yoga. It uses precise isometric movements to strengthen and tone muscles, with focus on proper alignment and core engagement. Classes flow through low-impact, high-intensity sequences using the ballet barre for stability.",
    es: "Barre es un entrenamiento de cuerpo completo que combina elementos de ballet, Pilates y yoga. Utiliza movimientos isométricos precisos para fortalecer y tonificar los músculos, con enfoque en la alineación adecuada y el compromiso del core. Las clases fluyen a través de secuencias de bajo impacto y alta intensidad usando la barra de ballet para estabilidad."
  },
  "barre.benefits-title": {
    en: "Benefits of Barre",
    es: "Beneficios del Barre"
  },
  "barre.benefit-1": {
    en: "Improved posture and body alignment",
    es: "Mejora la postura y alineación corporal"
  },
  "barre.benefit-2": {
    en: "Increased muscle strength and tone",
    es: "Aumenta la fuerza y tono muscular"
  },
  "barre.benefit-3": {
    en: "Enhanced flexibility and range of motion",
    es: "Mejora la flexibilidad y amplitud de movimiento"
  },
  "barre.benefit-4": {
    en: "Reduced stress and improved mind-body connection",
    es: "Reduce el estrés y mejora la conexión mente-cuerpo"
  },
  "barre.for-who-title": {
    en: "Who is Barre for?",
    es: "¿Para quién es Barre?"
  },
  "barre.for-who-description": {
    en: "Barre is for everyone! Regardless of age, fitness level, or dance experience, Barre offers modifications for all bodies and abilities.",
    es: "¡Barre es para todos! Independientemente de la edad, nivel de condición física o experiencia en danza, Barre ofrece modificaciones para todos los cuerpos y habilidades."
  },
  "barre.no-experience": {
    en: "No dance experience required — just bring your motivation!",
    es: "No se requiere experiencia en danza — ¡solo trae tu motivación!"
  },
  
  // Steps
  "step.class": {
    en: "Class",
    es: "Clase"
  },
  "step.class.description": {
    en: "Choose your class type",
    es: "Elige tu tipo de clase"
  },
  "step.date": {
    en: "Date",
    es: "Fecha"
  },
  "step.date.description": {
    en: "Select your preferred date",
    es: "Selecciona tu fecha preferida"
  },
  "step.time": {
    en: "Time",
    es: "Hora"
  },
  "step.time.description": {
    en: "Pick an available time slot",
    es: "Elige un horario disponible"
  },
  "step.details": {
    en: "Details",
    es: "Detalles"
  },
  "step.details.description": {
    en: "Complete your booking information",
    es: "Completa tu información de reserva"
  },
  "step.confirmation": {
    en: "Confirmation",
    es: "Confirmación"
  },
  "step.confirmation.description": {
    en: "Your booking is confirmed",
    es: "Tu reserva está confirmada"
  },
  
  // Class Card
  "class.intensity": {
    en: "Intensity",
    es: "Intensidad"
  },
  "class.suitable-for": {
    en: "Suitable for",
    es: "Adecuado para"
  },
  "class.benefits": {
    en: "Benefits",
    es: "Beneficios"
  },
  "class.duration": {
    en: "Duration",
    es: "Duración"
  },
  "class.select": {
    en: "Select This Class",
    es: "Seleccionar Esta Clase"
  },
  "intensity.gentle": {
    en: "Gentle",
    es: "Suave"
  },
  "intensity.medium": {
    en: "Medium",
    es: "Medio"
  },
  "intensity.strong": {
    en: "Strong",
    es: "Fuerte"
  },

  // Class Benefits
  "benefit.signature-barre.posture": {
    en: "Improves posture and alignment",
    es: "Mejora la postura y alineación"
  },
  "benefit.signature-barre.strength": {
    en: "Builds overall body strength",
    es: "Desarrolla fuerza corporal general"
  },
  "benefit.signature-barre.flexibility": {
    en: "Enhances flexibility",
    es: "Aumenta la flexibilidad"
  },
  "benefit.signature-barre.balance": {
    en: "Improves balance and coordination",
    es: "Mejora el equilibrio y coordinación"
  },
  
  "benefit.barre-fusion.cardio": {
    en: "Effective cardio workout",
    es: "Entrenamiento cardiovascular efectivo"
  },
  "benefit.barre-fusion.endurance": {
    en: "Builds endurance and stamina",
    es: "Desarrolla resistencia y vigor"
  },
  "benefit.barre-fusion.calorie-burn": {
    en: "Higher calorie burn",
    es: "Mayor quema de calorías"
  },
  "benefit.barre-fusion.toning": {
    en: "Rapid muscle toning",
    es: "Tonificación muscular rápida"
  },
  
  "benefit.barre-stretch.flexibility": {
    en: "Deep tissue stretching",
    es: "Estiramiento profundo de tejidos"
  },
  "benefit.barre-stretch.relaxation": {
    en: "Mind-body relaxation",
    es: "Relajación mente-cuerpo"
  },
  "benefit.barre-stretch.recovery": {
    en: "Aids muscle recovery",
    es: "Ayuda a la recuperación muscular"
  },
  "benefit.barre-stretch.stress-reduction": {
    en: "Stress reduction",
    es: "Reducción del estrés"
  },
  
  "benefit.prenatal-barre.safe-exercise": {
    en: "Safe exercise during pregnancy",
    es: "Ejercicio seguro durante el embarazo"
  },
  "benefit.prenatal-barre.pelvic-floor": {
    en: "Strengthens pelvic floor muscles",
    es: "Fortalece los músculos del suelo pélvico"
  },
  "benefit.prenatal-barre.circulation": {
    en: "Improves circulation",
    es: "Mejora la circulación"
  },
  "benefit.prenatal-barre.comfort": {
    en: "Eases pregnancy discomfort",
    es: "Alivia las molestias del embarazo"
  },
  
  "benefit.private-barre.personalized": {
    en: "Personalized attention",
    es: "Atención personalizada"
  },
  "benefit.private-barre.technique": {
    en: "Perfect technique development",
    es: "Desarrollo perfecto de la técnica"
  },
  "benefit.private-barre.goals": {
    en: "Focused on your specific goals",
    es: "Enfocado en tus objetivos específicos"
  },
  "benefit.private-barre.adaptations": {
    en: "Customized adaptations for any needs",
    es: "Adaptaciones personalizadas para cualquier necesidad"
  },
  
  "benefit.barre-sculpt.definition": {
    en: "Improves muscle definition",
    es: "Mejora la definición muscular"
  },
  "benefit.barre-sculpt.strength": {
    en: "Increases strength",
    es: "Aumenta la fuerza"
  },
  "benefit.barre-sculpt.resistance": {
    en: "Builds resistance with weights",
    es: "Desarrolla resistencia con pesas"
  },
  "benefit.barre-sculpt.sculpting": {
    en: "Body sculpting focus",
    es: "Enfoque en esculpir el cuerpo"
  },
  
  // Classes
  "class.signature-barre.name": {
    en: "Signature Barre",
    es: "Barre Signature"
  },
  "class.signature-barre.description": {
    en: "Our foundational class combines elements of ballet, Pilates, and yoga to create a full-body workout that improves posture, flexibility, and strength.",
    es: "Nuestra clase fundamental combina elementos de ballet, Pilates y yoga para crear un entrenamiento de cuerpo completo que mejora la postura, flexibilidad y fuerza."
  },
  "class.barre-fusion.name": {
    en: "Barre Fusion",
    es: "Barre Fusión"
  },
  "class.barre-fusion.description": {
    en: "An energetic blend of barre with cardio intervals to boost stamina and calorie burn while sculpting and toning muscles.",
    es: "Una mezcla energética de barre con intervalos de cardio para aumentar la resistencia y quemar calorías mientras se esculpen y tonifican los músculos."
  },
  "class.barre-stretch.name": {
    en: "Barre Stretch",
    es: "Barre Estiramiento"
  },
  "class.barre-stretch.description": {
    en: "A gentle, restorative class focusing on deep stretching and relaxation, perfect for recovery days or improving flexibility.",
    es: "Una clase suave y restaurativa enfocada en estiramientos profundos y relajación, perfecta para días de recuperación o para mejorar la flexibilidad."
  },
  "class.prenatal-barre.name": {
    en: "Pre-natal Barre",
    es: "Barre Prenatal"
  },
  "class.prenatal-barre.description": {
    en: "Specially designed for expectant mothers, this class provides a safe, effective workout to maintain strength and flexibility during pregnancy.",
    es: "Especialmente diseñada para futuras madres, esta clase proporciona un entrenamiento seguro y efectivo para mantener la fuerza y flexibilidad durante el embarazo."
  },
  "class.private-barre.name": {
    en: "Private Barre",
    es: "Barre Privado"
  },
  "class.private-barre.description": {
    en: "One-on-one sessions tailored to your specific needs and goals, providing personalized attention and customized routines.",
    es: "Sesiones personalizadas adaptadas a tus necesidades y objetivos específicos, proporcionando atención personalizada y rutinas a medida."
  },
  "class.barre-sculpt.name": {
    en: "Barre & Sculpt",
    es: "Barre & Esculpir"
  },
  "class.barre-sculpt.description": {
    en: "Focus on muscle definition with targeted toning exercises using light weights and high repetitions for a sculpted physique.",
    es: "Enfócate en la definición muscular con ejercicios de tonificación específicos utilizando pesos ligeros y repeticiones altas para un físico esculpido."
  },
  
  // Class audience
  "audience.all-levels": {
    en: "All levels",
    es: "Todos los niveles"
  },
  "audience.beginners-welcome": {
    en: "Beginners welcome",
    es: "Principiantes bienvenidos"
  },
  "audience.intermediate": {
    en: "Intermediate",
    es: "Intermedio"
  },
  "audience.advanced": {
    en: "Advanced",
    es: "Avanzado"
  },
  "audience.recovery": {
    en: "Recovery",
    es: "Recuperación"
  },
  "audience.expectant-mothers": {
    en: "Expectant mothers",
    es: "Futuras madres"
  },
  "audience.all-trimesters": {
    en: "All trimesters",
    es: "Todos los trimestres"
  },
  "audience.personalized": {
    en: "Personalized",
    es: "Personalizado"
  },
  
  // Date Picker
  "date.select": {
    en: "Select Date",
    es: "Seleccionar Fecha"
  },
  "date.pick-a-date": {
    en: "Pick a date",
    es: "Elegir una fecha"
  },
  "date.today": {
    en: "Today",
    es: "Hoy"
  },
  "date.classes-available": {
    en: "Classes available 7 days a week",
    es: "Clases disponibles los 7 días de la semana"
  },
  
  // Time Selection
  "time.select": {
    en: "Select Time",
    es: "Seleccionar Hora"
  },
  "time.with": {
    en: "with",
    es: "con"
  },
  "time.full": {
    en: "Full",
    es: "Completo"
  },
  "time.spots-left": {
    en: "spots left",
    es: "lugares disponibles"
  },
  "time.available": {
    en: "available",
    es: "disponibles"
  },
  "time.instructor": {
    en: "Instructor",
    es: "Instructor/a"
  },
  
  // Booking Form
  "form.personal-details": {
    en: "Personal Details",
    es: "Datos Personales"
  },
  "form.first-name": {
    en: "First Name",
    es: "Nombre"
  },
  "form.last-name": {
    en: "Last Name",
    es: "Apellido"
  },
  "form.email": {
    en: "Email",
    es: "Correo Electrónico"
  },
  "form.phone": {
    en: "Phone (Optional)",
    es: "Teléfono (Opcional)"
  },
  "form.message": {
    en: "Special Requests (Optional)",
    es: "Solicitudes Especiales (Opcional)"
  },
  "form.confirm-booking": {
    en: "Confirm Booking",
    es: "Confirmar Reserva"
  },
  "form.your-first-name": {
    en: "Your first name",
    es: "Tu nombre"
  },
  "form.your-last-name": {
    en: "Your last name",
    es: "Tu apellido"
  },
  "form.your-email": {
    en: "your.email@example.com",
    es: "tu.correo@ejemplo.com"
  },
  "form.your-phone": {
    en: "+57 300 000 0000",
    es: "+57 300 000 0000"
  },
  "form.special-requests": {
    en: "Let us know if you have any special requests or need accommodations",
    es: "Déjanos saber si tienes alguna solicitud especial o necesitas adaptaciones"
  },
  
  // Form Validations
  "validation.first-name-required": {
    en: "First name is required",
    es: "El nombre es requerido"
  },
  "validation.last-name-required": {
    en: "Last name is required",
    es: "El apellido es requerido"
  },
  "validation.email-required": {
    en: "Valid email is required",
    es: "Un correo electrónico válido es requerido"
  },
  
  // Confirmation Screen
  "confirmation.booking-confirmed": {
    en: "Booking Confirmed",
    es: "Reserva Confirmada"
  },
  "confirmation.welcome-message": {
    en: "We can't wait to move with you at Enoia. Your space is ready.",
    es: "Estamos ansiosos por moverte con Enoia. Tu espacio está listo."
  },
  "confirmation.booking-details": {
    en: "Booking Details",
    es: "Detalles de la Reserva"
  },
  "confirmation.date": {
    en: "Date",
    es: "Fecha"
  },
  "confirmation.time": {
    en: "Time",
    es: "Hora"
  },
  "confirmation.class": {
    en: "Class",
    es: "Clase"
  },
  "confirmation.client": {
    en: "Client",
    es: "Cliente"
  },
  "confirmation.email-sent": {
    en: "A confirmation email has been sent to",
    es: "Se ha enviado un correo de confirmación a"
  },
  "confirmation.arrive-early": {
    en: "Please arrive 15 minutes before class starts.",
    es: "Por favor, llega 15 minutos antes de que comience la clase."
  },
  "confirmation.book-another": {
    en: "Book Another Class",
    es: "Reservar Otra Clase"
  },
  
  // Navigation
  "nav.next": {
    en: "Next",
    es: "Siguiente"
  },
  "nav.back": {
    en: "Back",
    es: "Atrás"
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"es" | "en">("es"); // Default to Spanish

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "es" : "en"));
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
