'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Button, Show } from '@chakra-ui/react'
import MagazineArticleTile from './magazine_article_tile'
import { useArticles } from '../../utils/useCMSHooks'

export default function FromTheMagazine({ limit, excludeSlug }) {
  const { data: items, isLoading, isError, error } = useArticles();
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    if (isLoading || isError || !items) return;

    // Filter out the article with the matching excludeSlug
    const filteredItems = excludeSlug
      ? items.filter(item => item.slug !== excludeSlug)
      : items;

    if (limit && parseInt(limit) >= 2) {
      const shuffled = filteredItems
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      setLocalItems(shuffled.slice(0, parseInt(limit)));
    } else {
      setLocalItems(filteredItems);
    }
  }, [items, limit, excludeSlug, isLoading, isError]);

  if (isLoading) {
    return (
      <Box bg="#FDF9F3" py="50px">
        <Flex direction="column" w={{ base: '100vw', md: '80vw', lg: '946px' }} px={2} m="auto">
          <Text variant="featuredItemsHeader" my={2}>From The Magazine</Text>
          <Text textAlign="center">Loading articles...</Text>
        </Flex>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box bg="#FDF9F3" py="50px">
        <Flex direction="column" w={{ base: '100vw', md: '80vw', lg: '946px' }} px={2} m="auto">
          <Text variant="featuredItemsHeader" my={2}>From The Magazine</Text>
          <Text textAlign="center">Error loading articles: {error?.message || 'Unknown error'}</Text>
        </Flex>
      </Box>
    );
  }

  if (!localItems.length) {
    return (
      <Box bg="#FDF9F3" py="50px">
        <Flex direction="column" w={{ base: '100vw', md: '80vw', lg: '946px' }} px={2} m="auto">
          <Text variant="featuredItemsHeader" my={2}>From The Magazine</Text>
          <Text textAlign="center">No articles available</Text>
        </Flex>
      </Box>
    );
  }

  return (
    <Box bg="#FDF9F3">
      <Flex direction="column" w={{ base: '100vw', md: '80vw', lg: '946px' }} px={2} py="50px" m="auto">
        <Flex justify="space-between" align="center">
          <Text variant="featuredItemsHeader" my={2}>From The Magazine</Text>
        </Flex>
        <Flex overflow="scroll">
          <Show above="sm">
            {localItems.map(item => (
              <MagazineArticleTile key={item.id} article={item} featured={item.isFeatured} desktopTertiary="true" />
            ))}
          </Show>
          <Show below="md">
            {localItems.map(item => (
              <MagazineArticleTile key={item.id} article={item} featured={item.isFeatured} mobileTile="true" />
            ))}
          </Show>
        </Flex>
        <Button alignSelf="center" variant="light" as="a" href="/magazine" m={4}>
          VIEW ALL
        </Button>
      </Flex>
    </Box>
  );
}