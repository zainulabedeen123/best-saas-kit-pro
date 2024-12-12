import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
console.log('RESEND_API_KEY status:', RESEND_API_KEY ? 'Present' : 'Missing');

if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

export const resend = new Resend(RESEND_API_KEY);

export type EmailPayload = {
  to: string;
  subject: string;
  react: JSX.Element;
};

export const sendEmail = async ({ to, subject, react }: EmailPayload) => {
  try {
    console.log('Attempting to send email to:', to);
    const data = await resend.emails.send({
      from: 'Best SAAS Kit <onboarding@resend.dev>',
      to,
      subject,
      react,
    });
    console.log('Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}; 