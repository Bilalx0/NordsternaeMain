import { NextResponse } from 'next/server';
import { cmsFetch } from '@/utils/apiClient';

export async function GET(request) {
  try {
    // Extract query parameters from the request
    const { searchParams } = new URL(request.url);
    const reference = searchParams.get('reference');

    console.log(`[API GET /api/cms/properties] Reference query: ${reference}`);

    // Pass query parameters to cmsFetch
    const data = await cmsFetch('properties', {}, { reference });

    // If a reference is provided, ensure the response is a single object or null
    if (reference) {
      const filteredData = Array.isArray(data) ? data.find(item => item.reference === reference) || null : data;
      console.log(`[API GET /api/cms/properties] Filtered data for reference ${reference}:`, filteredData);
      return NextResponse.json(filteredData, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    }

    // Return all properties if no reference is provided
    console.log(`[API GET /api/cms/properties] Returning all properties:`, data);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error(`[API GET /api/cms/properties] Error: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}