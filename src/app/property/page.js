'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Button, Stack, Image, Show } from '@chakra-ui/react'
import Link from 'next/link'
import PropertyListing from '../components/property_listing'
import useFirebaseCollection from "../../utils/useFirebaseCollection"
import useCurrency from "../../utils/useCurrency"
import useMetric from "../../utils/useMetric"
import { useSearchParams, usePathname } from 'next/navigation'
import { Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerBody} from '@chakra-ui/react'

export default function Home() {
  const searchParams = useSearchParams();
  const propRef = searchParams.get("reference");
  const { userCurrency, getPriceInUserCurrency } = useCurrency();
  const { userUnits, getAreaInUserUnits } = useMetric();
  const { item, getItemByFieldValue } = useFirebaseCollection("properties");
  const { similarItems, loadSimilarItems } = useFirebaseCollection("properties");
  const { agent, loadAgent } = useFirebaseCollection("agents");
  const [showCompleteDescription, setShowCompleteDescription] = useState(false);
  const [mapsAddress, setMapsAddress] = useState("https://www.google.com/maps/embed/v1/place?key="+ process.env.NEXT_PUBLIC_GMAPS_API_KEY + "&q=Palm Jumeirah, Dubai");
  const [isOpen, setIsOpen] = useState(false);
  const [chosenImage, setChosenImage] = useState("url('/villa_placeholder_2.jpeg')");

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const [images, setImages] = useState([
    "/villa_placeholder_2.jpeg",
    "/apartment_placeholder_1.jpeg",
    "/apartment_placeholder_3.jpeg",
    ]);

  useEffect(() => {
    getItemByFieldValue('reference', propRef);
  }, []);

  useEffect(() => {
    if (item && item.title) {
      setMapsAddress("https://www.google.com/maps/embed/v1/place?key="+ process.env.NEXT_PUBLIC_GMAPS_API_KEY + "&q=" + encodeURIComponent(item.address));
      if (item.agent) {
        loadAgent("name", item.agent[0].name);
      }
      setChosenImage("url('" + images[0] + "')");
      const tempImages = item.images.map(img => img.downloadURL);
      if (tempImages.length >= 1) {
        setChosenImage("url('" + tempImages[0] + "')");
        setImages(tempImages);
      }
    loadSimilarItems(item.propertyType, item.id);
    }
  }, [item]);

  return (
    <>
    {!!item.title && <Flex direction="column">
      <Show below="md">
        <Flex h="64px" justify="center" w="100vw" bg="#312A8F" color="#FDF9F3" align="center" sx={{ position: 'fixed', bottom: '0px', left: '0px', 'z-index': '99'}}>
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
        <Text my={16} align="center" variant="articleTitle">{item.title || ""}</Text>
        <Flex color="#636363" align="center">
          <Link href={"/properties?search=%20&listingType=" + item.listingType}><Text px={2} as="u" casing="capitalize">{item.listingType}</Text></Link>
          <Image alt="next link" src="/icon_breadcrumb.svg" width="16px" height="16px" />
          <Link href={"/properties?search=" + encodeURIComponent(item.community)}><Text px={2} as="u" casing="capitalize">{item.community}</Text></Link>
          <Image alt="next link" src="/icon_breadcrumb.svg" width="16px" height="16px" />
          <Link href={"/properties?search=" + encodeURIComponent(item.address)}><Text px={2} as="u" casing="capitalize">{item.address}</Text></Link>
        </Flex>
      </Box>

      <Flex direction="column" my={4}>
        <Box bg={chosenImage} bgSize="cover" h="650"></Box>
        <Button alignSelf="flex-end" mt={-16} mr={8} variant="bright" onClick={() => setIsOpen(true)}>SHOW ALL PHOTOS</Button>
      </Flex>

      <Flex py={4} w={{ base: "100vw", md: "80vw", lg: "946px"}} mx="auto" my={8}>
        <Flex direction="column" w="100%">
          <Flex direction="column" p={4} m={{ base: 2, md: 4, lg: 8 }}>
            <Text fontSize="4xl" casing="capitalize">{item.title}</Text>
            <Flex wrap="wrap" justify="space-between" mt={2}>
              <Text pr={2} as="u" casing="capitalize">{item.propertyType}</Text>
              <Text pr={2} as="u">{item.bedrooms}{" beds"}</Text>
              <Text pr={2} as="u">{item.bedrooms}{" baths"}</Text>
              <Text pr={2} as="u">{getAreaInUserUnits(item.sqfeetBuiltup)}{(userUnits === "american") ? "sq. ft." : "sqm"}{" built up"}</Text>
              <Text pr={2} as="u">{getAreaInUserUnits(item.sqfeetArea)}{(userUnits === "american") ? "sq. ft." : "sqm"}{" plot"}</Text>
            </Flex>
            {!showCompleteDescription && 
              <Flex direction="column" wrap="wrap" my={4}>
                <Text variant="largetext" noOfLines={6} dangerouslySetInnerHTML={{ __html: item.description }}></Text>
                <Button my={2} mx={-8} variant="linkButton" onClick={() => setShowCompleteDescription(true)}><Flex align="center"><Image alt="details" src="/icon_plus.svg" width="24px" height="24px" /><Text px={2}>Expand Details</Text></Flex></Button>
                <Button size="l" as="a" href={"/enquiry?reference=" + item.reference} my={4} variant="bigCTA">REQUEST INFORMATION</Button>
              </Flex>
              }
            {!!showCompleteDescription && 
              <Flex direction="column" wrap="wrap" my={4}>
                <Text variant="largetext" dangerouslySetInnerHTML={{ __html: item.description }}></Text>
                <Button my={2} mx={-12} variant="linkButton" onClick={() => setShowCompleteDescription(false)}><Flex align="center"><Image alt="details" src="/icon_minus.svg" width="24px" height="24px" /><Text px={2}>Show Less</Text></Flex></Button>
                <Button size="l" as="a" href={"/enquiry?reference=" + item.reference} my={4} variant="bigCTA">REQUEST INFORMATION</Button>
              </Flex>
            }
            <Show below="md">
              <Flex direction="column" grow="1" p={4} bg="#312A8F" color="#FFFFFF" borderRadius={8} w="360px" maxHeight="420" alignSelf="center">
                <Flex wrap="wrap">
                  <Text pr={2} casing="capitalize" variant="justRoboto">{"For "}{item.listingType}</Text>
                  <Text pr={2} casing="capitalize" variant="justRoboto">{item.isFeatured ? "Featured" : ""}</Text>
                  <Text pr={2} casing="capitalize" variant="justRoboto">{item.propertyStatus}</Text>
                </Flex>
                <Flex direction="column" wrap="wrap">
                  {(userCurrency === "AED") && <Text mt={2} variant="ctaBoxTitle">{item.currency}{" "}{item.price.toLocaleString()}</Text>}
                  {(userCurrency !== "AED") && <Text mt={2} variant="ctaBoxTitle">{userCurrency}{" "}{getPriceInUserCurrency(item.price, userCurrency).toLocaleString()}</Text>}
                  {(userCurrency !== "AED") && <Text color="#CDCDCD">{item.currency}{" "}{item.price.toLocaleString()}</Text>}
                  <Text mt={4} casing="capitalize">{item.address}</Text>
                  <Text casing="capitalize">{item.community}{" "}{item.region}</Text>

                  <Text mt={4} casing="capitalize">{"Reference "}{item.reference}</Text>
                  <Text casing="capitalize">{"Permit "}{item.permit}</Text>
                </Flex>
                <Stack my={4}>
                  <Button as="a" href={"/enquiry?reference=" + item.reference} w="100%" my={4}>DOWNLOAD BROCHURE</Button>
                </Stack>
              </Flex>
            </Show>
          </Flex>
          <Flex direction="column" p={8} justify="center" borderTop="1px solid #000000">
            <Text as="b" py={2}>Amenities</Text>
            <Flex direction="column" maxHeight="180" wrap="wrap">
              {item.amenities && item.amenities.length && item.amenities.map((amen) => (
                  <Flex key={amen} align="center">
                    <Image alt="" width="6px" height="6px" src="/icon_bullet_point.svg" />
                    <Text px={2}>{amen}</Text>
                  </Flex>)
                )}
              </Flex>
            <Stack my={8}>
              <Text as="b">Lifestyle</Text>
              <Text as="u">{item.lifestyle}</Text>
            </Stack>
          </Flex>

          <Flex direction="column" p={8} pr={16} justify="center">
              <Text as="b">Location</Text>
              <Text>{item.address}</Text>
              <iframe
                width="100%"
                height="450"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={mapsAddress}>
              </iframe>
          </Flex>

          <Flex p={8} direction={{ base: "column-reverse", md: "row" }}>
            <Flex direction="column" w="100%" justify="center">
              <Text fontSize="20px" as="b">Proprety Representative</Text>
              <Link href={`/agent?licenseNumber=${agent.licenseNumber}`}><Text variant="robotoSearchBigTitle" sx={{ textDecoration: "underline" }} py={4}>{agent.name}</Text></Link>
              <Text fontSize="16px">{agent.jobTitle}{" - "}{agent.location}</Text>
              <Text fontSize="16px">{"License no. "}{agent.licenseNumber}</Text>
              <Flex align="center">
                <Text fontSize="16px">{"Languages: "}</Text>
                {agent.languages && agent.languages.length && agent.languages.map((lang) => (
                    <Text key={lang} fontSize="14px" px={2}>{lang}</Text>
                  )
                )}
              </Flex>
              <Button as="a" href="/enquiry" variant="light" size="m" mt={16}>CONTACT AGENT</Button>
            </Flex>
            {!agent.headShot && agent.photo && !!agent.photo[0] && 
              <Box w="340px" h="340px" bg={`url('${agent.photo[0].downloadURL}')`} bgPosition="center" bgSize="cover"></Box>
            }
            {agent.headShot && !!agent.headShot[0] && 
              <Box w="340px" h="340px" bg={`url('${agent.headShot[0].downloadURL}')`} bgPosition="center" bgSize="cover"></Box>
            }
            </Flex>
          </Flex>
          <Show above="md">
            <Flex direction="column" grow="1" p={4} m={8} bg="#312A8F" color="#FFFFFF" borderRadius={8} w="340px" maxHeight="380" sx={{ position: "sticky", top: "120px" }}>
              <Flex wrap="wrap">
                <Text pr={2} casing="capitalize" variant="justRoboto">{"For "}{item.listingType}</Text>
                <Text pr={2} casing="capitalize" variant="justRoboto">{item.isFeatured ? "Featured" : ""}</Text>
                <Text pr={2} casing="capitalize" variant="justRoboto">{item.propertyStatus}</Text>
              </Flex>
              <Flex direction="column" wrap="wrap">
                {(userCurrency === "AED") && <Text mt={2} variant="ctaBoxTitle">{item.currency}{" "}{item.price.toLocaleString()}</Text>}
                {(userCurrency !== "AED") && <Text mt={2} variant="ctaBoxTitle">{userCurrency}{" "}{getPriceInUserCurrency(item.price, userCurrency).toLocaleString()}</Text>}
                {(userCurrency !== "AED") && <Text color="#CDCDCD">{item.currency}{" "}{item.price.toLocaleString()}</Text>}
                <Text mt={4} casing="capitalize">{item.address}</Text>
                <Text casing="capitalize">{item.community}{" "}{item.region}</Text>

                <Text mt={4} casing="capitalize">{"Reference "}{item.reference}</Text>
                <Text casing="capitalize">{"Permit "}{item.permit}</Text>
              </Flex>
              <Stack my={4}>
                <Button as="a" href={"/enquiry?reference=" + item.reference}  variant="whiteBigCTA">REQUEST INFORMATION</Button>
                <Button as="a" href="https://wa.me/971564264660" variant="bigCTANoBG" my={2}>CLICK TO WHATSAPP</Button>
              </Stack>
            </Flex>
          </Show>
          
          </Flex>
          

          <Flex bg="#312A8F" color="#FFFFFF" minH="400px">
            <Flex direction={{ base: "column-reverse", md: "row" }} w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto">
              <Flex direction="column" color="#FFFFFF" p={8} justify="center" grow="3">
                <Text fontSize="30px">Palm Jumeirah</Text>
                <Link href="/">
                  <Text as="u">Neighbourhood</Text>
                </Link>
                <Text fontSize="16px" my={4}>One of the more established areas in Dubai, Jumeirah&apos;s ideal location near the beach makes it perfect for beachside living. Brimming with history, this area was previously a fisherman diving and trading site. Previously known as Chicago Beach, this locality is known for hosting well-off expats and...</Text>
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
              {similarItems.length && similarItems.map(item => <PropertyListing key={item.id} reference={item.reference} listing={item} />)}
            </Flex>
            <Button as="a" href={"/properties?search=&propertyType="+item.propertyType} m={8} variant="light">VIEW MORE</Button>
          </Flex>
          <Drawer placement='top' onClose={closeDrawer} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent bg="#FDF9F3">
              <DrawerCloseButton />
              <DrawerBody>
                <Flex direction={{ base: "column", md: "row"}} justify="space-between" align="center" w={{ base: "100vw", md: "80vw", lg: "1420px"}} h="100vh">
                  <Flex shrink="3" justify="space-around" overflow="scroll" direction={{ base: "row", md: "column"}}>
                    {images && images.length && images.map((image, index) => <Image key={index} m={4} onClick={() => setChosenImage(image)} alt="property photo" src={image} width="96px" height="96px" />)}
                  </Flex>
                  <Flex grow="3" overflow="hidden" p={8} height="90%" width="90%" bg={`url(${chosenImage}) center center no-repeat`} bgSize="contain">
                </Flex>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
    </Flex>}
    </>
  )
}
