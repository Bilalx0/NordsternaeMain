'use client'
import { useState, useEffect } from 'react'
import { Flex, Button, Text, Input, Image, Box, Link } from '@chakra-ui/react'
import useFirebaseCollection from "../../utils/useFirebaseCollection"
import { useToast } from '@chakra-ui/react'
import FromThemagazine from '../components/from_the_magazine'
import PropertyListing from '../components/property_listing'

export default function Home() {
  const { items, loadItems } = useFirebaseCollection("properties");
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    setLocalItems(items.filter(x => !!x.sold));
  }, [items]);

  return (
    <Flex direction="column" w="100vw">
      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" p={4} justify="center">
        <Text mt={4} align="center" variant="articleTitle">Archive</Text>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" overflow="scroll" wrap="wrap" align="center" justify="center">
        {localItems.length && localItems.map(item => <PropertyListing vspace={4} key={item.id} reference={item.reference} listing={item} />)}
      </Flex>
    </Flex>
  )
}
