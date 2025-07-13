// src/utils/useCMSHooks.js
import { useQuery, useMutation } from '@tanstack/react-query';

// Fetch Properties
export function useProperties() {
  return useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const response = await fetch('/api/cms/properties');
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });
}

// Fetch Developments
export function useDevelopments() {
  return useQuery({
    queryKey: ['developments'],
    queryFn: async () => {
      const response = await fetch('/api/cms/developments');
      if (!response.ok) throw new Error('Failed to fetch developments');
      return response.json();
    },
  });
}

// Fetch Agents
export function useAgents() {
  return useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const response = await fetch('/api/cms/agents');
      if (!response.ok) throw new Error('Failed to fetch agents');
      return response.json();
    },
  });
}

// Fetch Articles
export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await fetch('/api/cms/articles');
      if (!response.ok) throw new Error('Failed to fetch articles');
      return response.json();
    },
  });
}

// Fetch Developers
export function useDevelopers() {
  return useQuery({
    queryKey: ['developers'],
    queryFn: async () => {
      const response = await fetch('/api/cms/developers');
      if (!response.ok) throw new Error('Failed to fetch developers');
      return response.json();
    },
  });
}

// Fetch Neighborhoods
export function useNeighborhoods() {
  return useQuery({
    queryKey: ['neighborhoods'],
    queryFn: async () => {
      const response = await fetch('/api/cms/neighborhoods');
      if (!response.ok) throw new Error('Failed to fetch neighborhoods');
      return response.json();
    },
  });
}

// Fetch Banner Highlights
export function useBannerHighlights() {
  return useQuery({
    queryKey: ['banner-highlights'],
    queryFn: async () => {
      const response = await fetch('/api/cms/banner-highlights');
      if (!response.ok) throw new Error('Failed to fetch banner highlights');
      return response.json();
    },
  });
}

// Fetch Sitemaps
export function useSitemaps() {
  return useQuery({
    queryKey: ['sitemaps'],
    queryFn: async () => {
      const response = await fetch('/api/cms/sitemaps');
      if (!response.ok) throw new Error('Failed to fetch sitemaps');
      return response.json();
    },
  });
}

// Upload Data (Generic, reusable for any resource)
export function useUploadCMSData(resource) {
  return useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`/api/cms/${resource}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`Failed to upload ${resource}`);
      return response.json();
    },
  });
}