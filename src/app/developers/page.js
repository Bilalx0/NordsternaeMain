'use client'
import { useState, useEffect } from 'react'
import { Flex, Text, } from '@chakra-ui/react'
import DevelopertTile from '../components/developer_tile'
import useFirebaseCollection from "../../utils/useFirebaseCollection"

export default function Home() {
  const { items, loadItems } = useFirebaseCollection("developers");
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  return (
    <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={8}>
      <Text p={2} variant='articleTitle' textAlign="center">Developers</Text>
      <Text p={2} variant="blackSubtitle" align="center">Discover NOrdstern preferred developers in United Arab Emirates. These long-standing selected developers are known for their quality and on-time deliverability of projects. Check in often on this page in order to see which ones we work with on a regular basis and find the latest projects for both investment and end-use here.</Text>
      <Flex justify={{ base: "center", md: "space-between" }} align="center" wrap="wrap">
        {localItems.length && localItems.map((item) => (<DevelopertTile key={item.id} developer={item} slug={item.urlSlug} />))}
      </Flex>
    </Flex>
  )
}
