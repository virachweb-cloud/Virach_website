// Test script to verify Google Sheets connection
// Run this in browser console to test

async function testGoogleSheets() {
  const scriptURL = "https://script.google.com/macros/s/AKfycbyPqYuligxvr-6k6Z8BsRHIhDygEf2AihJgyOwwCE8kBYwtd0_PFdo4sUE95FjCAe1x2w/exec";
  
  const testData = {
    "Application Type": "Test",
    "Position": "Test Position",
    "Full Name": "Test User",
    "Address": "Test Address",
    "Phone": "1234567890",
    "Email": "test@example.com",
    "Undergraduate School": "Test University",
    "Undergraduate Degree": "Test Degree",
    "Undergraduate Year": "2020",
    "Skills": "Test Skills"
  };

  try {
    const formData = new FormData();
    Object.entries(testData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formData,
    });

    const result = await response.text();
    console.log('Response:', result);
    
    if (response.ok) {
      console.log('✅ Google Sheets connection successful!');
    } else {
      console.log('❌ Google Sheets connection failed:', response.status);
    }
  } catch (error) {
    console.error('❌ Error testing Google Sheets:', error);
  }
}

// Run the test
testGoogleSheets();
