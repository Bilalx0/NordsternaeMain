'use client'
import { useState, useEffect, useMemo } from 'react'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import DevelopmentTile from './development_tile'
import { useDevelopments } from '../../utils/useCMSHooks' // Adjust the import path as needed

export default function FeaturedDevelopments() {
  const { data: items = [], isLoading } = useDevelopments();
  const [localItems, setLocalItems] = useState([]);

  // Memoize filtered items to ensure stability
  const filteredItems = useMemo(() => {
    return items.filter(x => x?.id !== 'u6QlxuYQmahgs8z65dyP' && !!x?.featureOnHomepage);
  }, [items]);

  useEffect(() => {
    // Update state only if filteredItems has changed
    setLocalItems(prev => JSON.stringify(prev) !== JSON.stringify(filteredItems) ? filteredItems : prev);
  }, [filteredItems]);

  if (isLoading) {
    return <Flex justify="center" align="center" h="200px">Loading...</Flex>;
  }

  return (
    <Box bg='#FFFFFF'>
      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px"}} px={2} py="50px" m="auto">
        <Text variant="featuredItemsHeader" my={2}>Featured Developments</Text>
        <Flex overflow="scroll" justify="space-between">
          {localItems.length && localItems.map((item) => (
            <DevelopmentTile key={item.id} content={item} slug={item.urlSlug} />
          ))}
        </Flex>
        <Button m={8} alignSelf="center" as="a" href={`/developments`} variant="light">VIEW ALL</Button>
      </Flex>
    </Box>
  )
}