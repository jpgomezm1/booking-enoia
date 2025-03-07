
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

interface BookingFormProps {
  formData: BookingFormData;
  onFormChange: (newData: BookingFormData) => void;
  onSubmit: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  formData,
  onFormChange,
  onSubmit,
}) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onFormChange({
      ...formData,
      [name]: value,
    });

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t("validation.first-name-required");
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t("validation.last-name-required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = t("validation.email-required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-serif">{t("form.personal-details")}</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="enoia-label">
            {t("form.first-name")}
          </Label>
          <Input
            id="firstName"
            name="firstName"
            className={cn(
              "enoia-input",
              errors.firstName ? "border-destructive focus-visible:ring-destructive" : ""
            )}
            value={formData.firstName}
            onChange={handleChange}
            placeholder={t("form.your-first-name")}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="enoia-label">
            {t("form.last-name")}
          </Label>
          <Input
            id="lastName"
            name="lastName"
            className={cn(
              "enoia-input",
              errors.lastName ? "border-destructive focus-visible:ring-destructive" : ""
            )}
            value={formData.lastName}
            onChange={handleChange}
            placeholder={t("form.your-last-name")}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="enoia-label">
          {t("form.email")}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          className={cn(
            "enoia-input",
            errors.email ? "border-destructive focus-visible:ring-destructive" : ""
          )}
          value={formData.email}
          onChange={handleChange}
          placeholder={t("form.your-email")}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="enoia-label">
          {t("form.phone")}
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          className="enoia-input"
          value={formData.phone}
          onChange={handleChange}
          placeholder={t("form.your-phone")}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message" className="enoia-label">
          {t("form.message")}
        </Label>
        <Textarea
          id="message"
          name="message"
          className="enoia-input min-h-24 resize-none"
          value={formData.message}
          onChange={handleChange}
          placeholder={t("form.special-requests")}
        />
      </div>
      
      <Button 
        type="submit" 
        className="enoia-button-primary w-full mt-6"
      >
        {t("form.confirm-booking")}
      </Button>
    </form>
  );
};

export default BookingForm;
