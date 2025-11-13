import { NextResponse } from 'next/server';

// These API routes are placeholders for when you want to add server-side storage
// Currently, the app uses localStorage for client-side storage

export async function GET() {
  return NextResponse.json({ message: 'Journal API endpoint - currently using localStorage' });
}

export async function POST(request: Request) {
  const data = await request.json();
  // You can add server-side storage logic here later
  return NextResponse.json({ success: true, data });
}
