import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendRegistrationEmail = async (email, username) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"NiyogHub Team" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: "Welcome to NiyogHub!",
    html: `
      <p>Hi ${username},</p>
      <p>Welcome to NiyogHub, your ultimate platform for sharing your thoughts, ideas, and stories!</p>
      <p>With NiyogHub, you can:</p>
      <ul>
        <li>Create and publish your own blog posts</li>
        <li>Connect with other writers and readers</li>
        <li>Explore a variety of topics and genres</li>
      </ul>
      <p>Start writing your first post now and inspire others!</p>
      <p>Note: This is an automated message. Please do not reply.</p>
      <p>Happy blogging!</p>
      <p>The NiyogHub Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("An error occurred while sending the email:", error);
  }
};

const sendResetPasswordEmail = async (email, reset_link) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"NiyogHub Team" <${process.env.EMAIL_USERNAME}>`,
    to: email,
    subject: "Reset Your Password",
    html: `
      <p>Hi ${email},</p>
      <p>You've requested to reset your password for your NiyogHub account. Click the link below to reset it:</p>
      <p><a href="${reset_link}">${reset_link}</a></p>
      <p>If you didn't request this change, please ignore this email. This link is valid for the next 24 hours.</p>
      <p>Note: This is an automated message. Please do not reply to this email.</p>
      <p>Best regards,<br/>The NiyogHub Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email} with link ${reset_link}`);
  } catch (error) {
    console.error("An error occurred while sending the password reset email:", error);
  }
};

export { sendRegistrationEmail, sendResetPasswordEmail };
