import { SendEmailCommand } from "@aws-sdk/client-ses";
import sesClient from "../config/ses.config.js";
import { AWS_SES_SENDER_EMAIL } from "../config/env.js";

const createSendEmailCommand = (toAddress, subject, bodyHtml) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: bodyHtml,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: `NOTEGENIUS_AI <${AWS_SES_SENDER_EMAIL}>`,
  });
};

export const sendOtpEmail = async (email, otp) => {
  const subject = "Email Verification OTP";
  const bodyHtml = `
    <h2>Email Verification</h2>
    <p>Your OTP is: <strong>${otp}</strong></p>
    <p>Valid for 10 minutes only.</p>
  `;

  try {
    const command = createSendEmailCommand(email, subject, bodyHtml);
    await sesClient.send(command);
  } catch (error) {
    console.error("AWS SES Error (sendOtpEmail):", error);
    throw error;
  }
};

export const sendResetPasswordEmail = async (email, otp) => {
  const subject = "Reset Password OTP";
  const bodyHtml = `
    <h2>Reset Password</h2>
    <p>Your OTP is: <strong>${otp}</strong></p>
    <p>Valid for 10 minutes only.</p>
  `;

  try {
    const command = createSendEmailCommand(email, subject, bodyHtml);
    await sesClient.send(command);
  } catch (error) {
    console.error("AWS SES Error (sendResetPasswordEmail):", error);
    throw error;
  }
};