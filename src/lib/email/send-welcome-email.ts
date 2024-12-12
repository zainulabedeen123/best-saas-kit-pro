import { render } from '@react-email/render';
import { WelcomeEmail } from './templates/WelcomeEmail';
import { sendEmail } from './index';

export const sendWelcomeEmail = async ({
  email,
  username,
  loginUrl,
}: {
  email: string;
  username: string;
  loginUrl?: string;
}) => {
  console.log('Rendering welcome email for:', { email, username, loginUrl });
  
  const welcomeEmailComponent = WelcomeEmail({ username, loginUrl });
  const emailHtml = render(welcomeEmailComponent);
  
  console.log('Email component rendered successfully');

  return sendEmail({
    to: email,
    subject: 'Welcome to Best SAAS Kit Pro! 🚀',
    react: welcomeEmailComponent,
  });
}; 