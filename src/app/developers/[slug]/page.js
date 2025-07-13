'use client'
import { useState, useEffect } from 'react'
import { Flex, Button, Text, Image } from '@chakra-ui/react'
import useFirebaseCollection from "../../../utils/useFirebaseCollection"
import { useParams } from 'next/navigation'
import DevelopmentTile from '../../components/development_tile'

export default function Home() {
  const params = useParams();
  const { items, loadItems } = useFirebaseCollection("developments");
  const { item: developer, getItemByFieldValue: loadDeveloper } = useFirebaseCollection("developers");
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    loadItems();
    loadDeveloper('urlSlug', params.slug);
  }, []);

  useEffect(() => {
    //sets localitems after excluding the placeholder development
    setLocalItems(items.filter(x => (x.id !== 'u6QlxuYQmahgs8z65dyP' && x.developerLink === params.slug)));
  }, [items]);

  return (
    <Flex direction="column" w="100vw">
      {!!developer.title && <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" p={4} justify="center">
        <Text mt={4} align="center" variant="articleTitle">{developer.title}</Text>
        <Text align="center" variant="blackSubtitle">{"Country of Origin: "}{developer.country}</Text>
        <Text align="center" variant="blackSubtitle">{"Year Established: "}{developer.establishedSince}</Text>
        <Flex direction={{ base: "column", md: "row" }} my={8}>
          <Flex bg="#000000" align="center" justify="center" p={8}>
            <Image alt={developer.title} src={developer.logo[0].downloadURL} w="290px" maxW="300px" h="auto" />
          </Flex>
          <Flex direction="column" p={4} align="center">
            <Text>{developer.description}</Text>
            <Button my={4} alignSelf="flex-start" as="a" href="/enquiry" size="m" variant="bigCTA">Register Your Interest</Button>
          </Flex>
          
        </Flex>
      </Flex>}

      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto">
        <Text fontSize="32px" align="center">{!!developer ? developer.title : 'Featured'}{" Developments"}</Text>
        <Flex direction={{ base: "column", md: "row" }} wrap="wrap" p={2} align="center" justify="center">
          {localItems.length && localItems.map(item => <DevelopmentTile key={item.id} slug={item.urlSlug} content={item} />)}
        </Flex>
      </Flex>
    </Flex>
  )
}

