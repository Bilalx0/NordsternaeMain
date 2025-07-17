'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Image } from '@chakra-ui/react'
import Link from 'next/link'
import useCurrency from "../../utils/useCurrency"
import useMetric from "../../utils/useMetric"
import { usePathname } from 'next/navigation'

export default function PropertyListing({ listing, reference, vspace }) {
  const [itemReference, setItemReference] = useState(reference);
  const { userCurrency, getPriceInUserCurrency } = useCurrency();
  const { userUnits, getAreaInUserUnits } = useMetric();
  const pathname = usePathname();
  const [isHomePage, setIsHomePage] = useState(false);

  useEffect(() => {
    if (pathname === "/") setIsHomePage(true);
    else setIsHomePage(false); // Ensure it's false if not on homepage
  }, [pathname]);
  const getImageUrl = (imagesArray) => {
    if (imagesArray && imagesArray.length > 0) {
      const firstImage = imagesArray[0];
      if (typeof firstImage === 'object' && firstImage.url) {
        return firstImage.url; 
      }
      if (typeof firstImage === 'object' && firstImage.src) {
        return firstImage.src; 
      }
      if (typeof firstImage === 'string') {
        return firstImage;
      }
    }
    return '/apartment_placeholder_1.jpeg';
  };

  useEffect(() => {
    if (reference) {
      setItemReference(reference);
    }
  }, [reference]);


  return (
    <Link href={`/property?reference=${listing?.reference || itemReference}`}>
      <Box
        w={{ base: "360px", md: "290px" }}
        maxW={isHomePage ? "290px" : undefined} 
        borderRadius={4}
        my={vspace}
        mx={{ base: "11px", md: "none" }}
        p={2}
        _hover={{
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 5px",
        }}>
        {listing && ( // Only render if listing data is available
          <>
            <Flex h="200px">
              {/* Use the getImageUrl helper function directly with listing.images */}
              <Image 
                alt="property photo" 
                src={getImageUrl(listing.images)} 
                width="100%" 
                height="100%" 
                objectFit="cover" 
              />
              
              {/* Positions for FEATURED/SOLD tags */}
              {!listing.sold && listing.isFeatured && ( // Only show FEATURED if not sold and isFeatured
                <Text
                  ml={{ base: isHomePage ? "-270px" : "-340px", md: "-270px" }}
                  mt="4px" p={2} px={4} h={8} variant="featuredTag"
                >
                  FEATURED
                </Text>
              )}
              {!!listing.sold && ( // Only show SOLD if sold is true
                <Text
                  ml={{ base: isHomePage ? "-270px" : "-340px", md: "-270px" }}
                  mt="4px" p={2} px={4} h={8} variant="featuredTag" bg="#6831f7"
                >
                  SOLD
                </Text>
              )}
            </Flex>
            <Box textAlign="left" minW="240">
              <Text my={2} variant="tileItemTitle">{listing.title || 'N/A'}</Text>
              <Text my={1} variant="tileItemText" fontWeight="600">{listing.propertyStatus || 'N/A'}</Text>
              <Text my={1} variant="tileItemText">{listing.community || 'N/A'}</Text>
              {listing.price !== undefined && listing.price !== null ? (
                <Text my={1} variant="tileItemText">{userCurrency}{" "}{getPriceInUserCurrency(listing.price).toLocaleString()}</Text>
              ) : (
                <Text my={1} variant="tileItemText">Price: N/A</Text>
              )}
              <Text my={1} variant="tileItemText">
                {listing.propertyType || 'N/A'} - {listing.bedrooms !== undefined && listing.bedrooms !== null ? `${listing.bedrooms} Beds` : 'N/A Beds'} -{" "}
                {listing.sqfeetArea !== undefined && listing.sqfeetArea !== null ? `${getAreaInUserUnits(listing.sqfeetArea)}` : 'N/A'}
                {(userUnits === "american") ? " sq ft" : " sqm"}
              </Text>
            </Box>
          </>
        )}
      </Box>
    </Link>
  )
}