'use client'
import { useState, useEffect } from 'react'
import { Flex, Button, Text, Center  } from '@chakra-ui/react'
import NeighbourhoodTile from '../components/neighbourhood_tile'
import useFirebaseCollection from "../../utils/useFirebaseCollection"

export default function Home() {
  const { items, loadItems } = useFirebaseCollection("neighborhoods");
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    //sets localitems after excluding the placeholder neighborhood
    setLocalItems(items.filter(x => x.id !== 'fVeRyfu2xGOxOfke7bOp'));
  }, [items]);

  return (
    <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={8}>
      <Text variant='articleTitle' textAlign="center">Browse the Neighbourhoods</Text>
      <Flex justify="space-around" align="center" wrap="wrap">
        {localItems.length && localItems.map((item) => (<NeighbourhoodTile key={item.id} content={item} slug={item.urlSlug} />))}
      </Flex>
      <Center p={8}>
          <Button variant="light" m={4}><Text>LOAD MORE</Text></Button>
      </Center>
    </Flex>
  )
}
