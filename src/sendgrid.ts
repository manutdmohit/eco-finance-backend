import sgMail from '@sendgrid/mail';

import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async (to: string, subject: string, data: any) => {
  console.log({ data });

  let htmlContent: any;

  if (data.type === 'buy-home') {
    htmlContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #333; text-align: center;">Mortgage Application Details</h1>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; position: relative;">
      <div style="background-image: url('https://res.cloudinary.com/manutdmohit/image/upload/ECO_FINANCE_LOGO_ryqruv.png'); background-size: contain; background-repeat: no-repeat; position: absolute; top: 20px; right: 20px; width: 150px; height: 150px; margin:auto;"></div>

      <h2 style="color: #666;">Loan Details</h2>
      <p>Type: ${data.type}</p>
      <p>Purchase Amount: $${data.purchaseAmount}</p>
      <p>Deposit Amount: $${data.depositAmount}</p>
      <p>Buying Situation: ${data.buyingSituation}</p>
      <p>First Home Buyer: ${data.firstHomeBuyer}</p>
      <p>Property Status: ${data.propertyStatus}</p>
      <p>Property Use: ${data.propertyUse}</p>
      <p>Choosing a Lender: ${
        data.choosingALender ? data.choosingALender : 'skipped'
      }</p>
      <p>Credit History: ${data.creditHistory}</p>
      <!-- Add more loan details as needed -->
      
      <h2 style="color: #666;">Applicant Information</h2>
      <p>Name: ${data.name}</p>
      <p>Email: ${data.email}</p>
      <p>Phone: ${data.phone}</p>
      <p>Address: ${data.address}</p>
      <p>Employment Type: ${data.employmentType}</p>
      <!-- Add more applicant information as needed -->
    </div>
  </div>
`;
  } else if (data.type === 'refinance') {
    htmlContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #333; text-align: center;">Mortgage Application Details</h1>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; position: relative;">
      <div style="background-image: url('https://res.cloudinary.com/manutdmohit/image/upload/ECO_FINANCE_LOGO_ryqruv.png'); background-size: contain; background-repeat: no-repeat; position: absolute; top: 20px; right: 20px; width: 150px; height: 150px; margin:auto;"></div>

      <h2 style="color: #666;">Loan Details</h2>
      <p>Type: ${data.type}</p>
      <p>Loan Amount: $${data.loanAmount}</p>
      <p>Rate: ${data.rate ? data.rate + '%' : 'skipped'}</p>
      <p>Rate Type: ${data.selectedOption}</p>
      <p>Expiry Date: ${data.expiryDate ? data.expiryDate : 'skipped'}</p>
      <p>Property Use: ${data.purpose}</p>
      <p>Choosing a Lender: ${
        data.choosingALender ? data.choosingALender : 'skipped'
      }</p>
      <p>Credit History: ${data.creditHistory}</p>
      <p>Employment Type: ${data.employmentType}</p>
      <!-- Add more loan details as needed -->
      
      <h2 style="color: #666;">Applicant Information</h2>
      <p>Name: ${data.name}</p>
      <p>Email: ${data.email}</p>
      <p>Phone: ${data.phone}</p>
      <p>Address: ${data.address}</p>
      <!-- Add more applicant information as needed -->
    </div>
  </div>
`;
  }

  const msg = {
    to,
    from: 'themohitsaud@gmail.com', // Replace with your sender email
    subject,
    // text: body,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error: any) {
    console.error('Error sending email:', error);

    console.log(error.response.body);

    throw error; // Re-throw the error for further handling (optional)
  }
};
