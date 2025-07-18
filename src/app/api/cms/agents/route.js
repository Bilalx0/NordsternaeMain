import { NextResponse } from 'next/server';
import { cmsFetch } from '@/utils/apiClient';

export async function GET(request) {
  try {
    // Extract query parameters from the request
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    const licenseNumber = searchParams.get('licenseNumber');

    console.log(`[API GET /api/cms/agents] Query - name: ${name}, licenseNumber: ${licenseNumber}`);

    // Pass query parameters to cmsFetch
    const queryParams = {};
    if (name) queryParams.name = name;
    if (licenseNumber) queryParams.licenseNumber = licenseNumber;

    const data = await cmsFetch('agents', {}, queryParams);

    // If a query parameter is provided, return a single matching agent or null
    if (name || licenseNumber) {
      const field = name ? 'name' : 'licenseNumber';
      const value = name || licenseNumber;
      let filteredData = null;

      if (Array.isArray(data)) {
        filteredData = data.find(item => item[field] === value) || null;
      } else if (data && typeof data === 'object' && data[field] === value) {
        filteredData = data;
      }

      console.log(`[API GET /api/cms/agents] Filtered data for ${field}=${value}:`, filteredData);
      return NextResponse.json(filteredData , {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    }

    // Return all agents if no query parameters are provided
    console.log(`[API GET /api/cms/agents] Returning all agents:`, data);
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error) {
    console.error(`[API GET /api/cms/agents] Error: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}