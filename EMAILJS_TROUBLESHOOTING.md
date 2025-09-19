# EmailJS Troubleshooting Guide

## Current Status
✅ EmailJS package is installed (`@emailjs/browser@4.4.1`)  
✅ Code implementation is complete  
✅ Debugging logs added  
❓ **Issue**: EmailJS not working - needs investigation

## Step-by-Step Troubleshooting

### 1. **Check EmailJS Dashboard Setup**

**Login to EmailJS Dashboard:**
- Go to [emailjs.com](https://www.emailjs.com)
- Login to your account
- Navigate to "Email Templates"

**Verify Templates Exist:**
- Check if `template_fresher_app` exists
- Check if `template_experienced_app` exists
- If templates don't exist, create them using the HTML from `EMAILJS_TEMPLATES_GUIDE.md`

**Verify Service Configuration:**
- Go to "Email Services" 
- Confirm service ID `service_8kqtneq` is active
- Check if the service is properly connected to your email provider

### 2. **Test EmailJS Templates**

**Create Test Templates (if missing):**

**Template 1: Fresher Application**
- Template ID: `template_fresher_app`
- Subject: `New Fresher Job Application - {{full_name}}`
- Content: Use the HTML from the guide

**Template 2: Experienced Application**
- Template ID: `template_experienced_app`
- Subject: `New Experienced Job Application - {{full_name}}`
- Content: Use the HTML from the guide

### 3. **Check Browser Console**

**Open Developer Tools:**
1. Press `F12` or right-click → "Inspect"
2. Go to "Console" tab
3. Submit a test application form
4. Look for these debug messages:

**Expected Debug Output:**
```javascript
EmailJS Debug Info: {
  serviceId: "service_8kqtneq",
  templateId: "template_fresher_app", // or "template_experienced_app"
  applicationType: "fresher", // or "experienced"
  payloadKeys: ["position_applied", "full_name", ...],
  payloadSample: {
    position_applied: "Frontend Developer",
    full_name: "John Doe",
    email_address: "john@example.com"
  }
}
```

**If Success:**
```javascript
EmailJS Success: { status: 200, text: "OK" }
```

**If Error:**
```javascript
EmailJS career application send error: [Error details]
Error details: {
  errorType: "object",
  errorMessage: "Template not found", // or other error
  errorStack: "..."
}
```

### 4. **Common Error Solutions**

**Error: "Template not found"**
- **Solution**: Create the templates in EmailJS dashboard
- **Template IDs must match exactly**: `template_fresher_app` and `template_experienced_app`

**Error: "Service not found"**
- **Solution**: Verify service ID `service_8kqtneq` exists and is active
- **Check**: Service is properly connected to email provider

**Error: "Invalid public key"**
- **Solution**: Verify public key `Ed51CruoXIRPRh6DF` is correct
- **Check**: Public key is active in EmailJS dashboard

**Error: "Network error" or "CORS error"**
- **Solution**: Check internet connection
- **Solution**: Try from different network/browser
- **Solution**: Clear browser cache

**Error: "Template variables not found"**
- **Solution**: Ensure all template variables are properly mapped
- **Check**: Template uses correct variable names (e.g., `{{full_name}}`, not `{{fullName}}`)

### 5. **Test EmailJS Manually**

**Create a simple test:**

1. **Open Browser Console** (F12)
2. **Run this test code:**
```javascript
// Test EmailJS connection
emailjs.init("Ed51CruoXIRPRh6DF");

// Test with minimal data
const testPayload = {
  position_applied: "Test Position",
  full_name: "Test User",
  email_address: "test@example.com",
  address: "Test Address",
  phone_number: "1234567890",
  ug_institution: "Test University",
  ug_degree: "Test Degree",
  ug_year: "2024",
  pg_institution: "N/A",
  pg_degree: "N/A",
  pg_year: "N/A",
  company_name: "N/A (Fresher)",
  position_held: "N/A (Fresher)",
  start_date: "N/A",
  end_date: "N/A",
  key_responsibilities: "N/A (Fresher)",
  skills_and_qualifications: "Test Skills",
  reference_name: "N/A",
  reference_relationship: "N/A",
  reference_phone: "N/A",
  submission_date: new Date().toLocaleDateString()
};

// Test fresher template
emailjs.send("service_8kqtneq", "template_fresher_app", testPayload, { publicKey: "Ed51CruoXIRPRh6DF" })
  .then(result => console.log("Test Success:", result))
  .catch(error => console.error("Test Error:", error));
```

### 6. **Verify EmailJS Account Status**

**Check Account Limits:**
- Free accounts have monthly email limits
- Check if you've exceeded the limit
- Upgrade to paid plan if needed

**Check Account Status:**
- Ensure account is not suspended
- Verify email verification is complete

### 7. **Alternative Debugging Steps**

**Check Network Tab:**
1. Open Developer Tools → "Network" tab
2. Submit form
3. Look for requests to `api.emailjs.com`
4. Check response status and error messages

**Check Application Logs:**
1. Look for any JavaScript errors in console
2. Check if EmailJS library loaded properly
3. Verify no CORS issues

### 8. **Quick Fix Checklist**

- [ ] Templates exist in EmailJS dashboard
- [ ] Template IDs match exactly (`template_fresher_app`, `template_experienced_app`)
- [ ] Service ID `service_8kqtneq` is active
- [ ] Public key `Ed51CruoXIRPRh6DF` is correct
- [ ] Account is not suspended or over limit
- [ ] Internet connection is stable
- [ ] Browser console shows debug information
- [ ] No JavaScript errors in console

### 9. **Contact Support**

**If issues persist:**
1. **EmailJS Support**: Contact through their dashboard
2. **Check EmailJS Documentation**: [emailjs.com/docs](https://www.emailjs.com/docs)
3. **Community Forums**: EmailJS community support

## Next Steps

1. **Run the application** and submit a test form
2. **Check browser console** for debug messages
3. **Verify templates exist** in EmailJS dashboard
4. **Test manually** using the console test code
5. **Report specific error messages** for further assistance

## Expected Behavior

When working correctly:
- Form submission shows "Application submitted successfully!"
- Email is sent to `hr.virach@gmail.com`
- Console shows "EmailJS Success" message
- Google Sheets data is also saved

When there's an issue:
- Form shows "Application submitted to database, but email notification failed"
- Console shows detailed error information
- Google Sheets data is still saved (fallback works)
