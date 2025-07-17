'use client'
import { useState, useEffect, useCallback } from 'react'
import { Flex, Box, Text, Button, Stack, Image, Show } from '@chakra-ui/react'
import Link from 'next/link'
import PropertyListing from '../components/property_listing'

import useCurrency from "../../utils/useCurrency" 
import useMetric from "../../utils/useMetric"
import { useSearchParams } from 'next/navigation'
import { Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerBody } from '@chakra-ui/react'
import { usePropertyByReference, useAgentByName, useAgentByLicenseNumber, useSimilarProperties } from "../../utils/useCMSHooks"

export default function PropertyDetailPage() {
  const searchParams = useSearchParams();
  const propRef = searchParams.get("reference");

  const { userCurrency, getPriceInUserCurrency } = useCurrency();
  const { userUnits, getAreaInUserUnits } = useMetric();

  // ONLY CMS fetches for property and similar properties
  const { data: cmsItem, isLoading: isLoadingCMSItem, error: cmsItemError } = usePropertyByReference(propRef);
  const { data: cmsSimilarItems, isLoading: isLoadingSimilarItems, error: similarItemsError } = useSimilarProperties(cmsItem?.propertyType, cmsItem?.reference);

  // State to hold the agent's unique identifier (name or licenseNumber) derived from the property data
  const [agentIdentifier, setAgentIdentifier] = useState(null);
  const [agentIdentifierType, setAgentIdentifierType] = useState(null); // 'name' or 'licenseNumber'

  // Fetch CMS Agent based on the derived identifier
  const { data: cmsAgentByName, isLoading: isLoadingCMSAgentByName, error: cmsAgentByNameError } = useAgentByName(
    agentIdentifierType === 'name' ? agentIdentifier : null
  );
  const { data: cmsAgentByLicense, isLoading: isLoadingCMSAgentByLicense, error: cmsAgentByLicenseError } = useAgentByLicenseNumber(
    agentIdentifierType === 'licenseNumber' ? agentIdentifier : null
  );

  const [showCompleteDescription, setShowCompleteDescription] = useState(false);
  const [mapsAddress, setMapsAddress] = useState(""); // Initialize empty, set in useEffect
  const [isOpen, setIsOpen] = useState(false);
  const [chosenImage, setChosenImage] = useState("url('/villa_placeholder_2.jpeg')");
  // Default images moved inside useEffect to react to displayItem's images

  // Unified state for the property and agent that will be rendered
  const [displayItem, setDisplayItem] = useState(null);
  const [displayAgent, setDisplayAgent] = useState(null);
  const [displayImages, setDisplayImages] = useState([]); // Unified state for images


  // --- Debugging/Logging for errors ---
  useEffect(() => {
    if (cmsItemError) {
      console.error("Error fetching property from CMS:", cmsItemError);
    }
    if (cmsAgentByNameError) {
      console.error("Error fetching agent by name from CMS:", cmsAgentByNameError);
    }
    if (cmsAgentByLicenseError) {
      console.error("Error fetching agent by license number from CMS:", cmsAgentByLicenseError);
    }
    if (similarItemsError) {
        console.error("Error fetching similar properties from CMS:", similarItemsError);
    }
  }, [cmsItemError, cmsAgentByNameError, cmsAgentByLicenseError, similarItemsError]);


  // --- Effect to set displayItem and derive agent identifier from CMS property data ---
  useEffect(() => {
    if (cmsItem) {
      setDisplayItem(cmsItem);
      console.log(`[Property Set] Display item set from CMS for reference: ${cmsItem.reference}`);

      // Determine the best way to fetch the agent from the CMS property
      if (cmsItem.agent && cmsItem.agent.length > 0) {
        const agentData = cmsItem.agent[0]; // Assuming 'agent' is an array of agent objects from CMS
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
    } else {
      setDisplayItem(null);
      console.log(`[Property Set] CMS item is null for reference: ${propRef}`);
      setAgentIdentifier(null);
      setAgentIdentifierType(null);
    }
  }, [cmsItem, propRef]); // Only depends on cmsItem and propRef now

  // --- Effect to set displayAgent from CMS agent data ---
  useEffect(() => {
    // Prioritize agent fetched by licenseNumber, then by name
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
  }, [cmsAgentByName, cmsAgentByLicense, agentIdentifier]); // Only depends on CMS agent data now

  // --- Effect to set display properties (images, map address) once displayItem is ready ---
  useEffect(() => {
    if (displayItem) {
      const addressForMaps = displayItem.address || displayItem.community || "Dubai";
      setMapsAddress(`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GMAPS_API_KEY}&q=${encodeURIComponent(addressForMaps)}`);

      const tempImages = displayItem.images && Array.isArray(displayItem.images) && displayItem.images.length > 0
        ? displayItem.images.map(img => typeof img === 'object' && img.downloadURL ? img.downloadURL : img)
        : ["/villa_placeholder_2.jpeg", "/apartment_placeholder_1.jpeg", "/apartment_placeholder_3.jpeg"]; // Fallback images

      setDisplayImages(tempImages);
      setChosenImage(`url('${tempImages[0] || "/villa_placeholder_2.jpeg"}')`); // Ensure chosenImage always has a valid URL
      console.log(`[Images Set] ${tempImages.length} images loaded for ${displayItem.reference}. Chosen: ${tempImages[0]}`);

    }
  }, [displayItem]);


  const closeDrawer = () => {
    setIsOpen(false);
    console.log("[Drawer] Photo drawer closed.");
  };

  const isLoading = isLoadingCMSItem || isLoadingCMSAgentByName || isLoadingCMSAgentByLicense || isLoadingSimilarItems;

  if (isLoading && !displayItem) { // Only show loading if we haven't fetched the item yet
    return (
      <Flex direction="column" justify="center" align="center" h="100vh">
        <Text>Loading property details...</Text>
      </Flex>
    );
  }

  // If no item is found after loading, display a message
  if (!displayItem) {
    return (
      <Flex direction="column" justify="center" align="center" h="100vh">
        <Text>Property not found for reference: {propRef}</Text>
        {cmsItemError && <Text color="red.500">Error: {cmsItemError.message}</Text>}
      </Flex>
    );
  }

  return (
    <>
      <Flex direction="column">
        <Show below="md">
          <Flex h="64px" justify="center" w="100vw" bg="#312A8F" color="#FDF9F3" align="center" sx={{ position: 'fixed', bottom: '0px', left: '0px', 'z-index': '99' }}>
            <Flex align="center" justify="center" grow="3">
              <Link href="/enquiry">
                <Text variant="propertyCTAText">REQUEST INFORMATION</Text>
              </Link>
            </Flex>
            <Flex align="center" justify="center" grow="2" borderLeft="1px solid #FDFDFD">
              <Link href="tel:+971 (0) 4 288 9093">
                <Text variant="propertyCTAText">CALL</Text>
              </Link>
            </Flex>
          </Flex>
        </Show>

        <Box w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto">
          <Text my={16} align="center" variant="articleTitle">{displayItem.title || ""}</Text>
          <Flex color="#636363" align="center">
            <Link href={"/properties?search=&listingType=" + displayItem.listingType}><Text px={2} as="u" casing="capitalize">{displayItem.listingType}</Text></Link>
            <Image alt="next link" src="/icon_breadcrumb.svg" width="16px" height="16px" />
            <Link href={"/properties?search=" + encodeURIComponent(displayItem.community || "")}><Text px={2} as="u" casing="capitalize">{displayItem.community}</Text></Link>
            <Image alt="next link" src="/icon_breadcrumb.svg" width="16px" height="16px" />
            <Link href={"/properties?search=" + encodeURIComponent(displayItem.address || "")}><Text px={2} as="u" casing="capitalize">{displayItem.address}</Text></Link>
          </Flex>
        </Box>

        <Flex direction="column" my={4}>
          <Box bg={chosenImage} bgSize="cover" h="650" bgPosition="center"></Box>
          <Button alignSelf="flex-end" mt={-16} mr={8} variant="bright" onClick={() => setIsOpen(true)}>SHOW ALL PHOTOS</Button>
        </Flex>

        <Flex py={4} w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={8} direction={{ base: "column", md: "row" }}> {/* Added direction for responsiveness */}
          <Flex direction="column" w={{ base: "100%", md: "70%" }}> {/* Adjusted width for content area */}
            <Flex direction="column" p={4} m={{ base: 2, md: 4, lg: 8 }}>
              <Text fontSize="4xl" casing="capitalize">{displayItem.title}</Text>
              <Flex wrap="wrap" justify="space-between" mt={2}>
                <Text pr={2} as="u" casing="capitalize">{displayItem.propertyType}</Text>
                <Text pr={2} as="u">{displayItem.bedrooms}{" beds"}</Text>
                <Text pr={2} as="u">{displayItem.bathrooms}{" baths"}</Text>
                <Text pr={2} as="u">{getAreaInUserUnits(displayItem.sqfeetBuiltup)}{(userUnits === "american") ? "sq. ft." : "sqm"}{" built up"}</Text>
                <Text pr={2} as="u">{getAreaInUserUnits(displayItem.sqfeetArea)}{(userUnits === "american") ? "sq. ft." : "sqm"}{" plot"}</Text>
              </Flex>
              {!showCompleteDescription &&
                <Flex direction="column" wrap="wrap" my={4}>
                  <Text variant="largetext" noOfLines={6} dangerouslySetInnerHTML={{ __html: displayItem.description || "" }}></Text>
                  <Button my={2} mx={-8} variant="linkButton" onClick={() => setShowCompleteDescription(true)}><Flex align="center"><Image alt="details" src="/icon_plus.svg" width="24px" height="24px" /><Text px={2}>Expand Details</Text></Flex></Button>
                  <Button size="l" as="a" href={"/enquiry?reference=" + displayItem.reference} my={4} variant="bigCTA">REQUEST INFORMATION</Button>
                </Flex>
              }
              {!!showCompleteDescription &&
                <Flex direction="column" wrap="wrap" my={4}>
                  <Text variant="largetext" dangerouslySetInnerHTML={{ __html: displayItem.description || "" }}></Text>
                  <Button my={2} mx={-12} variant="linkButton" onClick={() => setShowCompleteDescription(false)}><Flex align="center"><Image alt="details" src="/icon_minus.svg" width="24px" height="24px" /><Text px={2}>Show Less</Text></Flex></Button>
                  <Button size="l" as="a" href={"/enquiry?reference=" + displayItem.reference} my={4} variant="bigCTA">REQUEST INFORMATION</Button>
                </Flex>
              }
              <Show below="md">
                <Flex direction="column" grow="1" p={4} bg="#312A8F" color="#FFFFFF" borderRadius={8} w="360px" maxHeight="420" alignSelf="center">
                  <Flex wrap="wrap">
                    <Text pr={2} casing="capitalize" variant="justRoboto">{"For "}{displayItem.listingType}</Text>
                    <Text pr={2} casing="capitalize" variant="justRoboto">{displayItem.isFeatured ? "Featured" : ""}</Text>
                    <Text pr={2} casing="capitalize" variant="justRoboto">{displayItem.propertyStatus}</Text>
                  </Flex>
                  <Flex direction="column" wrap="wrap">
                    {/* For the AED currency display */}
                    {(userCurrency === "AED") && displayItem.price && <Text mt={2} variant="ctaBoxTitle">{displayItem.currency}{" "}{displayItem.price.toLocaleString()}</Text>}

                    {/* For other currencies */}
                    {(userCurrency !== "AED") && displayItem.price && <Text mt={2} variant="ctaBoxTitle">{userCurrency}{" "}{getPriceInUserCurrency(displayItem.price, userCurrency)?.toLocaleString()}</Text>}

                    {/* For the fallback currency display */}
                    {(userCurrency !== "AED") && displayItem.price && <Text color="#CDCDCD">{displayItem.currency}{" "}{displayItem.price.toLocaleString()}</Text>}
                    <Text mt={4} casing="capitalize">{displayItem.address}</Text>
                    <Text casing="capitalize">{displayItem.community}{" "}{displayItem.region}</Text>

                    <Text mt={4} casing="capitalize">{"Reference "}{displayItem.reference}</Text>
                    <Text casing="capitalize">{"Permit "}{displayItem.permit}</Text>
                  </Flex>
                  <Stack my={4}>
                    <Button as="a" href={"/enquiry?reference=" + displayItem.reference} w="100%" my={4}>DOWNLOAD BROCHURE</Button>
                  </Stack>
                </Flex>
              </Show>
            </Flex>
            <Flex direction="column" p={8} justify="center" borderTop="1px solid #000000">
              <Text as="b" py={2}>Amenities</Text>
              <Flex direction="column" maxHeight="180" wrap="wrap">
                {Array.isArray(displayItem.amenities) && displayItem.amenities.length > 0 ? displayItem.amenities.map((amen) => (
                  <Flex key={amen} align="center">
                    <Image alt="" width="6px" height="6px" src="/icon_bullet_point.svg" />
                    <Text px={2}>{amen}</Text>
                  </Flex>)
                ) : <Text>No amenities listed.</Text>}
              </Flex>
              <Stack my={8}>
                <Text as="b">Lifestyle</Text>
                <Text as="u">{displayItem.lifestyle || "Not specified"}</Text>
              </Stack>
            </Flex>

            <Flex direction="column" p={8} pr={16} justify="center">
              <Text as="b">Location</Text>
              <Text>{displayItem.address}</Text>
              <iframe
                width="100%"
                height="450"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapsAddress}>
              </iframe>
            </Flex>

            {displayAgent && ( // Only render agent section if displayAgent is available
              <Flex p={8} direction={{ base: "column-reverse", md: "row" }}>
                <Flex direction="column" w="100%" justify="center">
                  <Text fontSize="20px" as="b">Property Representative</Text>
                  <Link href={`/agent?licenseNumber=${displayAgent.licenseNumber}`}>
                    <Text variant="robotoSearchBigTitle" sx={{ textDecoration: "underline" }} py={4}>{displayAgent.name}</Text>
                  </Link>
                  <Text fontSize="16px">{displayAgent.jobTitle || "Agent"}{" - "}{displayAgent.location || "Dubai"}</Text>
                  <Text fontSize="16px">{"License no. "}{displayAgent.licenseNumber}</Text>
                  <Flex align="center">
                    <Text fontSize="16px">{"Languages: "}</Text>
                    {Array.isArray(displayAgent.languages) && displayAgent.languages.length > 0 ? displayAgent.languages.map((lang) => (
                      <Text key={lang} fontSize="14px" px={2}>{lang}</Text>
                    )
                    ) : <Text fontSize="14px" px={2}>Not specified</Text>}
                  </Flex>
                  <Button as="a" href="/enquiry" variant="light" size="m" mt={16}>CONTACT AGENT</Button>
                </Flex>
                {/* Agent image handling: Prioritize headShot, then photo, then placeholder */}
                {displayAgent.headShot && Array.isArray(displayAgent.headShot) && displayAgent.headShot.length > 0 &&
                  <Box w="340px" h="340px" bg={`url('${displayAgent.headShot[0].downloadURL || displayAgent.headShot[0]}')`} bgPosition="center" bgSize="cover"></Box>
                }
                {(!displayAgent.headShot || displayAgent.headShot.length === 0) && displayAgent.photo && Array.isArray(displayAgent.photo) && displayAgent.photo.length > 0 &&
                  <Box w="340px" h="340px" bg={`url('${displayAgent.photo[0].downloadURL || displayAgent.photo[0]}')`} bgPosition="center" bgSize="cover"></Box>
                }
                {/* Fallback for agent image if neither headShot nor photo is available */}
                {((!displayAgent.headShot || displayAgent.headShot.length === 0) && (!displayAgent.photo || displayAgent.photo.length === 0)) &&
                  <Box w="340px" h="340px" bg={`url('/agent_placeholder.jpeg')`} bgPosition="center" bgSize="cover"></Box>
                }
              </Flex>
            )}

          </Flex>
          <Show above="md">
            <Flex direction="column" grow="1" p={4} m={8} bg="#312A8F" color="#FFFFFF" borderRadius={8} w="340px" maxHeight="380" sx={{ position: "sticky", top: "120px" }}>
              <Flex wrap="wrap">
                <Text pr={2} casing="capitalize" variant="justRoboto">{"For "}{displayItem.listingType}</Text>
                <Text pr={2} casing="capitalize" variant="justRoboto">{displayItem.isFeatured ? "Featured" : ""}</Text>
                <Text pr={2} casing="capitalize" variant="justRoboto">{displayItem.propertyStatus}</Text>
              </Flex>
              <Flex direction="column" wrap="wrap">
                {(userCurrency === "AED") && displayItem.price && <Text mt={2} variant="ctaBoxTitle">{displayItem.currency}{" "}{displayItem.price.toLocaleString()}</Text>}

                {/* For other currencies */}
                {(userCurrency !== "AED") && displayItem.price && <Text mt={2} variant="ctaBoxTitle">{userCurrency}{" "}{getPriceInUserCurrency(displayItem.price, userCurrency)?.toLocaleString()}</Text>}

                {/* For the fallback currency display */}
                {(userCurrency !== "AED") && displayItem.price && <Text color="#CDCDCD">{displayItem.currency}{" "}{displayItem.price.toLocaleString()}</Text>}
                <Text mt={4} casing="capitalize">{displayItem.address}</Text>
                <Text casing="capitalize">{displayItem.community}{" "}{displayItem.region}</Text>

                <Text mt={4} casing="capitalize">{"Reference "}{displayItem.reference}</Text>
                <Text casing="capitalize">{"Permit "}{displayItem.permit}</Text>
              </Flex>
              <Stack my={4}>
                <Button as="a" href={"/enquiry?reference=" + displayItem.reference} variant="whiteBigCTA">REQUEST INFORMATION</Button>
                <Button as="a" href="https://wa.me/971564264660" variant="bigCTANoBG" my={2}>CLICK TO WHATSAPP</Button>
              </Stack>
            </Flex>
          </Show>
        </Flex>

        <Flex bg="#312A8F" color="#FFFFFF" minH="400px">
          <Flex direction={{ base: "column-reverse", md: "row" }} w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto">
            <Flex direction="column" color="#FFFFFF" p={8} justify="center" grow="3">
              {/* Placeholder for neighborhood. You might want to fetch this from CMS too */}
              <Text fontSize="30px">Palm Jumeirah</Text>
              <Link href="/">
                <Text as="u">Neighbourhood</Text>
              </Link>
              <Text fontSize="16px" my={4}>One of the more established areas in Dubai, Jumeirah's ideal location near the beach makes it perfect for beachside living. Brimming with history, this area was previously a fisherman diving and trading site. Previously known as Chicago Beach, this locality is known for hosting well-off expats and...</Text>
              <Button as="a" href="/enquiry" variant="darkNoBackground">BOOK VALUATION</Button>
            </Flex>
            <Flex justify="center" align="center" grow="2">
              <Image alt="neighborhood description" src="/development_placeholder_2.jpeg" w={{ base: "100vw", md: "100%" }} h="auto" />
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="column" bg='#FDF9F3' justify="center" align="center" p={4} >
          <Text fontSize="30px" m={4} >Similar Properties</Text>
          <Flex overflow="scroll" justify="space-between" w={{ base: "100vw", md: "80vw", lg: "946px" }}>
            {cmsSimilarItems && cmsSimilarItems.length > 0 ? cmsSimilarItems.map(item => <PropertyListing key={item.reference} reference={item.reference} listing={item} />) : <Text>No similar properties found.</Text>}
          </Flex>
          <Button as="a" href={"/properties?search=&propertyType=" + (displayItem?.propertyType || "")} m={8} variant="light">VIEW MORE</Button>
        </Flex>
        <Drawer placement='top' onClose={closeDrawer} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent bg="#FDF9F3">
            <DrawerCloseButton />
            <DrawerBody>
              <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" w={{ base: "100vw", md: "80vw", lg: "1420px" }} h="100vh">
                <Flex shrink="3" justify="space-around" overflow="scroll" direction={{ base: "row", md: "column" }}>
                  {displayImages && displayImages.length > 0 ? displayImages.map((image, index) => <Image key={index} m={4} onClick={() => setChosenImage(`url('${image}')`)} alt="property photo thumbnail" src={image} width="96px" height="96px" />) : <Text>No images available.</Text>}
                </Flex>
                <Flex grow="3" overflow="hidden" p={8} height="90%" width="90%" bg={chosenImage} bgPosition="center" bgSize="contain" bgRepeat="no-repeat">
                </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </>
  )
}