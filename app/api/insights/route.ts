import { NextResponse } from 'next/server';

// These API routes are placeholders for when you want to add server-side storage
// Currently, the app uses localStorage for client-side storage

export async function GET() {
  return NextResponse.json({ message: 'Insights API endpoint - currently using localStorage' });
}
