'use client'
import { useState, useEffect, useCallback } from 'react'
import { Flex, Button, Text } from '@chakra-ui/react'
import PropertyListing from '../components/property_listing'
import SearchFilters from '../components/search_filters'
import { useProperties as useCMSProperties } from "../../utils/useCMSHooks"

export default function Home() {
  // Default filter values instead of searchParams
  const [filters, setFilters] = useState({
    listingType: "sale",
    propertyTypes: ["apartment", "villa", "townhouse", "duplex", "penthouse"],
    minPrice: 100000,
    maxPrice: 999999999,
    bedrooms: 1,
    minArea: 0,
    maxArea: 250000,
    isExclusive: false,
    propertyTypeFilter: undefined,
    amenities: [],
  });

  // Add a refresh key to force re-fetch
  const [refreshKey, setRefreshKey] = useState(0);

  // Construct query parameters for the CMS API based on filters state
  const queryParams = {
    listingType: filters.listingType,
    propertyType: filters.propertyTypes.join(","),
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    bedrooms: filters.bedrooms,
    minArea: filters.minArea,
    maxArea: filters.maxArea,
    isExclusive: filters.isExclusive ? true : undefined,
    propertyTypeFilter: filters.propertyTypeFilter || undefined,
  };

  const { data: cmsProperties, isLoading: isLoadingCMS, error: cmsError, refetch } = useCMSProperties(queryParams);

  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [localItems, setLocalItems] = useState([]);
  const [shownItems, setShownItems] = useState([]);
  const [shownIndex, setShownIndex] = useState(1);

  // Force refresh function
  const forceRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
    if (refetch) {
      refetch();
    }
    console.log("Force refresh triggered");
  }, [refetch]);

  // Update filters from SearchFilters component
  const updateFilters = useCallback((newFilters) => {
    setFilters(newFilters);
    console.log("Filters updated:", newFilters);
  }, []);

  // Debugging/Logging: Log errors for CMS
  useEffect(() => {
    if (cmsError) {
      console.error("Error fetching properties from CMS:", cmsError);
    }
  }, [cmsError]);

  useEffect(() => {
    if (cmsProperties) {
      console.log(`CMS properties loaded: ${cmsProperties.length}`);
      console.log("Raw CMS data:", cmsProperties);
      setLocalItems(cmsProperties.sort((a, b) => !!b.isFeatured - !!a.isFeatured));
    }
  }, [cmsProperties]);

  // Update shownItems based on localItems and shownIndex
  useEffect(() => {
    setShownItems(localItems.slice(0, shownIndex * 12));
    console.log(`Shown items updated: ${shownItems.length}`);
  }, [localItems, shownIndex]);

  const loadMore = () => {
    if (shownIndex * 12 < localItems.length) {
      setShownIndex(prevIndex => prevIndex + 1);
      console.log(`Loading more items. New shownIndex: ${shownIndex + 1}`);
    } else {
      console.log("No more items to load.");
    }
  };

  const getSorted = useCallback((sortType) => {
    let sortedItems = [...localItems];
    if (sortType === "featured") {
      sortedItems.sort((a, b) => !!b.isFeatured - !!a.isFeatured);
    } else if (sortType === "latest") {
      sortedItems.sort((a, b) => {
        const timestampA = (a.updatedAt ? new Date(a.updatedAt).getTime() : 0);
        const timestampB = (b.updatedAt ? new Date(b.updatedAt).getTime() : 0);
        return timestampB - timestampA;
      });
    }
    setSortBy(sortType);
    setLocalItems(sortedItems);
    console.log(`Items sorted by: ${sortType}`);
  }, [localItems]);

  // Show loading state for CMS
  if (isLoadingCMS) {
    return (
      <Flex direction="column" justify="center" align="center" h="100vh">
        <Text>Loading properties...</Text>
      </Flex>
    );
  }

  // Handle error state
  if (cmsError) {
    return (
      <Flex direction="column" justify="center" align="center" h="100vh">
        <Text color="red.500">Error loading properties: {cmsError.message || "An unknown error occurred."}</Text>
      </Flex>
    );
  }

  // Show "No Properties Found" if localItems is empty after loading
  if (!isLoadingCMS && !cmsError && localItems.length === 0) {
    return (
      <Flex direction="column" justify="center" align="center" h="100vh">
        <Text variant="articleTitle">No Properties Found.</Text>
        <Text fontSize="12px">Try adjusting your filters.</Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" justify="center" align="center" w={{ base: "100vw", md: "80vw", lg: "933px" }} mx="auto" my={8}>
      <SearchFilters openFilters={isOpen} onClose={() => setIsOpen(false)} updateResults={updateFilters} />
      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto">
        <Flex direction="column" align="center">
          <Text variant="articleTitle">Properties for {filters.listingType}</Text>
          <Text fontSize="12px">
            {localItems.length > 0 ? `${localItems.length}+ PROPERTIES` : "No Properties Found."}
          </Text>
        </Flex>

        <Flex align="center" justify="space-between" m={4} mb={2} grow="grow">
          <Button size="s" variant="bright" onClick={() => setIsOpen(true)}>FILTERS</Button>
          
          <Button size="s" variant="outline" onClick={forceRefresh}>
            REFRESH ({localItems.length})
          </Button>
          
          <Flex align="center" alignSelf="center">
            <Text mx={2} fontSize="12px">Sort By</Text>
            <Button mx={2} size="sm" variant="linkButton" onClick={() => getSorted('featured')}>
              <Text fontSize="10px" variant={sortBy === 'featured' ? 'selected' : 'justRoboto'}>Featured</Text>
            </Button>
            <Button mx={2} size="sm" variant="linkButton" onClick={() => getSorted('latest')}>
              <Text fontSize="10px" variant={sortBy === 'latest' ? 'selected' : 'justRoboto'}>New to Market</Text>
            </Button>
          </Flex>
        </Flex>

        <Flex align="center" justify="center" wrap="wrap" my={2} alignSelf="center" grow="grow">
          {shownItems.length > 0 && shownItems.map((item) => (
            <PropertyListing vspace={4} wide={{ base: "true", md: "false" }} key={item.reference} listing={item} reference={item.reference} />
          ))}
          {(shownIndex * 12 < localItems.length) && <Button variant="white" my={4} onClick={loadMore}>Load more</Button>}
        </Flex>
      </Flex>
    </Flex>
  );
}