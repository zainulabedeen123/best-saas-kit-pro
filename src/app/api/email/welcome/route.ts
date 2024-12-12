import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email/send-welcome-email';

export async function POST(request: Request) {
  try {
    console.log('Welcome email request received');
    const { email, username, loginUrl } = await request.json();
    console.log('Request data:', { email, username, loginUrl });

    if (!email || !username) {
      console.error('Missing required fields:', { email, username });
      return NextResponse.json(
        { error: 'Email and username are required' },
        { status: 400 }
      );
    }

    console.log('Attempting to send welcome email...');
    const result = await sendWelcomeEmail({
      email,
      username,
      loginUrl: loginUrl || `${process.env.NEXT_PUBLIC_APP_URL}/auth/sign-in`,
    });

    if (!result.success) {
      console.error('Failed to send welcome email:', result.error);
      return NextResponse.json(
        { error: 'Failed to send welcome email', details: result.error },
        { status: 500 }
      );
    }

    console.log('Welcome email sent successfully');
    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error('Error in welcome email route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 