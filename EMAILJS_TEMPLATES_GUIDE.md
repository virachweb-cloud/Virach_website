# EmailJS Templates for Career Forms

This guide provides the EmailJS template configurations for both Fresher and Experienced career application forms.

## Service Configuration

- **Service ID**: `service_8kqtneq`
- **Public Key**: `Ed51CruoXIRPRh6DF`

## Template 1: Fresher Application Template

**Template ID**: `template_fresher_app`

### Template Content (HTML):

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Fresher Job Application - Virach IT & Software Solutions</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0; text-align: center;">Virach IT & Software Solutions</h1>
        <h2 style="color: #34495e; margin: 10px 0; text-align: center;">New Fresher Job Application</h2>
        <p style="text-align: center; margin: 0; color: #7f8c8d;">A new fresher application has been received. Details are below.</p>
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

### Template Variables:
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
- `{{skills_and_qualifications}}`
- `{{reference_name}}`
- `{{reference_relationship}}`
- `{{reference_phone}}`
- `{{submission_date}}`

## Template 2: Experienced Application Template

**Template ID**: `template_experienced_app`

### Template Content (HTML):

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Experienced Job Application - Virach IT & Software Solutions</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0; text-align: center;">Virach IT & Software Solutions</h1>
        <h2 style="color: #34495e; margin: 10px 0; text-align: center;">New Experienced Job Application</h2>
        <p style="text-align: center; margin: 0; color: #7f8c8d;">A new experienced professional application has been received. Details are below.</p>
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

### Template Variables:
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

## Setup Instructions

1. **Login to EmailJS Dashboard**: Go to [emailjs.com](https://www.emailjs.com) and login to your account.

2. **Create Templates**:
   - Navigate to "Email Templates" section
   - Click "Create New Template"
   - Use the template IDs: `template_fresher_app` and `template_experienced_app`
   - Copy and paste the HTML content for each template
   - Save both templates

3. **Configure Service**:
   - Ensure your service ID `service_8kqtneq` is properly configured
   - Verify your public key `Ed51CruoXIRPRh6DF` is active

4. **Test Templates**:
   - Use the EmailJS test feature to verify templates work correctly
   - Send test emails to ensure formatting is correct

## Implementation Notes

- Both forms now send data to Google Sheets AND EmailJS simultaneously
- If Google Sheets succeeds but EmailJS fails, the user gets a partial success message
- If both succeed, the user gets a full success message
- The application will still work even if EmailJS is not configured (graceful degradation)
- Template variables are mapped from form data with appropriate fallbacks for optional fields

## Template Features

- **Responsive Design**: Templates work well on desktop and mobile email clients
- **Professional Styling**: Clean, corporate design matching your brand
- **Clear Structure**: Easy to read sections with proper spacing
- **Fallback Values**: Handles optional fields gracefully (shows "N/A" when not provided)
- **Date Formatting**: Automatic submission date inclusion
- **Contact Information**: HR contact details prominently displayed
