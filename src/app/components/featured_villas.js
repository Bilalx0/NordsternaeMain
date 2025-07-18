'use client'
import { useState, useEffect, useMemo } from 'react'
import { Flex, Text, Button, Spacer } from '@chakra-ui/react'
import PropertyListing from './property_listing'
import { useProperties } from '../../utils/useCMSHooks' // Updated import path

export default function FeaturedVillas() {
  const { data: items = [], isLoading } = useProperties({ showProperties: 'villa,villa/house' });
  const [featuredProps, setFeaturedProps] = useState([]);
  const [latestProps, setLatestProps] = useState([]);
  const [localItems, setLocalItems] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  // Memoize filtered items to ensure stability
  const filteredItems = useMemo(() => {
    const validPropertyTypes = ['villa', 'villa/house'];
    const filtered = items.filter(item => 
      item?.propertyType && validPropertyTypes.includes(item.propertyType.toLowerCase())
    );
    console.log('filteredItems computed:', filtered.length, filtered); // Debugging
    return filtered;
  }, [items]);

  useEffect(() => {
    console.log('useEffect ran, filteredItems length:', filteredItems.length); // Debugging
    // Create sorted arrays without mutating filteredItems
    const featured = [...filteredItems]
      .sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0))
      .slice(0, 3);
    
    const latest = [...filteredItems]
      .sort((a, b) => {
        const dateA = a._updatedAt ? new Date(a._updatedAt) : new Date(0);
        const dateB = b._updatedAt ? new Date(b._updatedAt) : new Date(0);
        return dateB - dateA;
      })
      .slice(0, 3);

    // Update state only if data has changed
    setFeaturedProps(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(featured)) {
        console.log('Updating featuredProps:', featured); // Debugging
        return featured;
      }
      return prev;
    });
    setLatestProps(prev => {
      if (JSON.stringify(prev) !== JSON.stringify(latest)) {
        console.log('Updating latestProps:', latest); // Debugging
        return latest;
      }
      return prev;
    });
    setLocalItems(prev => {
      const newItems = sortBy === "featured" ? featured : latest;
      if (JSON.stringify(prev) !== JSON.stringify(newItems)) {
        console.log('Updating localItems:', newItems); // Debugging
        return newItems;
      }
      return prev;
    });
  }, [filteredItems, sortBy]);

  if (isLoading) {
    return <Flex justify="center" align="center" h="200px">Loading...</Flex>;
  }

  return (
    <Flex direction="column" bg='white' px={2} py="50px" borderBottom="1px solid #202020" w={{ base: "100vw", md: "80vw", lg: "946px"}} m="auto">
      <Flex direction={{ base: "column", md: "row"}} justify={{ md: "center" }} align={{ md: "center" }}>
        <Text variant="featuredItemsHeader" align="left">Villas</Text>
        <Spacer />
        <Flex>
          <Button size="s" variant="linkButton" onClick={() => setSortBy('featured')} mr={2}>
            <Text fontSize="12px" variant={(sortBy === 'featured') ? 'selected' : 'justRoboto'}>Featured</Text>
          </Button>
          <Button size="s" variant="linkButton" onClick={() => setSortBy('latest')}>
            <Text fontSize="12px" variant={(sortBy === 'latest') ? 'selected' : 'justRoboto'}>New to Market</Text>
          </Button>
        </Flex>
      </Flex>
      <Flex overflow="scroll" justify="space-between">
        {localItems.length && localItems.map(item => (
          <PropertyListing key={item.id} reference={item.reference} listing={item} />
        ))}
      </Flex>
      <Button alignSelf="center" variant="light" as="a" href="/properties?showProperties=villa,villa/house" m={8}>VIEW ALL</Button>
    </Flex>
  )
}