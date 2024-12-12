import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email/send-welcome-email';

export async function POST(request: Request) {
  try {
    const { email, username, loginUrl } = await request.json();

    if (!email || !username) {
      return NextResponse.json(
        { error: 'Email and username are required' },
        { status: 400 }
      );
    }

    const result = await sendWelcomeEmail({
      email,
      username,
      loginUrl: loginUrl || `${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in`,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send welcome email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 