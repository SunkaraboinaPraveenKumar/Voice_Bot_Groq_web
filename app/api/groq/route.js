import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

// Initialize the Groq client
const client = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY, // Ensure your API key is set in .env.local
});

const BEST_MODEL = 'llama-3.3-70b-versatile'; 

export async function POST(req) {
  try {
    // Parse the request body
    const { prompt } = await req.json();
    console.log('Received prompt:', { prompt });

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Call the Groq API with the best model
    const response = await client.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: BEST_MODEL,
    });
    
    return NextResponse.json({
      message: response.choices[0]?.message.content || 'No response from model',
    });
  } catch (error) {
    console.error('Error during chat completion:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong' },
      { status: 500 }
    );
  }
}
