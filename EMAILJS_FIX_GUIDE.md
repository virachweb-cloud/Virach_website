# Updated EmailJS Template Configuration

## Your EmailJS Details
- **Service ID**: `service_8kqtneq`
- **Template ID**: `template_eumn2ma`
- **Public Key**: `Ed51CruoXIRPRh6DF`
- **Private Key**: `v8Mzks39MLW-HS7iXiNoc`

## Template Content for `template_eumn2ma`

Since you already have a template with ID `template_eumn2ma`, you need to update it with the correct template variables that match your form data.

### Template HTML Content:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Job Application - Virach IT & Software Solutions</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0; text-align: center;">Virach IT & Software Solutions</h1>
        <h2 style="color: #34495e; margin: 10px 0; text-align: center;">New Job Application</h2>
        <p style="text-align: center; margin: 0; color: #7f8c8d;">A new application has been received. Details are below.</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 12px; border: 1px solid #bdc3c7; font-weight: bold; width: 30%;">Position Applied For</td>
            <td style="padding: 12px; border: 1px solid #bdc3c7;">{{position_applied}}</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #bdc3c7; font-weight: bold;">Full Name</td>
            <td style="padding: 12px; border: 1px solid #bdc3c7;">{{full_name}}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 12px; border: 1px solid #bdc3c7; font-weight: bold;">Address</td>
            <td style="padding: 12px; border: 1px solid #bdc3c7;">{{address}}</td>
        </tr>
        <tr>
            <td style="padding: 12px; border: 1px solid #bdc3c7; font-weight: bold;">Phone</td>
            <td style="padding: 12px; border: 1px solid #bdc3c7;">{{phone_number}}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 12px; border: 1px solid #bdc3c7; font-weight: bold;">Email</td>
            <td style="padding: 12px; border: 1px solid #bdc3c7;">{{email_address}}</td>
        </tr>
    </table>

    <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Education</h3>
    
    <h4 style="color: #34495e; margin-bottom: 10px;">Undergraduate</h4>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold; width: 30%;">Institution</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{ug_institution}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold;">Degree</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{ug_degree}}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold;">Year</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{ug_year}}</td>
        </tr>
    </table>

    <h4 style="color: #34495e; margin-bottom: 10px;">Postgraduate</h4>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold; width: 30%;">Institution</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{pg_institution}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold;">Degree</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{pg_degree}}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold;">Year</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{pg_year}}</td>
        </tr>
    </table>

    <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Recent Employment</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold; width: 30%;">Company</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{company_name}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold;">Position</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{position_held}}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold;">Start - End</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{start_date}} – {{end_date}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold; vertical-align: top;">Key Responsibilities</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7; white-space: pre-wrap;">{{key_responsibilities}}</td>
        </tr>
    </table>

    <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Skills & Qualifications</h3>
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <p style="margin: 0; white-space: pre-wrap;">{{skills_and_qualifications}}</p>
    </div>

    <h3 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 5px;">Reference</h3>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold; width: 30%;">Name</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{reference_name}}</td>
        </tr>
        <tr>
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold;">Relationship</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{reference_relationship}}</td>
        </tr>
        <tr style="background-color: #ecf0f1;">
            <td style="padding: 10px; border: 1px solid #bdc3c7; font-weight: bold;">Phone</td>
            <td style="padding: 10px; border: 1px solid #bdc3c7;">{{reference_phone}}</td>
        </tr>
    </table>

    <div style="background-color: #2c3e50; color: white; padding: 20px; border-radius: 8px; text-align: center;">
        <h3 style="margin: 0 0 10px 0;">Contact HR</h3>
        <p style="margin: 5px 0;"><strong>Submitted on:</strong> {{submission_date}}</p>
        <p style="margin: 5px 0;"><strong>Virach IT & Software Solutions Pvt Ltd</strong></p>
        <p style="margin: 5px 0;"><strong>Email:</strong> hr.virach@gmail.com</p>
    </div>

</body>
</html>
```

## Steps to Fix EmailJS

### 1. **Update Your EmailJS Template**

1. Go to your EmailJS dashboard
2. Navigate to "Email Templates"
3. Find template `template_eumn2ma`
4. Click "Edit" on the template
5. Replace the template content with the HTML above
6. Save the template

### 2. **Test the Application**

1. Run your application: `npm run dev`
2. Open browser console (F12)
3. Submit a test form (either fresher or experienced)
4. Check console for debug messages

### 3. **Expected Console Output**

You should see:
```javascript
EmailJS Debug Info: {
  serviceId: "service_8kqtneq",
  templateId: "template_eumn2ma",
  applicationType: "fresher", // or "experienced"
  payloadKeys: ["position_applied", "full_name", ...],
  payloadSample: { ... }
}

EmailJS Success: { status: 200, text: "OK" }
```

### 4. **Check EmailJS Dashboard**

After successful submission:
- Go to "Email History" in your EmailJS dashboard
- You should see the email entry
- Check if email was delivered to `hr.virach@gmail.com`

## Template Variables Used

The template now uses these variables that match your form data:
- `{{position_applied}}`
- `{{full_name}}`
- `{{address}}`
- `{{phone_number}}`
- `{{email_address}}`
- `{{ug_institution}}`
- `{{ug_degree}}`
- `{{ug_year}}`
- `{{pg_institution}}`
- `{{pg_degree}}`
- `{{pg_year}}`
- `{{company_name}}`
- `{{position_held}}`
- `{{start_date}}`
- `{{end_date}}`
- `{{key_responsibilities}}`
- `{{skills_and_qualifications}}`
- `{{reference_name}}`
- `{{reference_relationship}}`
- `{{reference_phone}}`
- `{{submission_date}}`

## Why This Will Work

1. **Correct Template ID**: Now using your actual template ID `template_eumn2ma`
2. **Unified Template**: One template handles both fresher and experienced applications
3. **Proper Variable Mapping**: All form fields are mapped to template variables
4. **Fallback Values**: Shows "N/A" for optional fields when not provided

The "No Data" issue was because the code was trying to use template IDs that don't exist in your EmailJS dashboard. Now it will use your existing template!



