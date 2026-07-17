import { useState, useMemo, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { OtpDialog } from "../OtpDialog";
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
const JOB_POSITIONS = [
  "Software Developer",
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Mobile App Developer",
  "UI/UX Designer",
  "AI/ML Engineer",
  "QA/Test Engineer",
  "Data Entry Operator",
  "HR Executive",
  "Digital Marketing Executive",
  "Business Development Executive",
  "Technical Support Executive",
  "Project Manager",
  "Intern",
  "Other",
];
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
  const [resume, setResume] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
const [pendingApplication, setPendingApplication] = useState<
  (ExperiencedFormData & {
    resume: File | null;
    customPosition: string;
  }) | null
>(null);

const [showOtpDialog, setShowOtpDialog] = useState(false);
const [showPositions, setShowPositions] = useState(false);
const [customPosition, setCustomPosition] = useState("");
const [isOtherSelected, setIsOtherSelected] = useState(false);

const dropdownRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowPositions(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () =>
    document.removeEventListener("mousedown", handleClickOutside);
}, []);

const pendingPhone = useMemo(
  () => pendingApplication?.phone ?? "",
  [pendingApplication]
);
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

  const onSubmit = async (data: ExperiencedFormData) => {
    setIsSubmitting(true);  
    try {


const formData = new FormData();
const finalPosition =
  data.position === "Other"
    ? customPosition
    : data.position;
formData.append("name", data.fullName);
formData.append("email", data.email);
formData.append("phone", data.phone);
formData.append("skills", data.skills);
formData.append("position", finalPosition);
formData.append("experience", data.employmentPosition);
formData.append("address", data.address);

formData.append(
  "undergraduate_institution",
  data.undergradInstitution
);

formData.append(
  "undergraduate_degree",
  data.undergradDegree
);

formData.append(
  "undergraduate_year",
  data.undergradYear
);

formData.append(
  "postgraduate_institution",
  data.postgradInstitution || ""
);

formData.append(
  "postgraduate_degree",
  data.postgradDegree || ""
);

formData.append(
  "postgraduate_year",
  data.postgradYear || ""
);

formData.append(
  "company",
  data.company
);

formData.append(
  "employment_position",
  data.employmentPosition
);

formData.append(
  "start_date",
  data.startDate
);

formData.append(
  "end_date",
  data.endDate
);

formData.append(
  "responsibilities",
  data.responsibilities
);

formData.append(
  "reference_name",
  data.referenceName || ""
);

formData.append(
  "reference_relationship",
  data.referenceRelationship || ""
);

formData.append(
  "reference_phone",
  data.referencePhone || ""
);
if (resume) {
  formData.append("resume", resume);
}
const duplicateRes = await fetch(
  "https://virach-website.onrender.com/check-application-duplicate",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: data.phone,
    }),
  }
);

const duplicateResult = await duplicateRes.json();

if (duplicateResult.exists) {
  setShowDuplicateDialog(true);
  setIsSubmitting(false);
  return;
}

setPendingApplication({
  ...data,
  resume,
  customPosition,
});

setShowOtpDialog(true);

