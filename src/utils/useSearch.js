import { useState } from 'react';
import { MeiliSearch } from 'meilisearch';

const meiliClient = new MeiliSearch({
  host: process.env.NEXT_PUBLIC_MEILI_HOST,
  apiKey: process.env.NEXT_PUBLIC_MEILI_API_KEY,
});

//Search management function
const useSearch = () => {
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = async (query, filter, amenities) => {
    const index = meiliClient.index('prodPropertiesIndex');
    let results = await index.search(query, { filter: filter, limit: 300 });
    let tempResults = results.hits.filter(x => amenities.every(a => x.amenities.includes(a)));
    setSearchResults(tempResults);
  };

  return { searchResults, getSearchResults };
};

export default useSearch;