'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Image } from '@chakra-ui/react'
import Link from 'next/link'
import useFirebaseCollection from "../../utils/useFirebaseCollection"
import useCurrency from "../../utils/useCurrency"
import useMetric from "../../utils/useMetric"
import { usePathname } from 'next/navigation'

export default function PropertyListing({ listing, reference, vspace }) {
  const [itemReference, setItemReference] = useState(reference);
  const { userCurrency, getPriceInUserCurrency } = useCurrency();
  const { userUnits, getAreaInUserUnits } = useMetric();
  const pathname = usePathname();
  const[isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
      if (pathname === "/" ) setIsHomePage(true);
    }, []);
  
  return (
    <Link href={`/property?reference=${itemReference}`}>
      <Box 
        w={{ base: "360px", md: "290px" }}
        maxW={isHomePage ? "290px" : ""}
        borderRadius={4}
        my={vspace}
        mx={{ base: "11px", md: "none" }}
        p={2}
        _hover={{
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 5px",
        }}>
        {listing && listing.images && (<Flex h="200px">
            {(listing.images.length >= 1) && <Image alt="property photo" src={listing.images[0].downloadURL} width="100%" height="100%" />}
            {!listing.images.length && <Image alt="property photo" src='/apartment_placeholder_1.jpeg' width="100%" height="100%" />}
            {!listing.sold && <Text display={ listing.isFeatured ? "block" : "none"} ml={{ base: isHomePage ? "-270px" : "-340px", md: "-270px" }}  mt="4px" p={2} px={4} h={8} variant="featuredTag">FEATURED</Text>}
            {!!listing.sold && <Text ml={{ base: isHomePage ? "-270px" : "-340px", md: "-270px" }} mt="4px" p={2} px={4} h={8} variant="featuredTag" bg="#6831f7">SOLD</Text>}
          </Flex>)}
       {listing && (
          <Box textAlign="left" minW="240">
            <Text my={2} variant="tileItemTitle">{listing.title}</Text>
            <Text my={1} variant="tileItemText" fontWeight="600">{listing.propertyStatus}</Text>
            <Text my={1} variant="tileItemText">{listing.community}</Text>
            <Text my={1} variant="tileItemText">{userCurrency}{" "}{getPriceInUserCurrency(listing.price).toLocaleString()}</Text>
            <Text my={1} variant="tileItemText">{listing.propertyType}{" - "}{listing.bedrooms}{" Beds - "}{getAreaInUserUnits(listing.sqfeetArea)}{(userUnits === "american") ? " sq ft" : " sqm"}</Text>
          </Box>
        )}
      </Box>
    </Link>
  )
}