import { NextResponse } from 'next/server';
import { cmsFetch } from '@/utils/apiClient';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const data = await cmsFetch(`banner-highlights/${id}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}