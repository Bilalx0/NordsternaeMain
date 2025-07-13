'use client'
import { useState, useEffect } from 'react'
import { Flex, Button, Text, Center, Show  } from '@chakra-ui/react'
import MagazineArticleTile from '../components/magazine_article_tile'
import useFirebaseCollection from "../../utils/useFirebaseCollection"
import Head from "../../utils/useHeadSEO"

export default function Home() {
  const { items, loadArticles } = useFirebaseCollection("articles");
  const [regularArticles, setRegularArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [superArticle, setSuperArticle] = useState({});

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    setSuperArticle(items.filter(x => !!x.superFeature)[0]);
    setFeaturedArticles(items.filter(x => !!x.isFeatured && !x.superFeature));
    setRegularArticles(items.filter(x => !x.isFeatured));
  }, [items]);

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
              {superArticle && <MagazineArticleTile key={superArticle.id} desktopPrimary={true} article={superArticle} />}
            </Flex>
            <Flex direction="column">
              {featuredArticles.length && <MagazineArticleTile key={featuredArticles[0].id} desktopSecondary={true} article={featuredArticles[0]} />}
              {featuredArticles.length && <MagazineArticleTile key={featuredArticles[1].id} desktopSecondary={true} article={featuredArticles[1]} />}
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" justify="center" align="center" wrap="wrap" my={8}>
          <Flex borderTop="2px solid #000000" w={{ md: "80vw", lg: "946px" }} m={2} align="center">
            <Text bg="#000000" color="#FFFFFF" fontWeight="700" py={2} px={4}>Trending Stories</Text>
            <Text color="#000000" bg="#FFFFFF" p={2}>Top stories this month</Text>
          </Flex>
          <Flex wrap="wrap" grow="grow" justify="flex-start">
           {regularArticles.length && regularArticles.map(item => (<MagazineArticleTile desktopTertiary={true} key={item.id} article={item} />))}
          </Flex>
        </Flex>
      </Show>

      <Show below="md">
        <Flex direction="column" justify="center" align="center" wrap="wrap" my={8}>
          <Flex borderTop="2px solid #000000" grow="grow" align="center">
            <Text bg="#000000" color="#FFFFFF" fontWeight="700" py={2} px={4}>Top picks</Text>
            <Text color="#000000" bg="#FFFFFF" p={2}>Catch up on the latest stories</Text>
          </Flex>
          {superArticle && <MagazineArticleTile key={superArticle.id} mobileTile={true} article={superArticle} />}
          {featuredArticles.length && featuredArticles.map((item, idx) => (<MagazineArticleTile key={item.id} mobileTile={true} featured={item.isFeatured && (idx === 0)} article={item} />))}
        </Flex>
        <Flex direction="column" justify="center" align="center" wrap="wrap" my={8}>
          <Flex borderTop="2px solid #000000" grow="grow" align="center">
            <Text bg="#000000" color="#FFFFFF" fontWeight="700" py={2} px={4}>Trending Stories</Text>
            <Text color="#000000" bg="#FFFFFF" p={2}>Top stories this month</Text>
          </Flex>
          {regularArticles.length && regularArticles.map((item, idx) => (<MagazineArticleTile key={item.id} mobileTile={true} article={item} />))}
        </Flex>
      </Show>
    </Flex>
  )
}
