'use client'
import { useQuery } from '@tanstack/react-query';
import { Flex, Button, Text, Divider, Box } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import FromTheMagazine from '../../components/from_the_magazine';
import Head from '../../../utils/useHeadSEO';
import fetchCmsDataByField from '../../../utils/useCMSHooks';

export default function Home() {
  const params = useParams();
  const { data: localArticle, isLoading, isError, error } = useQuery({
    queryKey: ['article', params.slug],
    queryFn: () => fetchCmsDataByField('articles', 'slug', params.slug),
    enabled: !!params.slug,
    staleTime: 0,
    cacheTime: 0,
    retry: 1,
  });

  const shareArticle = async () => {
    if (localArticle) {
      navigator.share({
        url: `https://nordstern.ae/magazine/${localArticle.slug}`,
        text: `Check out this article from the Nordstern Magazine: ${localArticle.title}`,
      });
    }
  };

  if (isLoading) {
    return <Flex justify="center" align="center" minH="100vh">Loading...</Flex>;
  }

  if (isError || !localArticle) {
    return <Flex justify="center" align="center" minH="100vh">Error: {error?.message || 'Article not found'}</Flex>;
  }

  return (
    <Flex direction="column">
      {!!localArticle.title && (
        <Flex direction="column" justify="center" align="center" my={4} w={{ base: '100vw', md: '80vw', lg: '1160px' }} mx="auto">
          <Head
            title={localArticle.title}
            metaDescription={localArticle.excerpt}
            imageLink={localArticle.tileImage}
          />
          <Flex direction="column" w={{ base: '100vw', md: '80vw', lg: '946px' }} mx="auto" my={4} p={4} align="center">
            <Text variant="articleTitle" align="center" mb={2}>
              {localArticle.title}
            </Text>
            <Text variant="blackSubtitle" my={2}>
              {localArticle.category}
            </Text>
            <Flex my={2}>
              <Text variant="blackSubtitle">
                {new Date(localArticle.datePublished).toDateString()}
              </Text>
              <Text variant="blackSubtitle" px={2}>
                {'-'}
              </Text>
              <Text variant="blackSubtitle">
                {localArticle.readingTime} mins read
              </Text>
            </Flex>
          </Flex>
          <Flex w="100vw" h={{ base: '280px', md: '650px' }}>
            <Box
              backgroundImage={`url(${localArticle.tileImage})`}
              bgSize="cover"
              bgPosition="center"
              h="100%"
              w="100%"
            ></Box>
          </Flex>

          <Flex direction="column" w={{ base: '100vw', md: '80vw', lg: '946px' }} mx="auto" my={4} p={4} justify="center">
            <Text variant="largetext" dangerouslySetInnerHTML={{ __html: localArticle.bodyStart }}></Text>
          </Flex>

          <Flex w={{ base: '100vw', md: '80vw', lg: '946px' }} mx="auto" my={4} p={4} justify="center">
            {localArticle.inlineImages &&
              localArticle.inlineImages.map((img) => (
                <Box
                  key={img}
                  backgroundImage={`${img}`}
                  bgSize="cover"
                  bgPosition="center"
                  mx={2}
                  w={{ base: '150px', md: '400px' }}
                  h={{ base: '140px', md: '380px' }}
                ></Box>
              ))}
          </Flex>

          <Flex direction="column" w={{ base: '100vw', md: '80vw', lg: '946px' }} mx="auto" my={4} p={4} justify="center">
            <Text variant="largetext" dangerouslySetInnerHTML={{ __html: localArticle.bodyEnd }}></Text>
            <Divider my={8} />
            <Button onClick={shareArticle} size="m" alignSelf="center" m={4} variant="light">
              SHARE
            </Button>
          </Flex>
        </Flex>
      )}
      <FromTheMagazine limit="3" excludeSlug={params.slug}/>
    </Flex>
  );
}