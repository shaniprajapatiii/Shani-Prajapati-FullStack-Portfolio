import nodemailer from 'nodemailer';
import { env } from '../config/env';

// Create transporter
const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: env.smtp.port === 465, // true for 465, false for other ports like 587
  auth: {
    user: env.smtp.user,
    pass: env.smtp.pass,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

// Verify connection at startup (optional, useful for debugging)
transporter.verify((error, success) => {
  if (error) {
    console.error('[MAILER] Connection error:', error);
  } else {
    console.log('[MAILER] SMTP connection verified');
  }
});

export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send email using configured SMTP
 */
export const sendMail = async (options: SendMailOptions): Promise<void> => {
  try {
    console.log('[MAILER] Sending email to:', options.to);
    const result = await transporter.sendMail({
      from: env.smtp.user,
      ...options,
    });
    console.log('[MAILER] Email sent successfully:', result.messageId);
  } catch (error) {
    console.error('[MAILER] Failed to send email:', error);
    throw error;
  }
};

/**
 * Send contact message to owner
 */
export const sendContactMessageToOwner = async (
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<void> => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Message</h2>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p><strong>From:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Subject:</strong> ${subject}</p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <h3 style="color: #333;">Message:</h3>
      <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${escapeHtml(message)}</p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p style="font-size: 12px; color: #999;">
        <em>This message was sent through your portfolio contact form.</em>
      </p>
    </div>
  `;

  console.log('[MAILER] Sending contact message to owner:', env.ownerEmail);
  await sendMail({
    to: env.ownerEmail,
    subject: `New Contact: ${subject}`,
    html: htmlContent,
  });
};

/**
 * Send confirmation email to user
 */
export const sendContactConfirmation = async (
  name: string,
  email: string
): Promise<void> => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Message Received</h2>
      
      <p>Hi ${escapeHtml(name)},</p>
      
      <p style="line-height: 1.6; color: #555;">
        Thank you for reaching out! I've received your message and will get back to you as soon as possible.
      </p>
      
      <p style="line-height: 1.6; color: #555;">
        In the meantime, feel free to check out my work or connect with me on social media.
      </p>
      
      <p style="margin-top: 30px; color: #555;">
        Best regards,<br>
        Sankalp Prajapati
      </p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      
      <p style="font-size: 12px; color: #999;">
        <em>This is an automated response. Please do not reply to this email.</em>
      </p>
    </div>
  `;

  console.log('[MAILER] Sending confirmation email to:', email);
  await sendMail({
    to: email,
    subject: 'We received your message',
    html: htmlContent,
  });
};

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
