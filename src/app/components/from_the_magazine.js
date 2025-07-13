'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Button, Image, Spacer, Show } from '@chakra-ui/react'
import MagazineArticleTile from './magazine_article_tile'
import useFirebaseCollection from "../../utils/useFirebaseCollection"

export default function FromThemagazine(limit) {
  const { items, loadArticles } = useFirebaseCollection("articles");
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    if (!!limit && parseInt(limit.limit) >= 2) {
      let shuffled = items.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
      setLocalItems(shuffled.slice(0, parseInt(limit.limit)));
    }
    else setLocalItems(items);
  }, [items]);

  return (
    <Box bg='#FDF9F3'>
      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px"}} px={2} py="50px" m="auto">
        <Flex justify="space-between" align="center">
          <Text variant="featuredItemsHeader" my={2}>From The magazine</Text>
        </Flex>
        <Flex overflow="scroll">
          <Show above="sm">
            {localItems.length && localItems.map(item => (<MagazineArticleTile key={item.id} article={item} featured={item.isFeatured} desktopTertiary="true" />))}
          </Show>
          <Show below="md">
            {localItems.length && localItems.map(item => (<MagazineArticleTile key={item.id} article={item} featured={item.isFeatured} mobileTile="true" />))}
          </Show>
        </Flex>
        <Button alignSelf="center" variant="light" as="a" href="/magazine" m={4}>VIEW ALL</Button>
      </Flex>
    </Box>
  )
}