'use client'
import { Flex, Text, Box } from '@chakra-ui/react'
import Link from 'next/link'

export default function NeighbourhoodTile({ content, slug }) {

  return (
    <Link href={`/neighbourhoods/${slug}`}>
      <Flex
        direction="column" 
        w={{ base: "360px", md: "290px" }}
        mr="20px"
        my={4}
        p={2}
        _hover={{
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 5px",
        }}
        >
        {content && content.images && 
          <Box bg={`url('${content.bannerImage[0].downloadURL}')`} bgSize="cover" bgPosition="center" width="100%" h={{ base: "260px", md: "200px" }} />
        }
        {content && (
          <Flex direction="column" textAlign="left">
            <Text my={2} variant="tileItemTitle">{content.title}</Text>
            <Text my={1} variant="tileItemText">{content.availableProperties}{' Properties'}</Text>
            <Flex wrap="wrap">
              {content.propertyOffers.map((offer, idx) => <Text key={idx} mr={4}>{offer}</Text>)}
            </Flex>
          </Flex>
        )}
      </Flex>
    </Link>
  )
}