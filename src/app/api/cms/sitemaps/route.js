import { NextResponse } from 'next/server';
import { cmsFetch } from '@/utils/apiClient';

export async function GET() {
  try {
    const data = await cmsFetch('sitemaps');
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}