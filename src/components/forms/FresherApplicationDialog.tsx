import { useState, useMemo, useRef, useEffect } from "react";
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
import { ChevronDown } from "lucide-react";

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
  const [resume, setResume] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
const [pendingApplication, setPendingApplication] = useState<
  (FresherFormData & {
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

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
const pendingPhone = useMemo(
  () => pendingApplication?.phone ?? "",
  [pendingApplication]
);
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
  
useEffect(() => {
  const subscription = form.watch((value) => {
    console.log("FORM VALUES:", value);
  });

  return () => subscription.unsubscribe();
}, [form]);
  const onSubmit = async (data: FresherFormData) => {

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
formData.append("address", data.address);

formData.append(
  "undergraduate_institution",
  data.ugSchool
);

formData.append(
  "undergraduate_degree",
  data.ugDegree
);

formData.append(
  "undergraduate_year",
  data.ugYearCompleted
);

formData.append(
  "postgraduate_institution",
  data.pgSchool || ""
);

formData.append(
  "postgraduate_degree",
  data.pgDegree || ""
);

formData.append(
  "postgraduate_year",
  data.pgYearCompleted || ""
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

const duplicateData = await duplicateRes.json();

if (duplicateData.exists) {
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
setIsSubmitting(false);

return;
} catch (error) {
  console.error(error);
  toast.error("Failed to submit application.");
} finally {
  setIsSubmitting(false);
}
};
const handleOtpVerified = async () => {
  if (!pendingApplication) return;

  setIsSubmitting(true);

  const data = pendingApplication;
const resume = pendingApplication.resume;

const finalPosition = data.customPosition || data.position;


  try {
    console.log("OTP Verified");
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
formData.append("address", data.address);

formData.append("undergraduate_institution", data.ugSchool);
formData.append("undergraduate_degree", data.ugDegree);
formData.append("undergraduate_year", data.ugYearCompleted);

formData.append("postgraduate_institution", data.pgSchool || "");
formData.append("postgraduate_degree", data.pgDegree || "");
formData.append("postgraduate_year", data.pgYearCompleted || "");

formData.append("reference_name", data.referenceName || "");
formData.append("reference_relationship", data.referenceRelationship || "");
formData.append("reference_phone", data.referencePhone || "");

if (resume) {
  formData.append("resume", resume);
}
const payload = {
position: finalPosition,
  fullName: data.fullName,
  address: data.address,
  phone: data.phone,
  email: data.email,
  ugSchool: data.ugSchool,
  ugDegree: data.ugDegree,
  ugYearCompleted: data.ugYearCompleted,
  pgSchool: data.pgSchool,
  pgDegree: data.pgDegree,
  pgYearCompleted: data.pgYearCompleted,
  skills: data.skills,
  referenceName: data.referenceName,
  referenceRelationship: data.referenceRelationship,
  referencePhone: data.referencePhone,
};

const scriptURL = getSheetUrlOrThrow("fresher");

const sheetResult = await sendToGoogleSheet(
  payload,
  scriptURL
);

if (!sheetResult.success) {
  throw new Error("Google Sheet submission failed.");
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

setShowSuccess(true);

onOpenChange(false);

toast.success("Application submitted successfully.");
    // Next step we'll submit everything here.

  } catch (error) {
    console.error(error);
    toast.error("Submission failed.");
  } finally {
    setShowOtpDialog(false);
    setPendingApplication(null);
    setIsSubmitting(false);
  }
};
  return (
    <>
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
        onClick={() => setShowPositions((prev) => !prev)}
        className="border-0 shadow-none p-0 h-auto focus-visible:ring-0"
      />
    )}

  </div>
</FormControl>
  <ChevronDown
    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
    onClick={() => setShowPositions((prev) => !prev)}
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
                      <FormMessage/>
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