const CMS_API_BASE_URL = 'https://nordsternae.vercel.app/api';

export async function cmsFetch(endpoint, options = {}, queryParams = {}) {
  try {
    // Build query string from queryParams
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });
    const queryString = searchParams.toString();
    const url = queryString ? `${CMS_API_BASE_URL}/${endpoint}?${queryString}` : `${CMS_API_BASE_URL}/${endpoint}`;

    console.log(`[cmsFetch] Fetching from URL: ${url}`);

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      console.error(`[cmsFetch] Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      throw new Error(`CMS API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`[cmsFetch] Response for ${url}:`, data);
    return data;
  } catch (error) {
    console.error(`[cmsFetch] Error: ${error.message}`);
    throw new Error(`Failed to fetch from CMS: ${error.message}`);
  }
}