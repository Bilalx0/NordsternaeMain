'use client';
import { useQuery, useMutation } from '@tanstack/react-query';

async function fetchCmsDataById(resource, id) {
  if (!id) {
    console.warn(`[fetchCmsDataById] No ID provided for resource: ${resource}`);
    return null;
  }
  const url = `/api/cms/${resource}/${id}`;
  console.log(`[fetchCmsDataById] Fetching from URL: ${url}`);
  const response = await fetch(url);
  if (!response.ok) {
    console.error(`[fetchCmsDataById] Failed to fetch ${resource} with ID ${id}: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to fetch ${resource} with ID ${id}: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(`[fetchCmsDataById] Fetched data for ${resource}/${id}:`, data);
  return data;
}

async function fetchCmsDataByField(resource, fieldName, fieldValue) {
  if (!fieldValue) {
    console.warn(`[fetchCmsDataByField] No ${fieldName} provided for resource: ${resource}`);
    return null;
  }
  const url = `/api/cms/${resource}?${fieldName}=${encodeURIComponent(fieldValue)}`;
  console.log(`[fetchCmsDataByField] Fetching from URL: ${url}`);
  const response = await fetch(url);
  console.log(`[fetchCmsDataByField] Response status: ${response.status} ${response.statusText}`);
  if (!response.ok) {
    console.error(`[fetchCmsDataByField] Failed to fetch ${resource} by ${fieldName}=${fieldValue}: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to fetch ${resource} by ${fieldName} ${fieldValue}: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(`[fetchCmsDataByField] Raw response for ${resource} by ${fieldName}=${fieldValue}:`, data);

  // Handle both object and array responses
  if (data && typeof data === 'object') {
    if (Array.isArray(data)) {
      // If response is an array, return the first item with matching fieldValue or null
      const matchingItem = data.find(item => item[fieldName] === fieldValue) || null;
      console.log(`[fetchCmsDataByField] Found ${matchingItem ? 'matching' : 'no matching'} item in array for ${fieldName}=${fieldValue}:`, matchingItem);
      return matchingItem;
    }
    // If response is an object and matches fieldValue, return it
    if (data[fieldName] === fieldValue) {
      console.log(`[fetchCmsDataByField] Returning single object for ${fieldName}=${fieldValue}:`, data);
      return data;
    }
    console.warn(`[fetchCmsDataByField] Single object does not match ${fieldName}=${fieldValue}:`, data);
    return null;
  }
  console.warn(`[fetchCmsDataByField] No valid data for ${fieldName}=${fieldValue}:`, data);
  return null;
}

// Fetch single property by reference
export function usePropertyByReference(reference) {
  return useQuery({
    queryKey: ['propertyByReference', reference],
    queryFn: async () => {
      if (!reference) {
        console.warn('[usePropertyByReference] No reference provided');
        throw new Error('No reference provided');
      }
      const data = await fetchCmsDataByField('properties', 'reference', reference);
      if (!data) {
        console.warn(`[usePropertyByReference] No property found for reference: ${reference}`);
        throw new Error(`No property found for reference: ${reference}`);
      }
      console.log(`[usePropertyByReference] Fetched property for reference: ${reference}`, data);
      return data;
    },
    enabled: !!reference,
    staleTime: 0,
    cacheTime: 0,
    retry: 1,
  });
}

// Fetch single agent by name (case-insensitive)
export function useAgentByName(name) {
  return useQuery({
    queryKey: ['agentByName', name?.toLowerCase()],
    queryFn: async () => {
      if (!name) {
        console.warn('[useAgentByName] No name provided');
        return null;
      }
      const data = await fetchCmsDataByField('agents', 'name', name);
      if (!data) {
        console.warn(`[useAgentByName] No agent found for name: ${name}`);
      }
      return data;
    },
    enabled: !!name,
    staleTime: 0,
    cacheTime: 0,
    retry: 1,
  });
}

// Fetch single agent by license number
export function useAgentByLicenseNumber(licenseNumber) {
  return useQuery({
    queryKey: ['agentByLicenseNumber', licenseNumber],
    queryFn: async () => {
      if (!licenseNumber) {
        console.warn('[useAgentByLicenseNumber] No licenseNumber provided');
        return null;
      }
      const data = await fetchCmsDataByField('agents', 'licenseNumber', licenseNumber);
      if (!data) {
        console.warn(`[useAgentByLicenseNumber] No agent found for licenseNumber: ${licenseNumber}`);
      }
      return data;
    },
    enabled: !!licenseNumber,
    staleTime: 0,
    cacheTime: 0,
    retry: 1,
  });
}

// Other hooks remain unchanged
export function useProperties(queryParams = {}) {
  return useQuery({
    queryKey: ['properties', queryParams],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value);
        }
      });
      const queryString = searchParams.toString();
      const url = queryString ? `/api/cms/properties?${queryString}` : '/api/cms/properties';
      console.log('[useProperties] Fetching from URL:', url);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch all properties');
      const data = await response.json();
      console.log('[useProperties] Fetched properties count:', data.length);
      return data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnMount: true,
  });
}

