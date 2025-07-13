'use client'
import { useState, useEffect } from 'react'
import { Flex, Text, Button, Spacer } from '@chakra-ui/react'
import PropertyListing from './property_listing'
import useFirebaseCollection from "../../utils/useFirebaseCollection"

export default function FeaturedVillas() {
  const { items, loadVillas } = useFirebaseCollection("properties");
  const [featuredProps, setFeaturedProps] = useState([]);
  const [latestProps, setLatestProps] = useState([]);
  const [localItems, setLocalItems] = useState([]);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    loadVillas();
  }, []);

  useEffect(() => {
    const featured = items.sort((a,b) => !!b.isFeatured - !!a.isFeatured).slice(0,3);
    setFeaturedProps(featured);
    setLatestProps(items.sort((a,b) => b._updatedBy.timestamp.seconds - a._updatedBy.timestamp.seconds).slice(0,3));
    setLocalItems(featured);
  }, [items]);

  useEffect(() => {
    if (sortBy === "featured") {
      setLocalItems(featuredProps);
    }
    else if (sortBy === "latest") {
      setLocalItems(latestProps);
    }
  }, [sortBy]);

  return (
    <Flex direction="column" bg='white' px={2} py="50px" borderBottom="1px solid #202020" w={{ base: "100vw", md: "80vw", lg: "946px"}} m="auto">
      <Flex direction={{ base: "column", md: "row"}} justify={{ md: "center" }} align={{ md: "center" }}>
        <Text variant="featuredItemsHeader" align="left">Villas</Text>
        <Spacer />
        <Flex>
          <Button size="s" variant="linkButton" onClick={() => setSortBy('featured')} mr={2}><Text fontSize="12px" variant={(sortBy === 'featured') ? 'selected' : 'justRoboto'}>Featured</Text></Button>
          <Button size="s" variant="linkButton" onClick={() => setSortBy('latest')}><Text fontSize="12px" variant={(sortBy === 'latest') ? 'selected' : 'justRoboto'}>New to Market</Text></Button>
        </Flex>
      </Flex>
      <Flex overflow="scroll" justify="space-between">
        {localItems.length && localItems.map(item => <PropertyListing key={item.id} reference={item.reference} listing={item} />)}
      </Flex>
      <Button alignSelf="center" variant="light" as="a" href="/properties?showProperties=villa" m={8}>VIEW ALL</Button>
    </Flex>
  )
}