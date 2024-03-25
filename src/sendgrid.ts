import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

// Ensure the SendGrid API key is set
if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set in the environment variables.');
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Define TypeScript interfaces for email data and message
interface EmailData {
  type: string;
  purchaseAmount?: number;
  depositAmount?: number;
  buyingSituation?: string;
  firstHomeBuyer?: string;
  propertyStatus?: string;
  propertyUse?: string;
  choosingALender?: string;
  creditHistory?: string;
  loanAmount?: number;
  rate?: number;
  selectedOption?: string;
  expiryDate?: string;
  propertyValue?: string;
  employmentType?: string;
  purpose?: string;
  experience?: string;
  situation?: string;
  visaResidencyStatus?: string;
  potentialPurchase?: string;
  primaryOccupation?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  state?: string;
  heardAboutUs?: string;
  message?: string;
}

interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  html: string;
}

// Function to generate HTML content based on email type
function generateHtmlContent(data: EmailData): string {
  let htmlContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1 style="color: #333; text-align: center;">Mortgage Application Details</h1>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; position: relative;">
      <div style="background-image: url('https://res.cloudinary.com/manutdmohit/image/upload/ECO_FINANCE_LOGO_ryqruv.png'); background-size: contain; background-repeat: no-repeat; position: absolute; top: 20px; right: 20px; width: 150px; height: 150px; margin:auto;"></div>

      <h2 style="color: #666;">${
        data.type === 'contact' || data.type === 'join'
          ? 'Contact Details'
          : 'Loan Details'
      }</h2>`;

  // Example of generating content based on email type
  if (data.type === 'buy-home') {
    htmlContent += `
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
      <p> Employment Type: ${data.employmentType} </p>

    `;
  } else if (data.type === 'refinance') {
    htmlContent += `
      <p>Type: ${data.type}</p>
      <p>Loan Amount: $${data.loanAmount}</p>
      <p>Rate: ${data.rate ? data.rate + '%' : 'skipped'}</p>
      <p>Rate Type: ${data.selectedOption}</p>
      <p>Expiry Date: ${data.expiryDate ? data.expiryDate : 'skipped'}</p>
      <p>Property Value: $${data.propertyValue}
      <p>Property Use: ${data.purpose}</p>
      <p>Choosing a Lender: ${
        data.choosingALender ? data.choosingALender : 'skipped'
      }</p>
      <p>Credit History: ${data.creditHistory}</p>
      <p> Employment Type: ${data.employmentType} </p>
    `;
  } else if (data.type === 'contact') {
    htmlContent += `
      <p>What best describes your experience?<br />-${data.experience}</p>
      <p>What best describes your situation?<br />- ${data.situation}</p>
      <p>What is your Visa/Residency status in Australia?- <br />: ${data.visaResidencyStatus}</p>
      <p>What is your potential purchase/transaction?<br />- ${data.potentialPurchase}</p>
      <p>What is your primary occupation type<br />- ${data.primaryOccupation}</p>
      <p>First Name<br />- ${data.firstName}</p>
      <p>Last Name<br />- ${data.lastName}</p>
      <p>Email<br />- ${data.email}</p>
      <p>Phone Number<br />- ${data.phoneNumber}</p>
      <p>Please select the state you are living<br />- ${data.state}</p>
      <p>How did you hear about us?<br />- ${data.heardAboutUs}</p>
      <p>Message<br />- ${data.message}</p>
    `;
  } else if (data.type === 'join') {
    htmlContent += `
    <p>Joining Email: ${data.email} </p>
    `;
  }

  htmlContent += `</div></div>`;

  return htmlContent;
}

export const sendEmail = async (
  to: string,
  subject: string,
  data: EmailData
): Promise<void> => {
  const htmlContent = generateHtmlContent(data);

  const msg: EmailMessage = {
    to,
    from: process.env.SENDER_EMAIL || 'themohitsaud@gmail.com', // Use a default or ensure this is set
    subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);

    console.log('Email sent successfully');
  } catch (error: any) {
    console.error('Error sending email:', error);
    // Consider whether re-throwing is necessary
  }
};

export const sendEmailToClient = async (
  to: string,
  subject: string,
  data: EmailData
): Promise<void> => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; text-align: center;">Mortgage Application Details</h1>
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px; position: relative;">
        <a href="https://eco-finance-home-loans.vercel.app/"> <!-- Link added here -->
          <img src="https://res.cloudinary.com/manutdmohit/image/upload/ECO_FINANCE_LOGO_ryqruv.png" alt="Eco Finance Logo" style="width: 150px; height: 150px; margin: auto; display: block;">
        </a> <!-- Link ends here -->
        <h4 style="color: #333;">Thank you for contacting us.</h4>
        <p  style="color: #333;">We have received your mortgage application details and will review them shortly.</p>
        <p  style="color: #333;">In the meantime, feel free to contact us if you have any questions or concerns.</p>
        <p  style="color: #333;">Best regards,<br/>The Eco Finance Team</p>
      </div>
    </div>
  `;

  const msg: EmailMessage = {
    to,
    from: process.env.SENDER_EMAIL || 'themohitsaud@gmail.com', // Use a default or ensure this is set
    subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);

    console.log('Email sent successfully');
  } catch (error: any) {
    console.error('Error sending email:', error);
  }
};
