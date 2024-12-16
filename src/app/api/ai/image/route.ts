import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    baseURL: process.env.OPENAI_API_BASE_URL,
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const supabase = createRouteHandlerClient({ cookies });
        const { messages } = await req.json();

        // Check authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser ();
        if (authError || !user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check if user has enough credits
        const { data: credits, error: creditsError } = await supabase
            .from('user_credits')
            .select('credits')
            .eq('user_id', user.id)
            .single();

        if (creditsError) {
            console.error('Error fetching credits:', creditsError);
            return NextResponse.json(
                { error: 'Error checking credits' },
                { status: 500 }
            );
        }

        if (!credits || credits.credits < 1) {
            return NextResponse.json(
                { error: 'Insufficient credits' },
                { status: 402 }
            );
        }

        // Call the OpenAI API 
        const completion = await openai.chat.completions.create({
            model: "flux",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: messages || "A cute cat sitting on a couch", // Use messages directly
                },
            ],
        });

        // Deduct credits
        const { error: updateError } = await supabase
            .from('user_credits')
            .update({
                credits: credits.credits - 1,
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', user.id);

        if (updateError) {
            console.error('Error updating credits:', updateError);
            // Continue anyway since we've already made the API call
        }

        // Ensure there are valid choices in the response 
        if (!completion.choices || completion.choices.length === 0 || !completion.choices[0].message) {
            return NextResponse.json({ error: "No valid response from OpenAI" }, { status: 500 });
        }

        // Extract the message content safely (checking for null or undefined) 
        const messageContent = completion.choices[0]?.message?.content;

        if (messageContent) {
            // Extract the image URL from the content if it exists 
            const match = messageContent.match(/\((https:\/\/[^\)]+)\)/);
            const imageUrl = match ? match[1] : null;

            // Return the image URL in the response 
            return NextResponse.json({
                imageUrl: imageUrl || null,
            });
        } else {
            // Handle the case where the content is null or missing 
            console.error("No content available in the response message.");
            return NextResponse.json(
                { error: "No content available in the response message." },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error with OpenAI API:", error);
        return NextResponse.json(
            { error: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}
