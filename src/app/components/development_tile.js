'use client'
import { Flex, Text, Box } from '@chakra-ui/react'
import Link from 'next/link'
import useCurrency from "../../utils/useCurrency"

export default function DevelopmentTile({ content, slug }) {
  const { userCurrency, getPriceInUserCurrency } = useCurrency();

  return (
    <Link href={`/developments/${slug}`}>
      <Flex
        direction="column" 
        width="280px"
        borderRadius={4}
        mr="20px"
        p={2}
        _hover={{
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 5px",
        }}>
        {content && content.images && (<Flex>
            <Box bg={`url('${content.images[0].downloadURL}')`} bgSize="cover" bgPosition="center" width="100%" height="420px">
              <Text p={2} fontSize="22px" fontWeight="600" h={10} color="#FDF9F3">{content.title}</Text>
            </Box>
          </Flex>)}
       {content && (
          <Flex direction="column" textAlign="left" minW="240" my={4}>
            <Text my={2} variant="tileItemTitle">{content.propertyType}</Text>
            <Text my={1} variant="tileItemText">{content.area}</Text>
            <Text my={1} variant="tileItemText">{content.minBedrooms}{' to '}{content.maxBedrooms}{' Beds'}</Text>
            <Text my={1} variant="tileItemText">{"From "}{userCurrency}{" "}{getPriceInUserCurrency(content.price).toLocaleString()}</Text>
          </Flex>
        )}
      </Flex>
    </Link>
  )
}