import { NextResponse } from 'next/server';
import { cmsFetch } from '@/utils/apiClient';

export async function GET() {
  try {
    const data = await cmsFetch('neighborhoods');
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}