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

// ✅ Zod schema
const experiencedFormSchema = z.object({
  position: z.string().min(1, "Position is required"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.string().min(5, "Please enter your complete address"),
  phone: z.string().regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+$/, "Please enter a valid email address"),

  // ✅ Education
  undergradInstitution: z.string().min(1, "Undergraduate school is required"),
  undergradDegree: z.string().min(1, "Undergraduate degree is required"),
  undergradYear: z.string().min(4, "Enter valid year"),

  postgradInstitution: z.string().optional(),
  postgradDegree: z.string().optional(),
  postgradYear: z.string().optional(),

  // ✅ Single Employment (fixed)
  company: z.string().min(1, "Company name is required"),
  employmentPosition: z.string().min(1, "Position is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  responsibilities: z
    .string()
    .min(10, "Please describe your key responsibilities"),

  skills: z.string().min(10, "Please describe your skills and qualifications"),

  // ✅ Optional references
  referenceName: z.string().optional(),
  referenceRelationship: z.string().optional(),
  referencePhone: z.string().optional(),
});

type ExperiencedFormData = z.infer<typeof experiencedFormSchema>;

interface ExperiencedApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExperiencedApplicationDialog = ({
  open,
  onOpenChange,
}: ExperiencedApplicationDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ExperiencedFormData>({
    resolver: zodResolver(experiencedFormSchema),
    defaultValues: {
      position: "",
      fullName: "",
      address: "",
      phone: "",
      email: "",
      undergradInstitution: "",
      undergradDegree: "",
      undergradYear: "",
      postgradInstitution: "",
      postgradDegree: "",
      postgradYear: "",
      company: "",
      employmentPosition: "",
      startDate: "",
      endDate: "",
      responsibilities: "",
      skills: "",
      referenceName: "",
      referenceRelationship: "",
      referencePhone: "",
    },
  });

  const scriptURL = getSheetUrlOrThrow("experienced");

  const onSubmit = async (data: ExperiencedFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        "Application Type": "Experienced Professional",
        "Position": data.position,
        "Full Name": data.fullName,
        "Address": data.address,
        "Phone": data.phone,
        "Email": data.email,
        "Undergraduate School": data.undergradInstitution,
        "Undergraduate Degree": data.undergradDegree,
        "Undergraduate Year": data.undergradYear,
        "Postgraduate School": data.postgradInstitution || "",
        "Postgraduate Degree": data.postgradDegree || "",
        "Postgraduate Year": data.postgradYear || "",
        "Company": data.company,
        "Employment Position": data.employmentPosition,
        "Start Date": data.startDate,
        "End Date": data.endDate,
        "Responsibilities": data.responsibilities,
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
        ug_institution: data.undergradInstitution,
        ug_degree: data.undergradDegree,
        ug_year: data.undergradYear,
        pg_institution: data.postgradInstitution || "N/A",
        pg_degree: data.postgradDegree || "N/A",
        pg_year: data.postgradYear || "N/A",
        company_name: data.company,
        position_held: data.employmentPosition,
        start_date: data.startDate,
        end_date: data.endDate,
        key_responsibilities: data.responsibilities,
        skills_and_qualifications: data.skills,
        reference_name: data.referenceName || "N/A",
        reference_relationship: data.referenceRelationship || "N/A",
        reference_phone: data.referencePhone || "N/A",
        submission_date: new Date().toLocaleDateString(),
      };

      const emailResult = await sendCareerApplicationEmail(emailPayload, 'experienced');

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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Experienced Professional Application
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            Take your career to the next level with us. Please provide your
            professional details.
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
                    <Input placeholder="e.g. Senior Developer, Tech Lead" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Personal Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                Personal Information
              </h3>

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

            {/* Education */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold border-b pb-2">Education</h3>

              {/* Undergraduate (Required) */}
              <div className="space-y-4">
                <h4 className="font-medium">Undergraduate</h4>
                <FormField
                  control={form.control}
                  name="undergradInstitution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Undergraduate Institution</FormLabel>
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
                    name="undergradDegree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="B.Tech, B.Sc, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="undergradYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Completed</FormLabel>
                        <FormControl>
                          <Input placeholder="2020" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Postgraduate (Optional) */}
              <div className="space-y-4">
                <h4 className="font-medium">Postgraduate (Optional)</h4>
                <FormField
                  control={form.control}
                  name="postgradInstitution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postgraduate Institution</FormLabel>
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
                    name="postgradDegree"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Degree</FormLabel>
                        <FormControl>
                          <Input placeholder="M.Tech, MBA, MSc, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="postgradYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year Completed</FormLabel>
                        <FormControl>
                          <Input placeholder="2022" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Employment History (Fixed Single) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                Recent Employment
              </h3>

              <div className="border rounded-lg p-4 space-y-4">
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="employmentPosition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position Held</FormLabel>
                      <FormControl>
                        <Input placeholder="Your position/title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YYYY" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input placeholder="MM/YYYY or Present" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="responsibilities"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Key Responsibilities</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe responsibilities" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                Skills & Qualifications
              </h3>
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills & Qualifications</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List your skills, certifications, leadership experience, etc."
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
                      <Input placeholder="Former manager, colleague, etc." {...field} />
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
                        <Input placeholder="Manager, Colleague, etc." {...field} />
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
                This form is intended for applicants with prior work experience.
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
