import { useState } from 'react';
import { MeiliSearch } from 'meilisearch';

const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST || 'https://edge.meilisearch.com',
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY || '',
});

// Validate environment variables
if (!process.env.NEXT_PUBLIC_MEILI_HOST || !process.env.NEXT_PUBLIC_MEILI_API_KEY) {
  console.warn('MeiliSearch environment variables are missing. Search functionality may not work.');
}

const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getSearchResults = async (query, filter, amenities = []) => {
    try {
      setIsLoading(true);
      if (!query.trim()) {
        console.log('Skipping search: empty query');
        setSearchResults([]);
        setError(null);
        return;
      }
      console.log('Searching with:', { query, filter, amenities });
      const index = meiliClient.index('prodPropertiesIndex');
      const results = await index.search(query, { filter, limit: 300 });
      const tempResults = results.hits.filter(x =>
        amenities.every(a => x.amenities?.includes(a))
      );
      setSearchResults(tempResults);
      setError(null);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { searchResults, error, isLoading, getSearchResults };
};

export default useSearch;