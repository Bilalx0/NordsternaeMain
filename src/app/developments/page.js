'use client'
import { useState, useEffect } from 'react'
import { Flex, Button, Text, Center  } from '@chakra-ui/react'
import DevelopmentTile from '../components/development_tile'
import useFirebaseCollection from "../../utils/useFirebaseCollection"

export default function Home() {
  const { items, loadItems } = useFirebaseCollection("developments");
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    //sets localitems after excluding the placeholder development
    setLocalItems(items.filter(x => x.id !== 'u6QlxuYQmahgs8z65dyP'));
  }, [items]);

  return (
    <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={8}>
      <Text p={2} variant='articleTitle' textAlign="center">Developments</Text>
      <Text p={2} variant="blackSubtitle" align="center">Discover the best communities & buildings where to live and work in United Arab Emirates</Text>
      <Text p={2} my={4} variant="blackSubtitle" align="center">260 Properties</Text>
      <Flex justify="center" align="center" wrap="wrap">
        {localItems.length && localItems.map((item) => (<DevelopmentTile key={item.id} content={item} slug={item.urlSlug} />))}
      </Flex>
      <Center p={8}>
          <Button variant="light" m={4}>LOAD MORE</Button>
      </Center>
    </Flex>
  )
}
