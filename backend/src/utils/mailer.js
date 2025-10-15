import nodemailer from 'nodemailer';

export const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('EMAIL_USER/EMAIL_PASS not set. OTP emails will not send.');
  }
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOtpEmail = async ({ to, otp }) => {
  const transporter = createTransporter();
  const info = await transporter.sendMail({
    from: `Daily Helper <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your Daily Helper OTP',
    text: `Your Daily Helper OTP is ${otp}.`,
  });
  return info;
};


