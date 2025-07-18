'use client'
import { useState, useEffect, useMemo } from 'react'
import { Flex, Text, Button, Spacer } from '@chakra-ui/react'
import PropertyListing from './property_listing'
import { useProperties } from '../../utils/useCMSHooks' // Adjust the import path as needed

export default function FeaturedApartments() {
  const { data: items = [], isLoading } = useProperties({ showProperties: 'apartment' });
  const [featuredProps, setFeaturedProps] = useState([]);
  const [latestProps, setLatestProps] = useState([]);
  const [localItems, setLocalItems] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  // Memoize filtered items to ensure stability
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item?.propertyType?.toLowerCase() === 'apartment'
    );
  }, [items]);

  useEffect(() => {
    // Create sorted arrays without mutating filteredItems
    const featured = [...filteredItems]
      .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
      .slice(0, 3);
    
    const latest = [...filteredItems]
      .sort((a, b) => new Date(b._updatedAt || 0) - new Date(a._updatedAt || 0))
      .slice(0, 3);

    // Update state only if the data has changed
    setFeaturedProps(prev => JSON.stringify(prev) !== JSON.stringify(featured) ? featured : prev);
    setLatestProps(prev => JSON.stringify(prev) !== JSON.stringify(latest) ? latest : prev);
    setLocalItems(prev => JSON.stringify(prev) !== JSON.stringify(sortBy === "featured" ? featured : latest) 
      ? sortBy === "featured" ? featured : latest 
      : prev);
  }, [filteredItems, sortBy]);

  if (isLoading) {
    return <Flex justify="center" align="center" h="200px">Loading...</Flex>;
  }

  return (
    <Flex direction="column" bg='white' px={2} py="50px" w={{ base: "100vw", md: "80vw", lg: "946px"}} m="auto">
      <Flex direction={{ base: "column", md: "row"}} justify={{ md: "center" }} align={{ md: "center" }}>
        <Text variant="featuredItemsHeader" align="left">Apartments</Text>
        <Spacer />
        <Flex>
          <Button size="s" variant="linkButton" onClick={() => setSortBy('featured')} mr={2}>
            <Text fontSize="12px" variant={(sortBy === 'featured') ? 'selected' : 'justRoboto'}>Featured</Text>
          </Button>
          <Button size="s" variant="linkButton" onClick={() => setSortBy('latest')} mr={2}>
            <Text fontSize="12px" variant={(sortBy === 'latest') ? 'selected' : 'justRoboto'}>New to Market</Text>
          </Button>
        </Flex>
      </Flex>
      <Flex overflow="scroll" justify="space-between">
        {localItems.length && localItems.map(item => (
          <PropertyListing key={item.id} reference={item.reference} listing={item} />
        ))}
      </Flex>
      <Button alignSelf="center" variant="light" as="a" href="/properties?showProperties=apartment" m={8}>VIEW ALL</Button>
    </Flex>
  )
}