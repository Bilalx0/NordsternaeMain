'use client';
import { useQuery, useMutation } from '@tanstack/react-query';

async function fetchCmsDataById(resource, id) {
  if (!id) {
    console.warn(`[fetchCmsDataById] No ID provided for resource: ${resource}`);
    return null;
  }
  const url = `/api/cms/${resource}/${id}?t=${Date.now()}`;
  console.log(`[fetchCmsDataById] Fetching from URL: ${url}`);
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) {
    console.error(`[fetchCmsDataById] Failed to fetch ${resource} with ID ${id}: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to fetch ${resource} with ID ${id}: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(`[fetchCmsDataById] Fetched data for ${resource}/${id}:`, data);
  return data;
}

export default async function fetchCmsDataByField(resource, fieldName, fieldValue) {
  if (!fieldValue) {
    console.warn(`[fetchCmsDataByField] No ${fieldName} provided for resource: ${resource}`);
    return null;
  }
  const url = `/api/cms/${resource}?${fieldName}=${encodeURIComponent(fieldValue)}&t=${Date.now()}`;
  console.log(`[fetchCmsDataByField] Fetching from URL: ${url}`);
  const response = await fetch(url, { cache: 'no-store' });
  console.log(`[fetchCmsDataByField] Response status: ${response.status} ${response.statusText}`);
  if (!response.ok) {
    console.error(`[fetchCmsDataByField] Failed to fetch ${resource} by ${fieldName}=${fieldValue}: ${response.status} ${response.statusText}`);
    throw new Error(`Failed to fetch ${resource} by ${fieldName} ${fieldValue}: ${response.statusText}`);
  }
  const data = await response.json();
  console.log(`[fetchCmsDataByField] Raw response for ${resource} by ${fieldName}=${fieldValue}:`, data);

  if (data && typeof data === 'object') {
    if (Array.isArray(data)) {
      const matchingItem = data.find(item => item[fieldName] === fieldValue) || null;
      console.log(`[fetchCmsDataByField] Found ${matchingItem ? 'matching' : 'no matching'} item in array for ${fieldName}=${fieldValue}:`, matchingItem);
      return matchingItem;
    }
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
      searchParams.append('t', Date.now()); // Cache-busting
      const queryString = searchParams.toString();
      const url = queryString ? `/api/cms/properties?${queryString}` : `/api/cms/properties?t=${Date.now()}`;
      console.log('[useProperties] Fetching from URL:', url);
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch all properties');
      const data = await response.json();
      console.log('[useProperties] Fetched properties count:', data.length);
      return data;
    },
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
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
      searchParams.append('t', Date.now()); // Cache-busting
      const queryString = searchParams.toString();
      const url = `/api/cms/properties?${queryString}`;
      console.log('[useSimilarProperties] Fetching from URL:', url);
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to fetch similar properties: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('[useSimilarProperties] Fetched similar properties count:', data.length);
      return data;
    },
    enabled: !!propertyType,
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const url = `/api/cms/agents?t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch all agents');
      return response.json();
    },
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const url = `/api/cms/articles?t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch all articles');
      return response.json();
    },
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useBannerHighlights() {
  return useQuery({
    queryKey: ['banner-highlights'],
    queryFn: async () => {
      const url = `/api/cms/banner-highlights?t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch all banner highlights');
      return response.json();
    },
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useDevelopers() {
  return useQuery({
    queryKey: ['developers'],
    queryFn: async () => {
      const url = `/api/cms/developers?t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch all developers');
      return response.json();
    },
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useDevelopments() {
  return useQuery({
    queryKey: ['developments'],
    queryFn: async () => {
      const url = `/api/cms/developments?t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch all developments');
      return response.json();
    },
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useEnquiries() {
  return useQuery({
    queryKey: ['enquiries'],
    queryFn: async () => {
      const url = `/api/cms/enquiries?t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch all enquiries');
      return response.json();
    },
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useNeighborhoods() {
  return useQuery({
    queryKey: ['neighborhoods'],
    queryFn: async () => {
      const url = `/api/cms/neighborhoods?t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch all neighborhoods');
      return response.json();
    },
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useSitemaps() {
  return useQuery({
    queryKey: ['sitemaps'],
    queryFn: async () => {
      const url = `/api/cms/sitemaps?t=${Date.now()}`;
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) throw new Error('Failed to fetch all sitemaps');
      return response.json();
    },
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useSingleProperty(id) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchCmsDataById('properties', id),
    enabled: !!id,
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useSingleAgent(id) {
  return useQuery({
    queryKey: ['agent', id],
    queryFn: () => fetchCmsDataById('agents', id),
    enabled: !!id,
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useSingleArticle(id) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchCmsDataById('articles', id),
    enabled: !!id,
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useSingleBannerHighlight(id) {
  return useQuery({
    queryKey: ['banner-highlight', id],
    queryFn: () => fetchCmsDataById('banner-highlights', id),
    enabled: !!id,
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useSingleDeveloper(id) {
  return useQuery({
    queryKey: ['developer', id],
    queryFn: () => fetchCmsDataById('developers', id),
    enabled: !!id,
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useSingleDevelopment(id) {
  return useQuery({
    queryKey: ['development', id],
    queryFn: () => fetchCmsDataById('developments', id),
    enabled: !!id,
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useSingleEnquiry(id) {
  return useQuery({
    queryKey: ['enquiry', id],
    queryFn: () => fetchCmsDataById('enquiries', id),
    enabled: !!id,
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useSingleNeighborhood(id) {
  return useQuery({
    queryKey: ['neighborhood', id],
    queryFn: () => fetchCmsDataById('neighborhoods', id),
    enabled: !!id,
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}

export function useSingleSitemap(id) {
  return useQuery({
    queryKey: ['sitemap', id],
    queryFn: () => fetchCmsDataById('sitemaps', id),
    enabled: !!id,
    staleTime: 0, // Disable caching
    cacheTime: 0, // Disable caching
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}