'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Button, Center } from '@chakra-ui/react'
import DevelopmentTile from './development_tile'
import useFirebaseCollection from "../../utils/useFirebaseCollection"

export default function FeaturedDevelopments() {
  const { items, loadItems } = useFirebaseCollection("developments");
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    //sets localitems after excluding the placeholder development
    setLocalItems(items.filter(x => (x.id !== 'u6QlxuYQmahgs8z65dyP' && !!x.featureOnHomepage)));
  }, [items]);

  return (
    <Box bg='#FFFFFF'>
      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px"}} px={2} py="50px" m="auto">
        <Text variant="featuredItemsHeader" my={2}>Featured Developments</Text>
        <Flex overflow="scroll" justify="space-between">
          {localItems.length && localItems.map((item) => (<DevelopmentTile key={item.id} content={item} slug={item.urlSlug} />))}
        </Flex>
        <Button m={8} alignSelf="center" as="a" href={`/developments`} variant="light">VIEW ALL</Button>
      </Flex>
    </Box>
  )
}