'use client'; // Added 'use client' directive as it's a client-side hook file
import { useQuery, useMutation } from '@tanstack/react-query';

async function fetchCmsDataById(resource, id) {
  if (!id) return null;
  const response = await fetch(`/api/cms/${resource}/${id}`); // Assumes /api/cms/properties/123
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource} with ID ${id}: ${response.statusText}`);
  }
  return response.json();
}

async function fetchCmsDataByField(resource, fieldName, fieldValue) {
  if (!fieldValue) return null;
  // Assumes API supports query parameters for filtering, e.g., /api/cms/properties?reference=NS123
  const response = await fetch(`/api/cms/${resource}?${fieldName}=${encodeURIComponent(fieldValue)}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${resource} by ${fieldName} ${fieldValue}: ${response.statusText}`);
  }
  const data = await response.json();
  // If the API returns an array for a filtered search, return the first item
  return data.length > 0 ? data[0] : null;
}

// Updated: Fetch all properties with optional query parameters
export function useProperties(queryParams = {}) {
  return useQuery({
    // Include queryParams in the query key so React Query knows when to refetch
    queryKey: ['properties', queryParams],
    queryFn: async () => {
      // Build query string from parameters
      const searchParams = new URLSearchParams();
      
      // Add each parameter to the search params if it exists
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          searchParams.append(key, value);
        }
      });
      
      const queryString = searchParams.toString();
      const url = queryString ? `/api/cms/properties?${queryString}` : '/api/cms/properties';
      
      console.log('Fetching from URL:', url); // Debug log
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch all properties');
      
      const data = await response.json();
      console.log('Fetched properties count:', data.length); // Debug log
      
      return data;
    },
    // Optional: Configure caching behavior
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
    // Force refetch when query params change
    refetchOnMount: true,
  });
}

export function useSimilarProperties(propertyType, excludeReference = null) {
  return useQuery({
    queryKey: ['similarProperties', propertyType, excludeReference],
    queryFn: async () => {
      if (!propertyType) return [];

      const searchParams = new URLSearchParams();
      searchParams.append('propertyType', propertyType);

      if (excludeReference) {
        searchParams.append('excludeReference', excludeReference);
      }

      const queryString = searchParams.toString();
      const url = `/api/cms/properties?${queryString}`;

      console.log('Fetching similar properties from URL:', url); // Debug log

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch similar properties: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Fetched similar properties count:', data.length); // Debug log

      return data;
    },
    enabled: !!propertyType, // Only fetch if propertyType is provided
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}


// Fetch all agents
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

// Fetch all articles
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

// Fetch all banner-highlights
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

// Fetch all developers
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

// Fetch all developments
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

// Fetch all enquiries
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

// Fetch all neighborhoods
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

// Fetch all sitemaps
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

// Fetch single property by id
export function useSingleProperty(id) {
  return useQuery({
    queryKey: ['property', id],
    queryFn: () => fetchCmsDataById('properties', id),
    enabled: !!id, // Only fetch if id is provided
  });
}

// Fetch single property by reference (most common for properties)
export function usePropertyByReference(reference) {
  return useQuery({
    queryKey: ['propertyByReference', reference],
    queryFn: () => fetchCmsDataByField('properties', 'reference', reference),
    enabled: !!reference,
  });
}

// Fetch single agent by id
export function useSingleAgent(id) {
  return useQuery({
    queryKey: ['agent', id],
    queryFn: () => fetchCmsDataById('agents', id),
    enabled: !!id,
  });
}

// Fetch single agent by license number (often unique)
export function useAgentByLicenseNumber(licenseNumber) {
  return useQuery({
    queryKey: ['agentByLicenseNumber', licenseNumber],
    queryFn: () => fetchCmsDataByField('agents', 'licenseNumber', licenseNumber),
    enabled: !!licenseNumber,
  });
}

// Fetch single agent by name (be cautious, names might not be unique)
export function useAgentByName(name) {
  return useQuery({
    queryKey: ['agentByName', name],
    queryFn: () => fetchCmsDataByField('agents', 'name', name),
    enabled: !!name,
  });
}

// Fetch single article by id
export function useSingleArticle(id) {
  return useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchCmsDataById('articles', id),
    enabled: !!id,
  });
}

// Fetch single banner-highlight by id
export function useSingleBannerHighlight(id) {
  return useQuery({
    queryKey: ['banner-highlight', id],
    queryFn: () => fetchCmsDataById('banner-highlights', id),
    enabled: !!id,
  });
}

// Fetch single developer by id
export function useSingleDeveloper(id) {
  return useQuery({
    queryKey: ['developer', id],
    queryFn: () => fetchCmsDataById('developers', id),
    enabled: !!id,
  });
}

// Fetch single development by id
export function useSingleDevelopment(id) {
  return useQuery({
    queryKey: ['development', id],
    queryFn: () => fetchCmsDataById('developments', id),
    enabled: !!id,
  });
}

// Fetch single enquiry by id
export function useSingleEnquiry(id) {
  return useQuery({
    queryKey: ['enquiry', id],
    queryFn: () => fetchCmsDataById('enquiries', id),
    enabled: !!id,
  });
}

// Fetch single neighborhood by id
export function useSingleNeighborhood(id) {
  return useQuery({
    queryKey: ['neighborhood', id],
    queryFn: () => fetchCmsDataById('neighborhoods', id),
    enabled: !!id,
  });
}

// Fetch single sitemap by id
export function useSingleSitemap(id) {
  return useQuery({
    queryKey: ['sitemap', id],
    queryFn: () => fetchCmsDataById('sitemaps', id),
    enabled: !!id,
  });
}