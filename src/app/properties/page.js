'use client';

import { useState, useEffect } from 'react';
import { Flex, Button, Text } from '@chakra-ui/react';
import PropertyListing from '../components/property_listing';
import SearchSecondary from '../components/search_secondary';
import SearchFilters from '../components/search_filters';
import { useSearchParams } from 'next/navigation';
import useSearch from '../../utils/useSearch';
import useFirebaseCollection from '../../utils/useFirebaseCollection';
import { useProperties } from '../../utils/useCMSHooks';

// Helper function to normalize CMS data to match Firebase structure
const normalizeCMSProperty = (cmsProperty) => ({
  id: cmsProperty.id,
  reference: cmsProperty.title || cmsProperty.reference || 'Untitled', // Map title to reference
  isFeatured: cmsProperty.isFeatured || false, // Default to false if not provided
  listingType: cmsProperty.listingType || 'sale', // Default to sale
  propertyType: cmsProperty.propertyType || 'apartment', // Default to apartment
  price: cmsProperty.price || 0,
  sqfeetArea: cmsProperty.area || 0, // Map area to sqfeetArea
  _updatedBy: {
    timestamp: { seconds: cmsProperty.createdAt || Date.now() / 1000 }, // Map createdAt or use current time
  },
  source: 'cms', // Add source to distinguish CMS data
});

export default function Home() {
  const { items, loadItemsWhereX } = useFirebaseCollection('properties');
  const { searchResults, getSearchResults } = useSearch();
  const { data: cmsProperties, isLoading: cmsLoading, error: cmsError } = useProperties();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || ' ';
  const filterString = searchParams.get('filter') || 'isDisabled = false';
  const showExclusive = searchParams.get('exclusiveProperties');
  const showProperties = searchParams.get('showProperties');
  const listingType = searchParams.get('listingType') || 'sale';
  const propertyTypes = searchParams.get('propertyType') || 'apartment,villa,townhouse,duplex,penthouse';
  const minPrice = searchParams.get('minPrice') || 100000;
  const maxPrice = searchParams.get('maxPrice') || 999999999;
  const bedrooms = searchParams.get('bedrooms') || 1;
  const minArea = searchParams.get('minArea') || 0;
  const maxArea = searchParams.get('maxArea') || 250000;
  const amenities = searchParams.get('amenities')?.split(',') || [];
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [localItems, setLocalItems] = useState([]);
  const [shownItems, setShownItems] = useState([]);
  const [shownIndex, setShownIndex] = useState(1);

  // Update shownItems when localItems or shownIndex changes
  useEffect(() => {
    setShownItems(localItems.slice(0, shownIndex * 12));
  }, [localItems, shownIndex]);

  // Combine and filter Firebase and CMS data
  useEffect(() => {
    // Wait for both Firebase and CMS data to be available
    if (!items || !cmsProperties) return;

    // Normalize CMS properties to match Firebase structure
    const normalizedCMSProperties = cmsProperties.map(normalizeCMSProperty);

    // Combine Firebase and CMS data
    const combinedItems = [
      ...items.map(item => ({ ...item, source: 'firebase' })),
      ...normalizedCMSProperties,
    ];

    // Apply search and filters to combined data
    const filteredItems = combinedItems.filter(item => {
      const matchesListingType = item.listingType === listingType;
      const matchesPropertyType = propertyTypes.split(',').includes(item.propertyType);
      const matchesPrice = item.price >= minPrice && item.price <= maxPrice;
      const matchesArea = item.sqfeetArea >= minArea && item.sqfeetArea <= maxArea;
      const matchesBedrooms = item.bedrooms >= bedrooms;
      const matchesAmenities = amenities.length === 0 || amenities.every(amenity => item.amenities?.includes(amenity));
      const matchesSearch = searchTerm === ' ' || item.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const isNotDisabled = !item.isDisabled;

      return (
        matchesListingType &&
        matchesPropertyType &&
        matchesPrice &&
        matchesArea &&
        matchesBedrooms &&
        matchesAmenities &&
        matchesSearch &&
        isNotDisabled
      );
    });

    // Sort by featured (default)
    const sortedItems = filteredItems.sort((a, b) => !!b.isFeatured - !!a.isFeatured);
    setLocalItems(sortedItems);
  }, [items, cmsProperties, searchParams]);

  // Handle exclusive or specific property type filtering
  useEffect(() => {
    if (showExclusive) {
      // Filter Firebase data for exclusive properties
      loadItemsWhereX('isExclusive', true);
    } else if (showProperties) {
      // Filter Firebase data for specific property type
      loadItemsWhereX('propertyType', showProperties);
    } else {
      // Apply search to Firebase data
      getSearchResults(searchTerm, filterString, amenities);
    }
  }, [searchParams]);

  // Sorting function
  const getSorted = (sortType) => {
    let sortedItems = [...localItems];
    if (sortType === 'featured'){
       sortedItems.sort((a, b) => !!b.isFeatured - !!a.isFeatured);
    } else if (sortType === 'latest') {
      sortedItems.sort((a, b) => b._updatedBy.timestamp.seconds - a._updatedBy.timestamp.seconds);
    }
    setSortBy(sortType);
    setLocalItems(sortedItems);
  };

  // Load more items for pagination
  const loadMore = () => {
    setShownItems(localItems.slice(0, (shownIndex + 1) * 12));
    setShownIndex(shownIndex + 1);
  };

  return (
    <Flex direction="column" justify="center" align="center" w={{ base: '100vw', md: '80vw', lg: '933px' }} mx="auto" my={8}>
      <SearchFilters openFilters={isOpen} onClose={() => setIsOpen(false)} updateResults={setLocalItems} />
      <Flex direction="column" w={{ base: '100vw', md: '80vw', lg: '946px' }} mx="auto">
        <Flex direction="column" align="center">
          <Text variant="articleTitle">Properties for {listingType}</Text>
          <Text fontSize="12px">{localItems.length}{'+ PROPERTIES'}</Text>
        </Flex>

        <Flex align="center" justify="space-between" m={4} mb={2} grow="grow">
          <Button size="s" variant="bright" onClick={() => setIsOpen(true)}>
            FILTERS
          </Button>
          <Flex align="center" alignSelf="center">
            <Text mx={2} fontSize="12px">Sort By</Text>
            <Button mx={2} size="sm" variant="linkButton" onClick={() => getSorted('featured')}>
              <Text fontSize="10px" variant={sortBy === 'featured' ? 'selected' : 'justRoboto'}>
                Featured
              </Text>
            </Button>
            <Button mx={2} size="sm" variant="linkButton" onClick={() => getSorted('latest')}>
              <Text fontSize="10px" variant={sortBy === 'latest' ? 'selected' : 'justRoboto'}>
                New to Market
              </Text>
            </Button>
          </Flex>
        </Flex>

        <Flex align="center" justify="center" wrap="wrap" my={2} alignSelf="center" grow="grow">
          {shownItems.length > 0 ? (
            shownItems.map((item) => (
              <PropertyListing
                vspace={4}
                wide={{ base: 'true', md: 'false' }}
                key={item.id}
                reference={item.reference}
                listing={item}
              />
            ))
          ) : (
            <Text>No Properties Found.</Text>
          )}
          {shownIndex * 12 < localItems.length && (
            <Button variant="white" my={4} onClick={loadMore}>
              Load more
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}