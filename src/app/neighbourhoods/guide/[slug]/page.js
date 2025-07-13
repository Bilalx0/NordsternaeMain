'use client'
import { useState, useEffect } from 'react'
import { Flex, Text, Divider, Box } from '@chakra-ui/react'
import useFirebaseCollection from "../../../../utils/useFirebaseCollection"
import { useParams } from 'next/navigation'


export default function Home() {
  const params = useParams();
  const { item, getItemByFieldValue } = useFirebaseCollection("neighborhoods");
  const [mapsAddress, setMapsAddress] = useState("Umm Suqeim 1, Umm Suqeim, Jumeirah, Dubai");
  const gmapsURL = "https://www.google.com/maps/embed/v1/place?key="+ process.env.NEXT_PUBLIC_GMAPS_API_KEY + "&q="+ mapsAddress;

  useEffect(() => {
    getItemByFieldValue("urlSlug", params.slug);
  }, []);

  useEffect(() => {
    if (item.title) {
      setMapsAddress(item.address);
      if (item.agent) {
        loadAgent("name", item.agent);
      }
    }
  }, [item]);

  return (
    <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={8}>
      {item.title && <Flex direction="column" align="center" justify="center">
        <Text my={2} variant="articleTitle" align="center">{item.title}</Text>
        <Text my={2} variant="blackSubtitle" align="center">{item.subtitle}</Text>

        <Flex w="100vw" my={4} h={{ base: "280px", md: "650px" }}>
          <Box bg={`url('${item.bannerImage[0].downloadURL}')`} bgSize="cover" bgPosition="center" h="100%" w="100%" ></Box>
        </Flex>
        <Text my={8} p={4} variant="largetext" dangerouslySetInnerHTML={{ __html: item.description }}></Text>
        <Divider />
        <Flex direction="column" p={4} justify="center">
          <Text my={2} fontWeight="700">On The Map</Text>
          <iframe
            width="100%"
            height="450"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={gmapsURL}>
          </iframe>
          <Text my={4} dangerouslySetInnerHTML={{ __html: item.locationAttributes }}></Text>
        </Flex>
        <Divider />

        <Text my={4} variant="robotoNormalTitle">The Neighbours</Text>
        <Text p={4} variant="largetext" dangerouslySetInnerHTML={{ __html: item.neighboursText }}></Text>

        <Flex w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={4} p={4} justify="center">
          {item.images && item.images.map(img => (<Box key={img.downloadURL} bg={`url('${img.downloadURL}')`} bgSize="cover" bgPosition="center" mx={2} w={{ base: "150px", md: "400px" }} h={{ base: "140px", md: "380px" }} ></Box>))}
        </Flex>

        <Text p={4} fontWeight="500">{item.subtitleBlurb}</Text>
      </Flex>}
    </Flex>
  )
}

