const CMS_API_BASE_URL = 'https://nordsternae.vercel.app/api';

export async function cmsFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${CMS_API_BASE_URL}/${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`CMS API error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    throw new Error(`Failed to fetch from CMS: ${error.message}`);
  }
}