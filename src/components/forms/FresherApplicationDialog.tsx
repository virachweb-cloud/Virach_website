import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendToGoogleSheet } from "@/lib/utils";
import { getSheetUrlOrThrow } from "@/lib/sheets";
import { sendCareerApplicationEmail } from "@/lib/email";

// ✅ Schema with UG required and PG optional
const fresherFormSchema = z.object({
  position: z.string().min(1, "Position is required"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.string().min(5, "Please enter your complete address"),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+$/, "Please enter a valid email address"),

  // ✅ Undergraduate (required)
  ugSchool: z.string().min(1, "Undergraduate Institution is required"),
  ugDegree: z.string().min(1, "Undergraduate Degree is required"),
  ugYearCompleted: z.string().min(4, "Please enter the UG year completed"),

  // ✅ Postgraduate (optional)
  pgSchool: z.string().optional(),
  pgDegree: z.string().optional(),
  pgYearCompleted: z.string().optional(),

  skills: z.string().min(10, "Please describe your skills and qualifications"),

  // ✅ Reference optional
  referenceName: z.string().optional(),
  referenceRelationship: z.string().optional(),
  referencePhone: z
    .string()
    .optional(),
});

type FresherFormData = z.infer<typeof fresherFormSchema>;

interface FresherApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FresherApplicationDialog = ({
  open,
  onOpenChange,
}: FresherApplicationDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FresherFormData>({
    resolver: zodResolver(fresherFormSchema),
    mode: "onChange",
    defaultValues: {
      position: "",
      fullName: "",
      address: "",
      phone: "",
      email: "",
      ugSchool: "",
      ugDegree: "",
      ugYearCompleted: "",
      pgSchool: "",
      pgDegree: "",
      pgYearCompleted: "",
      skills: "",
      referenceName: "",
      referenceRelationship: "",
      referencePhone: "",
    },
  });

  const scriptURL = getSheetUrlOrThrow("fresher");

  const onSubmit = async (data: FresherFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        "Application Type": "Fresher",
        "Position": data.position,
        "Full Name": data.fullName,
        "Address": data.address,
        "Phone": data.phone,
        "Email": data.email,
        "Undergraduate School": data.ugSchool,
        "Undergraduate Degree": data.ugDegree,
        "Undergraduate Year": data.ugYearCompleted,
        "Postgraduate School": data.pgSchool || "",
        "Postgraduate Degree": data.pgDegree || "",
        "Postgraduate Year": data.pgYearCompleted || "",
        "Skills": data.skills,
        "Reference Name": data.referenceName || "",
        "Reference Relationship": data.referenceRelationship || "",
        "Reference Phone": data.referencePhone || "",
      };

      // Send to Google Sheets
      const sheetResult = await sendToGoogleSheet(payload, scriptURL);

      // Send email notification
      const emailPayload = {
        position_applied: data.position,
        full_name: data.fullName,
        address: data.address,
        phone_number: data.phone,
        email_address: data.email,
        ug_institution: data.ugSchool,
        ug_degree: data.ugDegree,
        ug_year: data.ugYearCompleted,
        pg_institution: data.pgSchool || "N/A",
        pg_degree: data.pgDegree || "N/A",
        pg_year: data.pgYearCompleted || "N/A",
        company_name: "N/A (Fresher)",
        position_held: "N/A (Fresher)",
        start_date: "N/A",
        end_date: "N/A",
        key_responsibilities: "N/A (Fresher)",
        skills_and_qualifications: data.skills,
        reference_name: data.referenceName || "N/A",
        reference_relationship: data.referenceRelationship || "N/A",
        reference_phone: data.referencePhone || "N/A",
        submission_date: new Date().toLocaleDateString(),
      };

      const emailResult = await sendCareerApplicationEmail(emailPayload, 'fresher');

      if (sheetResult.success && emailResult.success) {
        toast.success("Your application has been submitted successfully!");
        form.reset();
        onOpenChange(false);
      } else if (sheetResult.success) {
        toast.success("Application submitted to database, but email notification failed.");
        form.reset();
        onOpenChange(false);
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Fresher Application Form
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            Welcome to your career journey! Please fill out the form below.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Position */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position Applied For</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer, Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your complete address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Undergraduate Education (Required) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Undergraduate Education</h3>

              <FormField
                control={form.control}
                name="ugSchool"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UG Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="University or College name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ugDegree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UG Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="B.Tech, B.Sc, Diploma, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ugYearCompleted"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UG Year Completed</FormLabel>
                      <FormControl>
                        <Input placeholder="2024" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Postgraduate Education (Optional) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Postgraduate Education (Optional)</h3>

              <FormField
                control={form.control}
                name="pgSchool"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PG Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="University or College name (Optional)" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pgDegree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PG Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="M.Tech, MBA, M.Sc, etc. (Optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pgYearCompleted"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PG Year Completed</FormLabel>
                      <FormControl>
                        <Input placeholder="2026 (Optional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Skills & Qualifications</h3>

              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills & Qualifications</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List your skills, certifications, programming languages, tools, etc."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Reference (Optional) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Reference (Optional)</h3>

              <FormField
                control={form.control}
                name="referenceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reference Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Professor, mentor, or professional contact" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="referenceRelationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="Professor, Mentor, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referencePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reference Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-4 text-center">
                This form is intended for applicants with no prior work experience.
              </p>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting Application..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
