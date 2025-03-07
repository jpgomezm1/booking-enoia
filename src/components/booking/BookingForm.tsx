
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required";
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
      <h3 className="text-lg font-serif">Personal Details</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="enoia-label">
            First Name
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
            placeholder="Your first name"
          />
          {errors.firstName && (
            <p className="text-xs text-destructive">{errors.firstName}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="enoia-label">
            Last Name
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
            placeholder="Your last name"
          />
          {errors.lastName && (
            <p className="text-xs text-destructive">{errors.lastName}</p>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="enoia-label">
          Email
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
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone" className="enoia-label">
          Phone (Optional)
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          className="enoia-input"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+57 300 000 0000"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="message" className="enoia-label">
          Special Requests (Optional)
        </Label>
        <Textarea
          id="message"
          name="message"
          className="enoia-input min-h-24 resize-none"
          value={formData.message}
          onChange={handleChange}
          placeholder="Let us know if you have any special requests or need accommodations"
        />
      </div>
      
      <Button 
        type="submit" 
        className="enoia-button-primary w-full mt-6"
      >
        Confirm Booking
      </Button>
    </form>
  );
};

export default BookingForm;
