'use client'
import { useState, useEffect } from 'react'
import { Flex, Button, Text, Input, Image, Box, Link } from '@chakra-ui/react'
import useFirebaseCollection from "../../utils/useFirebaseCollection"
import { useToast } from '@chakra-ui/react'
import FromThemagazine from '../components/from_the_magazine'
import PropertyListing from '../components/property_listing'

export default function Home() {
  const { items, loadItems } = useFirebaseCollection("sitemap");
  const [sections, setSections] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    setSections([...new Set(items.map(x => x.section))]);
  }, [items]);

  return (
    <Flex direction="column" w="100vw">
      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" p={4} justify="center">
        <Text mt={4} align="center" variant="latoNormalTitle">Sitemap</Text>
      </Flex>

      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" wrap="wrap">
        {sections.length && sections.map(section => (
          <Flex direction="column" m={4} key={section}>
            <Text variant="latoNormalTitle" my={2}>{section}</Text>
            {items.filter(item => item.section === section).map(item => <Link key={item.completeURL} href={item.completeURL}>{item.linkLabel}</Link>)}
          </Flex>
          ))}
      </Flex>
    </Flex>
  )
}
