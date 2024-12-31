"use server";

const {
  EmailContent,
  EmailProductInfo,
  NotificationType,
} = require("@/types/index");
const nodemailer = require("nodemailer");

const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

async function generateEmailBody(product, type) {
  const THRESHOLD_PERCENTAGE = 40;
  const shortenedTitle =
    product.title.length > 20
      ? `${product.title.substring(0, 20)}...`
      : product.title;

  let subject = "";
  let body = "";

  switch (type) {
    case Notification.WELCOME:
      subject = `Welcome to Price Tracking for ${shortenedTitle}`;
      body = `
        <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f7fc;">
          <h2 style="color: #2c3e50; font-size: 28px;">Welcome to PriceWise 🚀</h2>
          <p style="color: #34495e; font-size: 16px;">You are now tracking <strong>${product.title}</strong>.</p>
          <p style="color: #34495e; font-size: 16px;">Here's an example of how you'll receive updates:</p>
          <div style="border-radius: 8px; border: 1px solid #d5d8dc; padding: 20px; background-color: #ecf0f1; margin-top: 20px;">
            <h3 style="color: #2980b9; font-size: 22px;">${product.title} is back in stock!</h3>
            <p style="color: #34495e; font-size: 16px;">We're excited to let you know that <strong>${product.title}</strong> is now back in stock.</p>
            <p style="color: #34495e; font-size: 16px;">Don't miss out - <a href="${product.url}" target="_blank" rel="noopener noreferrer" style="color: #3498db; text-decoration: none;">buy it now</a>!</p>
            <img src="https://i.ibb.co/pwFBRMC/Screenshot-2023-09-26-at-1-47-50-AM.png" alt="Product Image" style="max-width: 100%; border-radius: 8px; margin-top: 10px;" />
          </div>
          <p style="color: #34495e; font-size: 16px; margin-top: 20px;">Stay tuned for more updates on <strong>${product.title}</strong> and other products you're tracking.</p>
        </div>
      `;
      break;

    case Notification.CHANGE_OF_STOCK:
      subject = `${shortenedTitle} is now back in stock!`;
      body = `
        <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f7fc;">
          <h4 style="color: #2c3e50; font-size: 24px;">Hey, <strong>${product.title}</strong> is now restocked! Grab yours before they run out again!</h4>
          <p style="color: #34495e; font-size: 16px;">See the product <a href="${product.url}" target="_blank" rel="noopener noreferrer" style="color: #3498db; text-decoration: none;">here</a>.</p>
        </div>
      `;
      break;

    case Notification.LOWEST_PRICE:
      subject = `Lowest Price Alert for ${shortenedTitle}`;
      body = `
        <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f7fc;">
          <h4 style="color: #2c3e50; font-size: 24px;">Hey, <strong>${product.title}</strong> has reached its lowest price ever!!</h4>
          <p style="color: #34495e; font-size: 16px;">Grab the product <a href="${product.url}" target="_blank" rel="noopener noreferrer" style="color: #3498db; text-decoration: none;">here</a> now.</p>
        </div>
      `;
      break;

    case Notification.THRESHOLD_MET:
      subject = `Discount Alert for ${shortenedTitle}`;
      body = `
        <div style="font-family: 'Arial', sans-serif; padding: 20px; background-color: #f4f7fc;">
          <h4 style="color: #2c3e50; font-size: 24px;">Hey, <strong>${product.title}</strong> is now available at a discount more than ${THRESHOLD_PERCENTAGE}%!</h4>
          <p style="color: #34495e; font-size: 16px;">Grab it right away from <a href="${product.url}" target="_blank" rel="noopener noreferrer" style="color: #3498db; text-decoration: none;">here</a>.</p>
        </div>
      `;
      break;

    default:
      throw new Error("Invalid notification type.");
  }

  return { subject, body };
}

// Create transporter with Sendinblue credentials
const transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "829d23001@smtp-brevo.com", // Your SendinBlue email address
    pass: process.env.SENDINBLUE_API_KEY, // Your SendinBlue SMTP key
  },
  maxConnections: 5, // Allowing more connections for reliability
});

// Function to send an email
const sendEmail = async (emailContent, sendTo) => {
  try {
    console.log("Generated Email Body:", emailContent);
    console.log("Sending to:", sendTo);

    const mailOptions = {
      from: "amrendravs11082003@gmail.com", // Sender email address
      to: sendTo, // Receiver email addresses
      html: emailContent.body, // Email content (HTML)
      subject: emailContent.subject, // Subject of the email
    };

    // Send email and await result
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: ", info);
  } catch (error) {
    console.error("Error sending email: ", error);
    if (error) {
      console.error("Detailed error response:", error);
    }
  }
};

// Test with a basic email to ensure connection works
const testEmail = async () => {
  try {
    const mailOptions = {
      from: "amrendravs11082003@gmail.com", // Sender email address
      to: "test@example.com", // Test receiver email address
      subject: "Test Email", // Test subject
      text: "This is a test email.", // Simple text email
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Test Email sent successfully: ", info);
  } catch (error) {
    console.error("Error sending test email: ", error);
  }
};

module.exports = { generateEmailBody, sendEmail, testEmail };