return;
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
const handleOtpVerified = async () => {
  if (!pendingApplication) return;

  const data = pendingApplication;
  const resume = pendingApplication.resume;
  const finalPosition = data.customPosition || data.position;

  try {
    setIsSubmitting(true);

    const payload = {
  "Application Type": "Experienced Professional",
  "Position": finalPosition,
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
const scriptURL = getSheetUrlOrThrow("experienced");

const sheetResult = await sendToGoogleSheet(
  payload,
  scriptURL
);

if (!sheetResult.success) {
  throw new Error("Google Sheet submission failed.");
}
const formData = new FormData();

formData.append("name", data.fullName);
formData.append("email", data.email);
formData.append("phone", data.phone);
formData.append("skills", data.skills);
formData.append("position", finalPosition);
formData.append("experience", data.employmentPosition);
formData.append("address", data.address);

formData.append(
  "undergraduate_institution",
  data.undergradInstitution
);

formData.append(
  "undergraduate_degree",
  data.undergradDegree
);

formData.append(
  "undergraduate_year",
  data.undergradYear
);

formData.append(
  "postgraduate_institution",
  data.postgradInstitution || ""
);

formData.append(
  "postgraduate_degree",
  data.postgradDegree || ""
);

formData.append(
  "postgraduate_year",
  data.postgradYear || ""
);

formData.append("company", data.company);
formData.append("employment_position", data.employmentPosition);
formData.append("start_date", data.startDate);
formData.append("end_date", data.endDate);
formData.append("responsibilities", data.responsibilities);

formData.append(
  "reference_name",
  data.referenceName || ""
);

formData.append(
  "reference_relationship",
  data.referenceRelationship || ""
);

formData.append(
  "reference_phone",
  data.referencePhone || ""
);

if (resume) {
  formData.append("resume", resume);
}
const emailRes = await fetch(
  "https://virach-website.onrender.com/send-email",
  {
    method: "POST",
    body: formData,
  }
);

if (!emailRes.ok) {
  throw new Error("Failed to submit application.");
}
form.reset();

setResume(null);

setPendingApplication(null);

setShowOtpDialog(false);

setShowSuccess(true);

onOpenChange(false);

toast.success("Application submitted successfully.");

  } catch (error) {
    console.error(error);
    toast.error("Submission failed.");
  } finally {
    setIsSubmitting(false);
  }
};
  return (
      <>
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
    <FormItem className="relative">
      <FormLabel>Position Applied For</FormLabel>

      <div ref={dropdownRef} className="relative">

        <FormControl>
          <div className="flex items-center border rounded-md h-12 px-3">

            {isOtherSelected ? (
              <>
                <span className="text-gray-600 mr-2 whitespace-nowrap">
                  Other :
                </span>

                <input
                  type="text"
                  value={customPosition}
                  onChange={(e) => {
                    setCustomPosition(e.target.value);
                  }}
                  placeholder="Enter Position"
                  className="flex-1 outline-none bg-transparent"
                />
              </>
            ) : (
              <Input
                value={field.value}
                readOnly
                placeholder="Select Position"
                onClick={() =>
                  setShowPositions((prev) => !prev)
                }
                className="border-0 shadow-none p-0 h-auto focus-visible:ring-0"
              />
            )}

          </div>
        </FormControl>

        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
          onClick={() =>
            setShowPositions((prev) => !prev)
          }
        />

        {showPositions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">

            {JOB_POSITIONS.map((job) => (
              <div
                key={job}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  if (job === "Other") {
                    setIsOtherSelected(true);
                    setCustomPosition("");
                    field.onChange("Other");
                  } else {
                    setIsOtherSelected(false);
                    setCustomPosition("");
                    field.onChange(job);
                  }

                  setShowPositions(false);
                }}
              >
                {job}
              </div>
            ))}

          </div>
        )}

      </div>

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
            {/* Resume Upload */}
<div className="space-y-4">
  <h3 className="text-lg font-semibold border-b pb-2">
    Resume / CV
  </h3>

  <div>
    <label className="block text-sm font-medium mb-2">
      Upload Resume
    </label>

    <Input
      type="file"
      accept=".pdf,.doc,.docx"
      onChange={(e) => {
        if (e.target.files?.[0]) {
          setResume(e.target.files[0]);
        }
      }}
    />
  </div>
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

{showSuccess && (
  <Dialog
    open={showSuccess}
    onOpenChange={setShowSuccess}
  >
    <DialogContent className="max-w-md text-center">
      <div className="flex flex-col items-center gap-4 py-4">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-5xl">
          ✓
        </div>

        <h2 className="text-3xl font-bold">
          Thank You!
        </h2>

        <p>
          Your application has been submitted successfully.
        </p>

        <Button
          onClick={() => setShowSuccess(false)}
          className="w-full"
        >
          OK
        </Button>
      </div>
    </DialogContent>
  </Dialog>
)}
{showDuplicateDialog && (
  <Dialog
    open={showDuplicateDialog}
    onOpenChange={setShowDuplicateDialog}
  >
    <DialogContent className="max-w-md text-center">
      <div className="flex flex-col items-center gap-4 py-4">

        <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-5xl">⚠️</span>
        </div>

        <h2 className="text-3xl font-bold text-orange-600">
          Application Already Exists
        </h2>

        <p className="text-muted-foreground leading-7">
          This phone number has already been used to submit an application.
          Please use a different phone number or contact the HR team if you believe this is an error.
        </p>

        <Button
          onClick={() => setShowDuplicateDialog(false)}
          className="w-full bg-orange-500 hover:bg-orange-600"
        >
          OK
        </Button>

      </div>
    </DialogContent>
  </Dialog>
)}
{pendingApplication && (
  <OtpDialog
    open={showOtpDialog}
    onOpenChange={setShowOtpDialog}
    phone={pendingPhone}
    onVerify={handleOtpVerified}
    onResend={async () => {}}
    onClose={() => {
      setShowOtpDialog(false);
      setPendingApplication(null);
      setIsSubmitting(false);
    }}
  />
)}
</>
);
};
