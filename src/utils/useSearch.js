import { useState } from 'react';
import { MeiliSearch } from 'meilisearch';

const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST || 'http://localhost:7700', // Fallback for debugging
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY || '',
});

// Log configuration for debugging
console.log('MeiliSearch Config:', {
  host: process.env.NEXT_PUBLIC_MEILI_HOST,
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY,
});

const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const getSearchResults = async (query, filter, amenities) => {
    try {
      if (!query.trim()) {
        console.log('Skipping search: empty query');
        setSearchResults([]);
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
    }
  };

  return { searchResults, error, getSearchResults };
};

export default useSearch;