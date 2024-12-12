import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export type EmailPayload = {
  to: string;
  subject: string;
  react: JSX.Element;
};

export const sendEmail = async ({ to, subject, react }: EmailPayload) => {
  try {
    const data = await resend.emails.send({
      from: 'Best SAAS Kit <onboarding@resend.dev>',
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}; 