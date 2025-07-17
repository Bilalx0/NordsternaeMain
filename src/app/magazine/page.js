'use client'
import { useState, useEffect } from 'react'
import { Flex, Button, Text, Center, Show } from '@chakra-ui/react'
import MagazineArticleTile from '../components/magazine_article_tile'
import { useArticles } from '../../utils/useCMSHooks'
import Head from '../../utils/useHeadSEO'

export default function Magazine() {
  const { data: articles, isLoading, error } = useArticles();
  const [regularArticles, setRegularArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [superArticle, setSuperArticle] = useState(null);


  useEffect(() => {
    if (articles) {
      console.log('[Magazine] Fetched articles:', articles);
      setSuperArticle(articles.find(x => !!x.superFeature) || null);
      setFeaturedArticles(articles.filter(x => !!x.isFeatured && !x.superFeature));
      setRegularArticles(articles.filter(x => !x.isFeatured));
    }
    if (error) {
      console.error('[Magazine] Error fetching articles:', error.message);
    }
  }, [articles, error]);

  // Handle loading state
  if (isLoading) {
    return (
      <Flex direction="column" justify="center" align="center" minH="100vh" bg="#FDF9F3">
        <Text>Loading magazine articles...</Text>
      </Flex>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Flex direction="column" justify="center" align="center" minH="100vh" bg="#FDF9F3" gap={4}>
        <Text fontSize="xl" fontWeight="bold">Error loading magazine articles</Text>
        <Text color="red.500">Error: {error.message}</Text>
        <Button as="a" href="/" variant="bigCTA" size="lg">
          Back to Home
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={8}>
      <Head title="Nordstern Magazine" metaDescription="Exquisite Homes Meet Inspired Service | Nordstern Real Estate" />
      <Text align="center" my={2} variant="articleTitle">The Magazine</Text>
      <Text align="center" px={4} variant="blackSubtitle">Explore more than properties, the news and stories behind the scenes.</Text>
      
      <Show above="sm">
        <Flex direction="column" justify="center" align="center" wrap="wrap" my={8}>
          <Flex borderTop="2px solid #000000" w={{ md: "80vw", lg: "946px" }} m={2} align="center" grow="grow">
            <Text bg="#000000" color="#FFFFFF" fontWeight="700" py={2} px={6}>Top picks</Text>
            <Text color="#000000" bg="#FFFFFF" p={2}>Catch up on the latest stories</Text>
          </Flex>
          <Flex>
            <Flex>
              {superArticle ? (
                <MagazineArticleTile key={superArticle.id} desktopPrimary={true} article={superArticle} />
              ) : (
                <Text>No super feature article available.</Text>
              )}
            </Flex>
            <Flex direction="column">
              {featuredArticles.length > 0 ? (
                <>
                  {featuredArticles[0] && (
                    <MagazineArticleTile key={featuredArticles[0].id} desktopSecondary={true} article={featuredArticles[0]} />
                  )}
                  {featuredArticles[1] && (
                    <MagazineArticleTile key={featuredArticles[1].id} desktopSecondary={true} article={featuredArticles[1]} />
                  )}
                </>
              ) : (
                <Text>No featured articles available.</Text>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" justify="center" align="center" wrap="wrap" my={8}>
          <Flex borderTop="2px solid #000000" w={{ md: "80vw", lg: "946px" }} m={2} align="center">
            <Text bg="#000000" color="#FFFFFF" fontWeight="700" py={2} px={4}>Trending Stories</Text>
            <Text color="#000000" bg="#FFFFFF" p={2}>Top stories this month</Text>
          </Flex>
          <Flex wrap="wrap" grow="grow" justify="flex-start">
            {regularArticles.length > 0 ? (
              regularArticles.map(item => (
                <MagazineArticleTile desktopTertiary={true} key={item.id} article={item} />
              ))
            ) : (
              <Text>No trending articles available.</Text>
            )}
          </Flex>
        </Flex>
      </Show>

      <Show below="md">
        <Flex direction="column" justify="center" align="center" wrap="wrap" my={8}>
          <Flex borderTop="2px solid #000000" grow="grow" align="center">
            <Text bg="#000000" color="#FFFFFF" fontWeight="700" py={2} px={4}>Top picks</Text>
            <Text color="#000000" bg="#FFFFFF" p={2}>Catch up on the latest stories</Text>
          </Flex>
          {superArticle ? (
            <MagazineArticleTile key={superArticle.id} mobileTile={true} article={superArticle} />
          ) : (
            <Text>No super feature article available.</Text>
          )}
          {featuredArticles.length > 0 ? (
            featuredArticles.map((item, idx) => (
              <MagazineArticleTile 
                key={item.id} 
                mobileTile={true} 
                featured={item.isFeatured && idx === 0} 
                article={item} 
              />
            ))
          ) : (
            <Text>No featured articles available.</Text>
          )}
        </Flex>
        <Flex direction="column" justify="center" align="center" wrap="wrap" my={8}>
          <Flex borderTop="2px solid #000000" grow="grow" align="center">
            <Text bg="#000000" color="#FFFFFF" fontWeight="700" py={2} px={4}>Trending Stories</Text>
            <Text color="#000000" bg="#FFFFFF" p={2}>Top stories this month</Text>
          </Flex>
          {regularArticles.length > 0 ? (
            regularArticles.map(item => (
              <MagazineArticleTile key={item.id} mobileTile={true} article={item} />
            ))
          ) : (
            <Text>No trending articles available.</Text>
          )}
        </Flex>
      </Show>
    </Flex>
  )
}