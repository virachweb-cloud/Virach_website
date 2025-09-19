import { motion } from "framer-motion";
import { BentoCard } from "../BentoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, MapPin, Clock, Send, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { sendToGoogleSheet } from "@/lib/utils"; // ✅ import utility
import { getSheetUrlOrThrow } from "@/lib/sheets";
import { sendContactEmail } from "@/lib/email";

// Validation schema
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
   email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+$/, "Please enter a valid email address"),
  designation: z.string().optional(), // ✅ removed error requirement
  countryCode: z.string().min(1, "Please select a country code"),
  phone: z
    .string()
    .min(6, "Please enter valid phone number")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

// Country code list
const countryCodes = [
  { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
];

// Contact info cards
const contactInfo = [
  { icon: Mail, label: "Email", value: "support@virach.in" },
  { icon: MapPin, label: "Address", value: "Krishe Valley, Banjara Hills, Hyderabad, Telangana – 500034" },
  { icon: Clock, label: "Hours", value: "Mon–Fri: 9AM–6PM (Weekends: Support Available)" },
];

export const ContactSection = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { countryCode: "+91" },
    mode: "onChange", // ✅ validate on typing, not just on submit
  });

  const onSubmit = async (data: FormData) => {
    let scriptURL: string;
    try {
      scriptURL = getSheetUrlOrThrow("contact");
    } catch (err) {
      alert("Configuration error: missing Google Script URL for contact form.");
      return;
    }
    const combinedPhoneSpaced = `${data.countryCode} ${data.phone}`;
    const combinedPhoneCompact = `${data.countryCode}${data.phone}`;
    const payload = {
      "First Name": data.firstName,
      "Last Name": data.lastName,
      Email: data.email,
      Designation: data.designation || "",
      "Country Code": data.countryCode,
      Phone: data.phone,
      // Common aliases to match different Apps Script/Sheet headers
      "Phone Number": combinedPhoneSpaced,
      PhoneNumber: combinedPhoneCompact,
      phone: data.phone,
      // Text-forced variants to avoid Sheets interpreting + or spaces as formulas
      "Phone Number Text": `'${combinedPhoneSpaced}`,
      PhoneNumberText: `'${combinedPhoneCompact}`,
      Company: data.company || "",
      Service: data.service,
      Message: data.message,
    };

    const sheetResult = await sendToGoogleSheet(payload, scriptURL);

    // Attempt EmailJS as well, but don't block success on email unless you prefer strict mode
    const emailPayload = {
      first_name: data.firstName,
      last_name: data.lastName,
      work_email: data.email,
      designation: data.designation || "",
      phone: combinedPhoneSpaced,
      company_name: data.company || "",
      service: data.service,
      project: data.message,
    };
    const emailResult = await sendContactEmail(emailPayload);

    if (sheetResult.success) {
      // If sheet succeeded, consider overall success regardless of email result
      alert(
        emailResult.success
          ? "✅ Your message was sent and an email confirmation was delivered."
          : `✅ Your message was sent. (Email notification failed: ${emailResult.message || "unknown error"})`
      );
      reset();
    } else {
      // If sheet failed, report combined failure
      alert("❌ Sorry, there was an error sending your message. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Contact Form */}
      <BentoCard size="2x1" className="lg:col-span-2 p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-midnight mb-8">Get In Touch</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First + Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-2">
                <Input
                  {...register("firstName")}
                  placeholder="First Name"
                  className={`glass border-glass-border focus:border-primary placeholder:text-primary ${errors.firstName ? "border-red-500 animate-pulse" : ""}`}
                />
                {errors.firstName && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.firstName.message}</span>
                  </motion.div>
                )}
              </motion.div>

              {/* Last Name */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="space-y-2">
                <Input
                  {...register("lastName")}
                  placeholder="Last Name"
                  className={`glass border-glass-border focus:border-primary placeholder:text-primary ${errors.lastName ? "border-red-500 animate-pulse" : ""}`}
                />
                {errors.lastName && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.lastName.message}</span>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-2">
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Work Email"
                  className={`glass border-glass-border focus:border-primary placeholder:text-primary ${errors.email ? "border-red-500 animate-pulse" : ""}`}
                />
                {errors.email && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-1 text-red-500 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.email.message}</span>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Designation + Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Designation (✅ no error now) */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-2">
                <Input
                  {...register("designation")}
                  placeholder="Designation / Job Title"
                  className="glass border-glass-border focus:border-primary placeholder:text-primary"
                />
              </motion.div>

              {/* Company */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="space-y-2">
                <Input
                  {...register("company")}
                  placeholder="Company Name"
                  className="glass border-glass-border focus:border-primary placeholder:text-primary"
                />
              </motion.div>
            </div>

            {/* Phone Number with Country Code */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="space-y-2">
              <div className="flex gap-2">
                <div className="w-1/8">
                  <Select
                    defaultValue="+91"
                    onValueChange={(value) => {
                      setSelectedCountryCode(value);
                      setValue("countryCode", value);
                    }}
                  >
                    <SelectTrigger className={`glass border-glass-border focus:border-primary ${errors.countryCode ? "border-red-500 animate-pulse" : ""}`}>
                      <SelectValue placeholder="Country Code" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <span className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.code}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Input
                    {...register("phone")}
                    placeholder="Phone Number "
                    className={`glass border-glass-border focus:border-primary placeholder:text-primary ${errors.phone ? "border-red-500 animate-pulse" : ""}`}
                  />
                </div>
              </div>
              {(errors.countryCode || errors.phone) && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.countryCode?.message || errors.phone?.message}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Service Selection */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="space-y-2">
              <Select onValueChange={(value) => setValue("service", value)}>
                <SelectTrigger className={`glass border-glass-border focus:border-primary placeholder:text-primary ${errors.service ? "border-red-500 animate-pulse" : ""}`}>
                  <SelectValue placeholder="Service Interested In" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="mobile">Mobile Apps</SelectItem>
                  <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                  <SelectItem value="cloud">Cloud Solutions</SelectItem>
                  <SelectItem value="automation">Automation</SelectItem>
                  <SelectItem value="analytics">Data Analytics</SelectItem>
                </SelectContent>
              </Select>
              {errors.service && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.service.message}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Message */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }} className="space-y-2">
              <Textarea
                {...register("message")}
                placeholder="Tell us about your project..."
                className={`glass border-glass-border focus:border-primary min-h-[120px] placeholder:text-primary ${errors.message ? "border-red-500 animate-pulse" : ""}`}
              />
              {errors.message && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center space-x-1 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.message.message}</span>
                </motion.div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" disabled={isSubmitting} className="btn-neon w-full group disabled:opacity-50 disabled:cursor-not-allowed">
                  <Send className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </motion.div>
      </BentoCard>

      {/* Contact Info */}
      <div className="space-y-6">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <BentoCard key={info.label} size="1x1" className="p-4" delay={index * 0.1}>
              <motion.div className="flex items-start space-x-3 h-full" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <motion.div className="p-2 rounded-lg glass text-primary" whileHover={{ rotate: 5, scale: 1.1 }} transition={{ duration: 0.2 }}>
                  <Icon className="h-5 w-5 text-midnight" />
                </motion.div>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1 text-midnight">{info.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed text-primary">{info.value}</p>
                </div>
              </motion.div>
            </BentoCard>
          );
        })}
      </div>
    </div>
  );
};