const express = require("express");
const { Resend } = require("resend");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
require("dotenv").config();
const supabase = require("./supabaseClient");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({
  dest: "uploads/"
});

const resend = new Resend(process.env.RESEND_API_KEY);
const HR_EMAIL = "team@virach.in";
const FROM_EMAIL = "noreply@virach.in";
app.post("/check-application-duplicate", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    const { data, error } = await supabase
      .from("applications")
      .select("id")
      .eq("phone", phone);

    if (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
      });
    }

    return res.json({
      exists: data.length > 0,
    });

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
    });
  }
});
 //Send OTP
app.post("/send-otp", async (req, res) => {
  console.log("/SEND OTP REQUEST RECEIVED ===");
  console.log("Request Body:", req.body);

  try {
    const { phone } = req.body;

    // Normalize phone number
    const mobile = phone.replace(/\D/g, "");

    console.log("Mobile sent to MSG91:", mobile);
    console.log("Template ID:", process.env.MSG91_TEMPLATE_ID);

    const response = await axios.post(
      "https://control.msg91.com/api/v5/otp",
      {
        otp_length: 6,
        otp_expiry: 10,
      },
      {
        params: {
          template_id: process.env.MSG91_TEMPLATE_ID,
          mobile: mobile,
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    console.log("MSG91 Status:", response.status);
    console.log("MSG91 Response:", response.data);

    return res.json({
      success: true,
      message: "OTP sent successfully",
      data: response.data,
    });

  } catch (err) {
    console.error("MSG91 Error:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      message: "Unable to send OTP",
    });
  }
});
//Verify OTP
app.post("/verify-otp", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const response = await axios.get(
      "https://control.msg91.com/api/v5/otp/verify",
      {
        params: {
          mobile: `91${phone}`,
          otp,
          authkey: process.env.MSG91_AUTH_KEY,
        },
      }
    );

    return res.json({
      success: true,
      ...response.data,
    });

  } catch (err) {
    console.error(err.response?.data || err.message);

    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  }
});
app.post("/send-email", upload.single("resume"), async (req, res) => {
  // Get form data first
  const { name, email, phone, skills, position, experience } = req.body;
  const resumeFile = req.file;
  console.log("Resume File:", resumeFile);
  // Format candidate name
  const formattedName = name
    .split(" ")
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");

  try {
    // Check if phone number already exists
// Check if phone number already exists
console.log("====================================");
console.log("Request Body:", req.body);
console.log("Phone received:", phone);
console.log("Phone Type:", typeof phone);
console.log("Phone Length:", phone?.length);

const { data: existingPhone, error: phoneCheckError } = await supabase
  .from("applications")
  .select("id, phone")
  .eq("phone", phone);

console.log("Supabase Result:", existingPhone);
console.log("Result Length:", existingPhone?.length);
console.log("Phone Check Error:", phoneCheckError);
console.log("====================================");

if (existingPhone && existingPhone.length > 0) {
  console.log(">>>> RETURNING 409 <<<<");

  return res.status(409).json({
    success: false,
    message: "Phone number already exists.",
  });
}

console.log("AAAAAAAAAAAA INSERT STARTING AAAAAAAAAAAA");

if (phoneCheckError) {
  console.error("Phone Check Error:", phoneCheckError);

  return res.status(500).json({
    success: false,
    message: "Error checking phone number.",
  });
}


        // Store application data in Supabase
    const { error: supabaseError } = await supabase
      .from("applications")
      .insert([
        {
          application_type: experience || "Fresher",
          position: position || "",
          full_name: formattedName || "",
          address: req.body.address || "",
          phone: phone || "",
          email: email || "",

          undergraduate_institution:
            req.body.undergraduate_institution || "",

          undergraduate_degree:
            req.body.undergraduate_degree || "",

          undergraduate_year:
            req.body.undergraduate_year || "",

          postgraduate_institution:
            req.body.postgraduate_institution || "",

          postgraduate_degree:
            req.body.postgraduate_degree || "",

          postgraduate_year:
            req.body.postgraduate_year || "",

          company:
            req.body.company || "",

          employment_position:
            req.body.employment_position || "",

          start_date:
            req.body.start_date || "",

          end_date:
            req.body.end_date || "",

          responsibilities:
            req.body.responsibilities || "",

          skills:
            skills || "",

          resume_url:
            resumeFile ? resumeFile.path : "",

          reference_name:
            req.body.reference_name || "",

          reference_relationship:
            req.body.reference_relationship || "",

          reference_phone:
            req.body.reference_phone || "",

          created_at: new Date(),
        },
      ]);

    if (supabaseError) {
      console.error("Supabase Error:", supabaseError);
    }
    // Candidate email
    await resend.emails.send({
  from: FROM_EMAIL,
  to:email,
  subject: `New Application - ${formattedName}`,


  html: `
<div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">

  <div style="
    width:100%;
    max-width:650px;
    margin:auto;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 4px 20px rgba(0,0,0,0.08);
  ">

    <!-- Header -->
    <div style="
      background: linear-gradient(135deg, #0d6efd, #0a58ca);
      padding:30px;
      text-align:center;
      color:white;
    ">
     <img
  src="https://res.cloudinary.com/dkenzi00l/image/upload/v1780558965/VIRACHBG_logo.png_1_yqwjlb.jpg"
  alt="Virach Logo"
  style="
    width:220px;
    max-width:100%;
    height:auto;
    display:block;
    margin:0 auto;
  "
/>
    </div>

    <!-- Body -->
    <div style="padding:30px; color:#333;">

      <p>Dear ${formattedName},</p>

      <p>
  Warm greetings from <b>Virach IT & Software Solutions Pvt Ltd.</b>!
</p>

      <p>
  Thank you for applying for an opportunity with us.
  We are pleased to confirm that your application has been received successfully.
</p>

<p>
  Our recruitment team will carefully evaluate your profile and qualifications.
  If shortlisted, we will contact you regarding the next stages of the hiring process.
</p>

      <h3>What happens next?</h3>

      <ul style="line-height:2;">
        <li>Application Review</li>
        <li>Resume Screening</li>
        <li>Technical Evaluation</li>
        <li>Interview Process (if shortlisted)</li>
      </ul>

      <div style="
        margin-top:20px;
        padding:20px;
        background:#f8f9fa;
        border-radius:8px;
      ">
        <p><b>Candidate Name:</b> ${formattedName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Position:</b> ${position || "N/A"}</p>
      </div>

      <div style="
        margin-top:20px;
        padding:15px;
        background:#eef4ff;
        border-left:4px solid #0d6efd;
        border-radius:6px;
      ">
        Shortlisted candidates will be contacted via email or phone.
      </div>

    </div>

    <!-- Footer -->
    <div style="
      padding:20px;
      text-align:center;
      font-size:13px;
      color:#777;
      border-top:1px solid #eee;
    ">
    Virach IT & Software Solutions Pvt Ltd.<br/>
      Innovate. Build. Transform.<br/>
      This is an automated email.
    </div>

  </div>
  
</div>
`,

});

    // HR email
    await resend.emails.send({
  from: FROM_EMAIL,
  to: [
  "Virach.web@outlook.com",
  "virach.web@gmail.com"
],
      subject: `${experience === "Experienced" ? "Experienced" : "Fresher"} Application - ${formattedName}`, 


       attachments: resumeFile
    ? [
        {
          filename: resumeFile.originalname,
          content: fs.readFileSync(resumeFile.path).toString("base64"),
        },
      ]
    : [],

      

html: `
<div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">

  <div style="
    max-width:650px;
    margin:auto;
    background:#ffffff;
    border-radius:12px;
    overflow:hidden;
    box-shadow:0 4px 20px rgba(0,0,0,0.08);
  ">

    <!-- Header -->
    <!-- Recruitment Banner -->
<div style="
  background:#1565c0;
  padding:30px;
  text-align:center;
">

  <div style="
    width:100%;
    text-align:center;
  ">
        
<img
  src="https://res.cloudinary.com/dkenzi00l/image/upload/w_300,c_fit/v1780558965/VIRACHBG_logo.png_1_yqwjlb.jpg"
  alt="Virach Logo"
  width="220"
  style="
    width:220px;
    height:auto;
    display:block;
    margin:0 auto;
    border:0;
  "
/>

</div>
</div>

    <!-- Intro -->
    <div style="padding:25px; font-size:15px; color:#444;">
      <p>Hello HR Team,</p>

      <p>
        A new application has been received and is ready for your review.
        Please find the candidate details below.
      </p>
    </div>

    <!-- Candidate Details -->
    <div style="padding:0 25px 25px 25px;">
      <table style="width:100%; border-collapse:collapse;table-layout:fixed;
       font-size:14px;">

        <tr>
          <td style="
  padding:12px;
  font-weight:bold;
  width:35%;
  word-break:break-word;
"> 
Full Name</td>
          <td style="
  padding:12px;
  width:65%;
  word-break:break-word;
">${formattedName}</td>
        </tr>

        <tr style="background:#f8f9fa;">
          <td style="padding:12px; font-weight:bold;">Email</td>
          <td style="padding:12px;word-break:break-word;
  overflow-wrap:break-word;">${email}</td>
        </tr>
        <tr>
  <td style="padding:12px; font-weight:bold;">Applied On</td>
  <td style="padding:12px;">
    ${new Date().toLocaleDateString()}
  </td>
</tr>

        <tr>
          <td style="padding:12px; font-weight:bold;">Phone</td>
          <td style="padding:12px;">${phone || "N/A"}</td>
        </tr>

        <tr style="background:#f8f9fa;">
          <td style="padding:12px; font-weight:bold;">Position</td>
          <td style="padding:12px;">${position || "N/A"}</td>
        </tr>

        <tr>
          <td style="padding:12px; font-weight:bold;">Skills</td>
          <td style="padding:12px;">${skills || "N/A"}</td>
        </tr>

        <tr style="background:#f8f9fa;">
          <td style="padding:12px; font-weight:bold;">Experience</td>
          <td style="padding:12px;">${experience || "N/A"}</td>
        </tr>

      </table>
    </div>

    <!-- Resume Section -->
    <div style="
      margin:0 25px 25px 25px;
      padding:15px;
      background:#eef4ff;
      border-left:4px solid #0d6efd;
      border-radius:6px;
      font-size:14px;
    ">
      📄 Resume has been attached with this email.
    </div>

    <!-- Next Steps -->
    <div style="padding:0 25px 25px 25px; font-size:14px;">
      <p style="font-weight:bold;">Next Steps:</p>
      <ul style="margin:10px 0 0 18px;">
        <li>Review candidate profile</li>
        <li>Verify resume</li>
        <li>Schedule interview if shortlisted</li>
      </ul>
    </div>

    <!-- Footer -->
    <div style="
      padding:20px;
      text-align:center;
      font-size:13px;
      color:#777;
      border-top:1px solid #eee;
    ">
      Submitted via Virach Careers Portal<br/>
      <b>Virach IT & Software Solutions Pvt Ltd.</b> | Innovate. Build. Transform.
    </div>

  </div>
</div>
`,
      
    });

    res.status(200).send("Email sent");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
});
app.listen(5000, () => {
  app.get("/test-resend", async (req, res) => {
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "hr.virach@gmail.com",
      subject: "Resend Test",
      html: "<h1>Resend is Working 🚀</h1>",
    });

    console.log(data);
    res.send("Email Sent");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});
  console.log("Server running on port 5000");
});