export function useSimilarProperties(propertyType, excludeReference = null) {
  return useQuery({
    queryKey: ['similarProperties', propertyType, excludeReference],
    queryFn: async () => {
      if (!propertyType) {
        console.warn('[useSimilarProperties] No propertyType provided');
        return [];
      }
      const searchParams = new URLSearchParams();
      searchParams.append('propertyType', propertyType);
      if (excludeReference) {
        searchParams.append('excludeReference', excludeReference);
      }
      const queryString = searchParams.toString();
      const url = `/api/cms/properties?${queryString}`;
      console.log('[useSimilarProperties] Fetching from URL:', url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch similar properties: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('[useSimilarProperties] Fetched similar properties count:', data.length);
      return data;
    },
    enabled: !!propertyType,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });
}

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const response = await fetch('/api/cms/agents');
      if (!response.ok) throw new Error('Failed to fetch all agents');
      return response.json();
    },
  });
}

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await fetch('/api/cms/articles');
      if (!response.ok) throw new Error('Failed to fetch all articles');
      return response.json();
    },
  });
}

export function useBannerHighlights() {
  return useQuery({
    queryKey: ['banner-highlights'],
    queryFn: async () => {
      const response = await fetch('/api/cms/banner-highlights');
      if (!response.ok) throw new Error('Failed to fetch all banner highlights');
      return response.json();
    },
  });
}

export function useDevelopers() {
  return useQuery({
    queryKey: ['developers'],
    queryFn: async () => {
      const response = await fetch('/api/cms/developers');
      if (!response.ok) throw new Error('Failed to fetch all developers');
      return response.json();
    },
  });
}

export function useDevelopments() {
  return useQuery({
    queryKey: ['developments'],
    queryFn: async () => {
      const response = await fetch('/api/cms/developments');
      if (!response.ok) throw new Error('Failed to fetch all developments');
      return response.json();
    },
  });
}

export function useEnquiries() {
  return useQuery({
    queryKey: ['enquiries'],
    queryFn: async () => {
      const response = await fetch('/api/cms/enquiries');
      if (!response.ok) throw new Error('Failed to fetch all enquiries');
      return response.json();
    },
  });
}

export function useNeighborhoods() {
  return useQuery({
    queryKey: ['neighborhoods'],
    queryFn: async () => {
      const response = await fetch('/api/cms/neighborhoods');
      if (!response.ok) throw new Error('Failed to fetch all neighborhoods');
      return response.json();
    },
  });
}

export function useSitemaps() {
  return useQuery({
    queryKey: ['sitemaps'],
    queryFn: async () => {
      const response = await fetch('/api/cms/sitemaps');
      if (!response.ok) throw new Error('Failed to fetch all sitemaps');
      return response.json();
    },
  });
}

export function useSingleProperty(id) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchCmsDataById('properties', id),
    enabled: !!id,
  });
}

export function useSingleAgent(id) {
  return useQuery({
    queryKey: ['agent', id],
    queryFn: () => fetchCmsDataById('agents', id),
    enabled: !!id,
  });
}

export function useSingleArticle(id) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchCmsDataById('articles', id),
    enabled: !!id,
  });
}

export function useSingleBannerHighlight(id) {
  return useQuery({
    queryKey: ['banner-highlight', id],
    queryFn: () => fetchCmsDataById('banner-highlights', id),
    enabled: !!id,
  });
}

export function useSingleDeveloper(id) {
  return useQuery({
    queryKey: ['developer', id],
    queryFn: () => fetchCmsDataById('developers', id),
    enabled: !!id,
  });
}

export function useSingleDevelopment(id) {
  return useQuery({
    queryKey: ['development', id],
    queryFn: () => fetchCmsDataById('developments', id),
    enabled: !!id,
  });
}

export function useSingleEnquiry(id) {
  return useQuery({
    queryKey: ['enquiry', id],
    queryFn: () => fetchCmsDataById('enquiries', id),
    enabled: !!id,
  });
}

export function useSingleNeighborhood(id) {
  return useQuery({
    queryKey: ['neighborhood', id],
    queryFn: () => fetchCmsDataById('neighborhoods', id),
    enabled: !!id,
  });
}

export function useSingleSitemap(id) {
  return useQuery({
    queryKey: ['sitemap', id],
    queryFn: () => fetchCmsDataById('sitemaps', id),
    enabled: !!id,
  });
}