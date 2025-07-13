'use client'
import { useEffect } from 'react'
import { Flex, Button, Text, Image, Divider, Box  } from '@chakra-ui/react'
import { useParams } from 'next/navigation'
import FromThemagazine from '../../components/from_the_magazine'
import useFirebaseCollection from "../../../utils/useFirebaseCollection"
import Head from "../../../utils/useHeadSEO"

export default function Home() {
  const params = useParams();
  const { item: localArticle, getItemByFieldValue } = useFirebaseCollection("articles");

  useEffect(() => {
    getItemByFieldValue('slug', params.slug);
  }, []);

  const shareArticle = async() => {
    navigator.share({'url': `https://nordstern.ae/magazine/${localArticle.slug}`, 'text': "Check out this article from the Nordstern Magazine: " + localArticle.title });
  }

  return (
    <Flex direction="column">
      {!!localArticle.title && (<Flex direction="column" justify="center" align="center" my={4} w={{ base: "100vw", md: "80vw", lg: "1160px"}} mx="auto">
        <Head title={localArticle.title} metaDescription={localArticle.excerpt} imageLink={localArticle.tileImage[0].downloadURL} />
        <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={4} p={4} align="center">
          <Text variant='articleTitle' align="center" mb={2}>{localArticle.title}</Text>
          <Text variant="blackSubtitle" my={2}>{localArticle.category}</Text>
          <Flex my={2}>
            <Text variant="blackSubtitle">{new Date(localArticle.datePublished.seconds * 1000).toDateString()}</Text>
            <Text variant="blackSubtitle" px={2}>{"-"}</Text>
            <Text variant="blackSubtitle">{localArticle.readingTime}{" mins read"}</Text>
          </Flex>
        </Flex>
        <Flex w="100vw" h={{ base: "280px", md: "650px" }}>
          <Box bg={`url('${localArticle.tileImage[0].downloadURL}')`} bgSize="cover" bgPosition="center" h="100%" w="100%" ></Box>
        </Flex>

        <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={4} p={4} justify="center">
          <Text variant="largetext" dangerouslySetInnerHTML={{ __html: localArticle.bodyStart }}></Text>
        </Flex>

        <Flex w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={4} p={4} justify="center">
          {localArticle.inlineImages && localArticle.inlineImages.map(img => (<Box key={img.downloadURL} bg={`url('${img.downloadURL}')`} bgSize="cover" bgPosition="center" mx={2} w={{ base: "150px", md: "400px" }} h={{ base: "140px", md: "380px" }} ></Box>))}
        </Flex>

        <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={4} p={4} justify="center">
          <Text variant="largetext" dangerouslySetInnerHTML={{ __html: localArticle.bodyEnd }}></Text>
          <Divider my={8} />
          <Button onClick={shareArticle} size="m" alignSelf="center" m={4} variant="light">SHARE</Button>
        </Flex>
        
      </Flex>)}
      <FromThemagazine limit="3" />
    </Flex>
  )
}
