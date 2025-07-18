'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Button, Stack, Image, Show } from '@chakra-ui/react'
import Link from 'next/link'
import { useQueryClient } from '@tanstack/react-query'
import PropertyListing from '../components/property_listing'
import useCurrency from "../../utils/useCurrency" 
import useMetric from "../../utils/useMetric"
import { Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerBody } from '@chakra-ui/react'
import { usePropertyByReference, useAgentByName, useAgentByLicenseNumber, useSimilarProperties } from "../../utils/useCMSHooks"

export default function PropertyDetailPage({ params }) {
  const { reference: propRef } = params; // Use dynamic route parameter instead of searchParams
  const queryClient = useQueryClient();

  const { userCurrency, getPriceInUserCurrency } = useCurrency();
  const { userUnits, getAreaInUserUnits } = useMetric();

  const { data: cmsItem, isLoading: isLoadingCMSItem, error: cmsItemError } = usePropertyByReference(propRef);
  const { data: cmsSimilarItems, isLoading: isLoadingSimilarItems, error: similarItemsError } = useSimilarProperties(cmsItem?.reference === propRef ? cmsItem?.propertyType : null, cmsItem?.reference === propRef ? cmsItem?.reference : null);

  const [agentIdentifier, setAgentIdentifier] = useState(null);
  const [agentIdentifierType, setAgentIdentifierType] = useState(null);
  const { data: cmsAgentByName, isLoading: isLoadingCMSAgentByName, error: cmsAgentByNameError } = useAgentByName(
    agentIdentifierType === 'name' ? agentIdentifier : null
  );
  const { data: cmsAgentByLicense, isLoading: isLoadingCMSAgentByLicense, error: cmsAgentByLicenseError } = useAgentByLicenseNumber(
    agentIdentifierType === 'licenseNumber' ? agentIdentifier : null
  );

  const [showCompleteDescription, setShowCompleteDescription] = useState(false);
  const [mapsAddress, setMapsAddress] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [chosenImage, setChosenImage] = useState("");
  const [displayItem, setDisplayItem] = useState(null);
  const [displayAgent, setDisplayAgent] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);

  // Invalidate cache on propRef change
  useEffect(() => {
    console.log(`[PropRef Change] Current propRef: ${propRef}`);
    queryClient.invalidateQueries(['propertyByReference', propRef]);
    queryClient.invalidateQueries(['agentByName']);
    queryClient.invalidateQueries(['agentByLicenseNumber']);
    queryClient.invalidateQueries(['similarProperties']);
  }, [propRef, queryClient]);

  // Reset states when propRef changes
  useEffect(() => {
    setDisplayItem(null);
    setDisplayAgent(null);
    setDisplayImages([]);
    setChosenImage("");
    setAgentIdentifier(null);
    setAgentIdentifierType(null);
    setMapsAddress("");
    console.log(`[State Reset] Cleared states for new propRef: ${propRef}`);
  }, [propRef]);

  // Handle CMS property data
  useEffect(() => {
    if (cmsItem && cmsItem.reference === propRef) {
      console.log(`[CMS Property Fetched] Reference: ${cmsItem.reference}, Title: ${cmsItem.title}`);
      setDisplayItem(cmsItem);

      if (cmsItem.agent && cmsItem.agent.length > 0) {
        const agentData = cmsItem.agent[0];
        if (agentData.licenseNumber) {
          setAgentIdentifier(agentData.licenseNumber);
          setAgentIdentifierType('licenseNumber');
          console.log(`[Agent Identifier] Using licenseNumber: ${agentData.licenseNumber}`);
        } else if (agentData.name) {
          setAgentIdentifier(agentData.name);
          setAgentIdentifierType('name');
          console.log(`[Agent Identifier] Using name: ${agentData.name}`);
        } else {
          setAgentIdentifier(null);
          setAgentIdentifierType(null);
          console.log(`[Agent Identifier] No valid identifier found for agent in CMS property.`);
        }
      } else {
        setAgentIdentifier(null);
        setAgentIdentifierType(null);
        console.log(`[Agent Identifier] No agent data in CMS property.`);
      }
    } else if (cmsItem && cmsItem.reference !== propRef) {
      console.warn(`[CMS Property Mismatch] Expected reference: ${propRef}, Got: ${cmsItem.reference}`);
      setDisplayItem(null);
    } else {
      setDisplayItem(null);
      console.log(`[Property Set] CMS item is null for reference: ${propRef}`);
    }
  }, [cmsItem, propRef]);

  // Handle CMS agent data
  useEffect(() => {
    if (cmsAgentByLicense) {
      setDisplayAgent({ ...cmsAgentByLicense, source: 'cms-license' });
      console.log(`[Agent Set] Display agent set from CMS by licenseNumber: ${cmsAgentByLicense.name}`);
    } else if (cmsAgentByName) {
      setDisplayAgent({ ...cmsAgentByName, source: 'cms-name' });
      console.log(`[Agent Set] Display agent set from CMS by name: ${cmsAgentByName.name}`);
    } else {
      setDisplayAgent(null);
      console.log(`[Agent Set] No agent found for identifier "${agentIdentifier}" in CMS.`);
    }
  }, [cmsAgentByName, cmsAgentByLicense, agentIdentifier]);

  // Handle images and map
  useEffect(() => {
    if (displayItem && displayItem.reference === propRef) {
      const addressForMaps = displayItem.address || displayItem.community || "Dubai";
      setMapsAddress(`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}&q=${encodeURIComponent(addressForMaps)}`);

      const tempImages = displayItem.images && Array.isArray(displayItem.images) && displayItem.images.length > 0
        ? displayItem.images.map(img => typeof img === 'object' && img.downloadURL ? img.downloadURL : img)
        : [];
      
      setDisplayImages(tempImages);
      setChosenImage(tempImages[0] || "");
      console.log(`[Images Set] ${tempImages.length} images loaded for ${displayItem.reference}. Chosen: ${tempImages[0] || 'none'}`);
    }
  }, [displayItem, propRef]);

  // Debug errors
  useEffect(() => {
    if (cmsItemError) console.error("Error fetching property from CMS:", cmsItemError);
    if (cmsAgentByNameError) console.error("Error fetching agent by name from CMS:", cmsAgentByNameError);
    if (cmsAgentByLicenseError) console.error("Error fetching agent by license number from CMS:", cmsAgentByLicenseError);
    if (similarItemsError) console.error("Error fetching similar properties from CMS:", similarItemsError);
  }, [cmsItemError, cmsAgentByNameError, cmsAgentByLicenseError, similarItemsError]);

  const closeDrawer = () => {
    setIsOpen(false);
    console.log("[Drawer] Photo drawer closed.");
  };

  const isLoading = isLoadingCMSItem || isLoadingCMSAgentByName || isLoadingCMSAgentByLicense || isLoadingSimilarItems;

  if (isLoading && !displayItem) {
    return (
      <Flex direction="column" justify="center" align="center" minH="100vh" bg="#FDF9F3">
        <Text>Loading property details for reference: {propRef}...</Text>
      </Flex>
    );
  }

  if (!displayItem || (cmsItem && cmsItem.reference !== propRef)) {
    return (
      <Flex direction="column" justify="center" align="center" minH="100vh" bg="#FDF9F3" gap={4}>
        <Text fontSize="xl" fontWeight="bold">Property not found for reference: {propRef}</Text>
        <Text color="gray.500">The property you are looking for may not exist or is temporarily unavailable.</Text>
        {cmsItemError && <Text color="red.500">Error: {cmsItemError.message}</Text>}
        {cmsItem && cmsItem.reference !== propRef && (
          <Text color="red.500">Error: Fetched incorrect property (Reference: {cmsItem.reference})</Text>
        )}
        <Button as={Link} href="/properties" variant="bigCTA" size="lg">
          Back to Properties
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column" minH="100vh" bg="#FDF9F3">
      <Show below="md">
        <Flex 
          h="64px" 
          justify="center" 
          align="center" 
          w="100%" 
          bg="#312A8F" 
          color="#FDF9F3" 
          position="fixed" 
          bottom="0" 
          left="0" 
          zIndex="99"
        >
          <Flex align="center" justify="center" flex="3">
            <Link href="/enquiry">
              <Text variant="propertyCTAText">REQUEST INFORMATION</Text>
            </Link>
          </Flex>
          <Flex align="center" justify="center" flex="2" borderLeft="1px solid #FDF9F3">
            <Link href="tel:+971 (0) 4 288 9093">
              <Text variant="propertyCTAText">CALL</Text>
            </Link>
          </Flex>
        </Flex>
      </Show>

      <Box w={{ base: "100%", md: "80%", lg: "946px" }} mx="auto" px={{ base: 4, md: 0 }}>
        <Text my={8} textAlign="center" variant="articleTitle">{displayItem.title || ""}</Text>
        <Flex color="#636363" align="center" justify="center" wrap="wrap" gap={2}>
          <Link href="/properties">
            <Text px={2} as="u" textTransform="capitalize">{displayItem.listingType}</Text>
          </Link>
          <Image alt="breadcrumb separator" src="/icon_breadcrumb.svg" w="16px" h="16px" />
          <Link href="/properties">
            <Text px={2} as="u" textTransform="capitalize">{displayItem.community}</Text>
          </Link>
          <Image alt="breadcrumb separator" src="/icon_breadcrumb.svg" w="16px" h="16px" />
          <Link href="/properties">
            <Text px={2} as="u" textTransform="capitalize">{displayItem.address}</Text>
          </Link>
        </Flex>
      </Box>

      <Flex direction="column" my={4} position="relative">
        <Box 
          bgImage={chosenImage} 
          bgSize="cover" 
          bgPosition="center" 
          w="100%" 
          h={{ base: "400px", md: "650px" }}
          borderRadius="md"
        />
        <Button 
          alignSelf="flex-end" 
          mt={{ base: -12, md: -16 }} 
          mr={4} 
          variant="bright" 
          onClick={() => setIsOpen(true)}
        >
          SHOW ALL PHOTOS
        </Button>
      </Flex>

      <Flex 
        w={{ base: "100%", md: "80%", lg: "946px" }} 
        mx="auto" 
        my={8} 
        direction={{ base: "column", md: "row" }} 
        gap={6}
      >
        <Flex direction="column" flex={{ base: "1", md: "0 0 70%" }} gap={6}>
          <Box px={{ base: 4, md: 8 }} py={4}>
            <Text fontSize={{ base: "2xl", md: "4xl" }} textTransform="capitalize">{displayItem.title}</Text>
            <Flex wrap="wrap" gap={4} mt={2}>
              <Text as="u" textTransform="capitalize">{displayItem.propertyType}</Text>
              <Text as="u">{displayItem.bedrooms} beds</Text>
              <Text as="u">{displayItem.bathrooms} baths</Text>
              <Text as="u">{getAreaInUserUnits(displayItem.sqfeetBuiltup)} {userUnits === "american" ? "sq. ft." : "sqm"} built up</Text>
              <Text as="u">{getAreaInUserUnits(displayItem.sqfeetArea)} {userUnits === "american" ? "sq. ft." : "sqm"} plot</Text>
            </Flex>
            <Flex direction="column" my={4}>
              <Text 
                variant="largetext" 
                noOfLines={showCompleteDescription ? undefined : 6}
                dangerouslySetInnerHTML={{ __html: displayItem.description || "" }}
              />
              <Button 
                variant="linkButton" 
                my={2} 
                onClick={() => setShowCompleteDescription(!showCompleteDescription)}
              >
                <Flex align="center">
                  <Image 
                    alt="toggle details" 
                    src={showCompleteDescription ? "/icon_minus.svg" : "/icon_plus.svg"} 
                    w="24px" 
                    h="24px" 
                  />
                  <Text px={2}>{showCompleteDescription ? "Show Less" : "Expand Details"}</Text>
                </Flex>
              </Button>
              <Button 
                as="a" 
                href={`/enquiry?reference=${displayItem.reference}`} 
                my={4} 
                variant="bigCTA"
                size="lg"
              >
                REQUEST INFORMATION
              </Button>
            </Flex>
          </Box>

          <Show below="md">
            <Box 
              bg="#312A8F" 
              color="#FFFFFF" 
              borderRadius={8} 
              p={6} 
              mx={4}
              maxW="400px"
              alignSelf="center"
            >
              <Flex wrap="wrap" gap={2}>
                <Text textTransform="capitalize" variant="justRoboto">For {displayItem.listingType}</Text>
                {displayItem.isFeatured && <Text textTransform="capitalize" variant="justRoboto">Featured</Text>}
                <Text textTransform="capitalize" variant="justRoboto">{displayItem.propertyStatus}</Text>
              </Flex>
              <Flex direction="column" mt={4}>
                {userCurrency === "AED" && displayItem.price && (
                  <Text variant="ctaBoxTitle">{displayItem.currency} {displayItem.price.toLocaleString()}</Text>
                )}
                {userCurrency !== "AED" && displayItem.price && (
                  <>
                    <Text variant="ctaBoxTitle">{userCurrency} {getPriceInUserCurrency(displayItem.price, userCurrency)?.toLocaleString()}</Text>
                    <Text color="#CDCDCD">{displayItem.currency} {displayItem.price.toLocaleString()}</Text>
                  </>
                )}
                <Text mt={4} textTransform="capitalize">{displayItem.address}</Text>
                <Text textTransform="capitalize">{displayItem.community} {displayItem.region}</Text>
                <Text mt={4} textTransform="capitalize">Reference {displayItem.reference}</Text>
                <Text textTransform="capitalize">Permit {displayItem.permit}</Text>
              </Flex>
              <Button 
                as="a" 
                href={`/enquiry?reference=${displayItem.reference}`} 
                w="100%" 
                my={4}
                variant="whiteBigCTA"
              >
                DOWNLOAD BROCHURE
              </Button>
            </Box>
          </Show>

          <Box px={8} py={4} borderTop="1px solid #000000">
            <Text fontWeight="bold" py={2}>Amenities</Text>
            <Flex direction="column" maxH="180px" flexWrap="wrap" gap={2}>
              {Array.isArray(displayItem.amenities) && displayItem.amenities.length > 0 ? (
                displayItem.amenities.map((amen) => (
                  <Flex key={amen} align="center">
                    <Image alt="bullet point" src="/icon_bullet_point.svg" w="6px" h="6px" />
                    <Text px={2}>{amen}</Text>
                  </Flex>
                ))
              ) : (
                <Text>No amenities listed.</Text>
              )}
            </Flex>
            <Stack my={8}>
              <Text fontWeight="bold">Lifestyle</Text>
              <Text as="u">{displayItem.lifestyle || "Not specified"}</Text>
            </Stack>
          </Box>

          <Box px={8} py={4}>
            <Text fontWeight="bold">Location</Text>
            <Text>{displayItem.address}</Text>
            <Box w="100%" h={{ base: "300px", md: "450px" }} mt={4}>
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapsAddress}
              />
            </Box>
          </Box>

          {displayAgent ? (
            <Box px={8} py={4}>
              <Flex direction={{ base: "column-reverse", md: "row" }} gap={6}>
                <Flex direction="column" flex="1">
                  <Text fontSize="20px" fontWeight="bold">Property Representative</Text>
                  <Link href={`/agent/${displayAgent.licenseNumber}`}>
                    <Text variant="robotoSearchBigTitle" textDecoration="underline" py={4}>
                      {displayAgent.name}
                    </Text>
                  </Link>
                  <Text fontSize="16px">{displayAgent.jobTitle || "Agent"} - {displayAgent.location || "Dubai"}</Text>
                  <Text fontSize="16px">License no. {displayAgent.licenseNumber}</Text>
                  <Flex align="center" gap={2}>
                    <Text fontSize="16px">Languages:</Text>
                    {Array.isArray(displayAgent.languages) && displayAgent.languages.length > 0 ? (
                      displayAgent.languages.map((lang) => (
                        <Text key={lang} fontSize="14px">{lang}</Text>
                      ))
                    ) : (
                      <Text fontSize="14px">Not specified</Text>
                    )}
                  </Flex>
                  <Button 
                    as="a" 
                    href="/enquiry" 
                    variant="light" 
                    size="md" 
                    mt={4}
                  >
                    CONTACT AGENT
                  </Button>
                </Flex>
                <Box 
                  w={{ base: "100%", md: "340px" }} 
                  h="340px" 
                  bgImage={
                    (displayAgent.headShot?.[0]?.downloadURL || displayAgent.headShot?.[0]) ||
                    (displayAgent.photo?.[0]?.downloadURL || displayAgent.photo?.[0]) ||
                    "/agent_placeholder.jpeg"
                  }
                  bgPosition="center" 
                  bgSize="cover" 
                  borderRadius="md"
                />
              </Flex>
            </Box>
          ) : (
            <Box px={8} py={4}>
              <Text fontSize="20px" fontWeight="bold">Property Representative</Text>
              <Text color="gray.500">No agent assigned to this property.</Text>
            </Box>
          )}
        </Flex>

        <Show above="md">
          <Box 
            flex="0 0 340px" 
            bg="#312A8F" 
            color="#FFFFFF" 
            borderRadius={8} 
            p={6} 
            position="sticky" 
            top="120px"
            alignSelf="flex-start"
          >
            <Flex wrap="wrap" gap={2}>
              <Text textTransform="capitalize" variant="justRoboto">For {displayItem.listingType}</Text>
              {displayItem.isFeatured && <Text textTransform="capitalize" variant="justRoboto">Featured</Text>}
              <Text textTransform="capitalize" variant="justRoboto">{displayItem.propertyStatus}</Text>
            </Flex>
            <Flex direction="column" mt={4}>
              {userCurrency === "AED" && displayItem.price && (
                <Text variant="ctaBoxTitle">{displayItem.currency} {displayItem.price.toLocaleString()}</Text>
              )}
              {userCurrency !== "AED" && displayItem.price && (
                <>
                  <Text variant="ctaBoxTitle">{userCurrency} {getPriceInUserCurrency(displayItem.price, userCurrency)?.toLocaleString()}</Text>
                  <Text color="#CDCDCD">{displayItem.currency} {displayItem.price.toLocaleString()}</Text>
                </>
              )}
              <Text mt={4} textTransform="capitalize">{displayItem.address}</Text>
              <Text textTransform="capitalize">{displayItem.community} {displayItem.region}</Text>
              <Text mt={4} textTransform="capitalize">Reference {displayItem.reference}</Text>
              <Text textTransform="capitalize">Permit {displayItem.permit}</Text>
            </Flex>
            <Stack mt={4} spacing={3}>
              <Button 
                as="a" 
                href={`/enquiry?reference=${displayItem.reference}`} 
                variant="whiteBigCTA"
                w="100%"
              >
                REQUEST INFORMATION
              </Button>
              <Button 
                as="a" 
                href="https://wa.me/971564264660" 
                variant="bigCTANoBG"
                w="100%"
              >
                CLICK TO WHATSAPP
              </Button>
            </Stack>
          </Box>
        </Show>
      </Flex>

      <Flex bg="#312A8F" color="#FFFFFF" minH="400px" py={8}>
        <Flex 
          direction={{ base: "column-reverse", md: "row" }} 
          w={{ base: "100%", md: "80%", lg: "946px" }} 
          mx="auto" 
          gap={6}
        >
          <Flex direction="column" flex="3" p={{ base: 4, md: 8 }}>
            <Text fontSize={{ base: "24px", md: "30px" }}>Palm Jumeirah</Text>
            <Link href="/neighbourhoods">
              <Text as="u">Neighbourhood</Text>
            </Link>
            <Text fontSize="16px" my={4}>
              One of the more established areas in Dubai, Jumeirah&apos;s ideal location near the beach makes it perfect for beachside living. Brimming with history, this area was previously a fisherman diving and trading site. Previously known as Chicago Beach, this locality is known for hosting well-off expats and...
            </Text>
            <Button as="a" href="/enquiry" variant="darkNoBackground">
              BOOK VALUATION
            </Button>
          </Flex>
          <Flex flex="2" justify="center" align="center">
            <Image 
              alt="neighborhood description" 
              src="/development_placeholder_2.jpeg" 
              w="100%" 
              h={{ base: "200px", md: "auto" }} 
              objectFit="cover" 
              borderRadius="md"
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" bg="#FDF9F3" py={8} align="center">
        <Text fontSize={{ base: "24px", md: "30px" }} mb={4}>Similar Properties</Text>
        <Flex 
          w={{ base: "100%", md: "80%", lg: "946px" }} 
          overflowX="auto" 
          gap={4} 
          px={{ base: 4, md: 0 }}
          sx={{ 
            scrollbarWidth: 'thin',
            '&::-webkit-scrollbar': { height: '8px' },
            '&::-webkit-scrollbar-thumb': { background: '#312A8F', borderRadius: '4px' }
          }}
        >
          {cmsSimilarItems && cmsSimilarItems.length > 0 ? (
            cmsSimilarItems.map(item => (
              <Box key={item.reference} minW="300px">
                <PropertyListing reference={item.reference} listing={item} />
              </Box>
            ))
          ) : (
            <Text>No similar properties found.</Text>
          )}
        </Flex>
        <Button 
          as="a" 
          href="/properties" 
          mt={6} 
          variant="light"
        >
          VIEW MORE
        </Button>
      </Flex>

      <Drawer placement="top" onClose={closeDrawer} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent bg="#FDF9F3">
          <DrawerCloseButton />
          <DrawerBody>
            <Flex 
              direction={{ base: "column", md: "row" }} 
              h="100vh" 
              w={{ base: "100%", md: "80%", lg: "1420px" }} 
              mx="auto" 
              gap={4}
            >
              <Flex 
                direction={{ base: "row", md: "column" }} 
                flex="0 0 auto" 
                overflowY={{ base: "hidden", md: "auto" }} 
                overflowX={{ base: "auto", md: "hidden" }}
                maxW={{ base: "100%", md: "120px" }}
                maxH={{ base: "120px", md: "100%" }}
                gap={2}
                p={4}
                sx={{ 
                  scrollbarWidth: 'thin',
                  '&::-webkit-scrollbar': { 
                    width: { base: '8px', md: '8px' }, 
                    height: { base: '8px', md: 'auto' }
                  },
                  '&::-webkit-scrollbar-thumb': { 
                    background: '#312A8F', 
                    borderRadius: '4px' 
                  }
                }}
              >
                {displayImages && displayImages.length > 0 ? (
                  displayImages.map((image, index) => (
                    <Image 
                      key={index} 
                      src={image} 
                      alt={`Property photo ${index + 1}`} 
                      w={{ base: "80px", md: "100px" }} 
                      h={{ base: "80px", md: "100px" }} 
                      objectFit="cover" 
                      borderRadius="md"
                      cursor="pointer"
                      border={chosenImage === image ? "2px solid #312A8F" : "none"}
                      onClick={() => setChosenImage(image)}
                    />
                  ))
                ) : (
                  <Text>No images available.</Text>
                )}
              </Flex>
              <Flex 
                flex="1" 
                bgImage={chosenImage} 
                bgSize="contain" 
                bgPosition="center" 
                bgRepeat="no-repeat" 
                borderRadius="md"
                m={4}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}