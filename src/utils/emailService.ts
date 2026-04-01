export async function sendPlanByEmail(email: string, pdfBlob: Blob, userName: string): Promise<boolean> {
  try {
    // Convert blob to base64
    const base64PDF = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };
      reader.readAsDataURL(pdfBlob);
    });

    // For demo purposes, we'll simulate email sending
    // In production, you would integrate with SendGrid, Mailgun, or similar
    console.log(`Sending email to: ${email}`);
    console.log(`PDF size: ${pdfBlob.size} bytes`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real implementation, you would make an API call to your email service
    // const response = await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     to: email,
    //     subject: 'Your Personalized 7-Day Nutrition Plan',
    //     attachment: base64PDF,
    //     userName
    //   })
    // });
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}