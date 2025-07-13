'use client'
import { useState, useEffect } from 'react'
import { Flex, Text, Divider, Button, Stack, Image, Show, Box } from '@chakra-ui/react'
import Link from 'next/link'
import useFirebaseCollection from "../../../utils/useFirebaseCollection"
import useCurrency from "../../../utils/useCurrency"
import useMetric from "../../../utils/useMetric"
import { useParams } from 'next/navigation'
import { Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerBody} from '@chakra-ui/react';

export default function Home() {
  const params = useParams();
  const { userCurrency, getPriceInUserCurrency } = useCurrency();
  const { userUnits, getAreaInUserUnits } = useMetric();
  const { item, getItemByFieldValue } = useFirebaseCollection("developments");
  const { item: developer, getItemByFieldValue: loadDeveloper } = useFirebaseCollection("developers");
  const [showCompleteDescription, setShowCompleteDescription] = useState(false);
  const [mapsAddress, setMapsAddress] = useState("https://www.google.com/maps/embed/v1/place?key="+ process.env.NEXT_PUBLIC_GMAPS_API_KEY + "&q=Palm Jumeirah, Dubai");
  const [isOpen, setIsOpen] = useState(false);
  const [chosenImage, setChosenImage] = useState(`"url('{item.images[0].downloadURL}')"`);

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const [images, setImages] = useState([
    "/villa_placeholder_2.jpeg",
    "/apartment_placeholder_1.jpeg",
    "/apartment_placeholder_3.jpeg",
    ]);

  useEffect(() => {
    getItemByFieldValue('urlSlug', params.slug);
  }, []);

  useEffect(() => {
    if (item && item.title) {
      loadDeveloper('urlSlug', item.developerLink);
      setMapsAddress("https://www.google.com/maps/embed/v1/place?key="+ process.env.NEXT_PUBLIC_GMAPS_API_KEY + "&q=" + encodeURIComponent(item.address));
      if (item.images && item.images.length >= 1) {
        setImages(item.images.map(img => img.downloadURL));
      }
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
      

      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto">
        <Text my={4} align="center" variant="articleTitle">{item.title}</Text>
        <Text align="center" variant="darkSubtitle">{item.subtitle}</Text>
      </Flex>

      <Flex direction="column" my={4} w="100vw">
        <Box bg={`url('${item.images[0].downloadURL}')`} w="100vw" bgSize="cover" h="500"></Box>
        <Button alignSelf="flex-end" mt={-16} mr={8} variant="bright" onClick={() => setIsOpen(true)}>SHOW ALL PHOTOS</Button>
      </Flex>

      <Flex py={4} w={{ base: "100vw", md: "80vw", lg: "946px"}} mx="auto">
        <Flex direction="column" w="100%">
          <Flex direction="column" p={2}>
            <Text variant="robotoNormalTitle">{item.title}</Text>
            {!showCompleteDescription && 
              <Flex direction="column" wrap="wrap" my={4}>
                <Text variant="largetext" noOfLines={6} dangerouslySetInnerHTML={{ __html: item.description }}></Text>
                <Button my={2} mx={-4} variant="linkButton" onClick={() => setShowCompleteDescription(true)}><Flex align="center"><Image alt="details" src="/icon_plus.svg" width="24px" height="24px" /><Text px={2}>Expand Details</Text></Flex></Button>
              </Flex>
              }
            {!!showCompleteDescription && 
              <Flex direction="column" wrap="wrap" my={4}>
                <Text variant="largetext" dangerouslySetInnerHTML={{ __html: item.description }}></Text>
                <Button my={2} mx={-8} variant="linkButton" onClick={() => setShowCompleteDescription(false)}><Flex align="center"><Image alt="details" src="/icon_minus.svg" width="24px" height="24px" /><Text px={2}>Show Less</Text></Flex></Button>
              </Flex>
            }
            <Show below="md">
              <Flex direction="column" grow="1" p={4} bg="#312A8F" color="#FFFFFF" borderRadius={8} w="360px" alignSelf="center">
                <Text pr={2} casing="capitalize">{"Key takeaways"}</Text>
                <Flex direction="column" wrap="wrap">
                  <Text variant="ctaBoxTitle" my={2} fontWeight="600">{userCurrency}{" "}{getPriceInUserCurrency(item.price).toLocaleString()}{"+"}</Text>
                  <Text mt={2} variant="smallPrintRoboto">Bedrooms</Text>
                  <Text mb={2}>{item.minBedrooms}{" to "}{item.maxBedrooms}</Text>
                  <Divider />
                  <Text mt={2} variant="smallPrintRoboto">{"Built up Area ("}{(userUnits === "american") ? "sq. ft." : "sqm"}{")"}</Text>
                  <Text mb={2}>{getAreaInUserUnits(item.minArea)}{" to "}{getAreaInUserUnits(item.maxArea)}</Text>
                  <Divider />
                  <Text mt={2} variant="smallPrintRoboto">Number of Floors</Text>
                  <Text mb={2}>{item.floors}</Text>
                  <Divider />
                  <Text mt={2} variant="smallPrintRoboto">Number of Units</Text>
                  <Text mb={2}>{item.totalUnits}</Text>
                  <Divider />
                  <Text mt={2} variant="smallPrintRoboto">Types of Units</Text>
                  <Text mb={2}>{item.propertyType}</Text>
                </Flex>
                <Stack my={4}>
                  <Button as="a" href={"/enquiry?reference=" + item.reference} w="100%" mt={2}>Register Your Interest</Button>
                </Stack>
              </Flex>
            </Show>
          </Flex>
          <Flex direction="column" p={2} justify="center" borderTop="1px solid #000000">
            <Text variant="latoNormalTitle" py={2}>Amenities</Text>
            <Flex direction="column" maxH="180px" wrap="wrap">
              {item.amenities && item.amenities.length && item.amenities.map((amen) => (
                  <Flex key={amen} align="center">
                    <Image alt="" width="12px" height="12px" src="/icon_bullet_point.svg" />
                    <Text px={2}>{amen}</Text>
                  </Flex>)
                )}
              </Flex>
          </Flex>

          <Flex direction="column" p={2} justify="center">
            <Text variant="latoNormalTitle" py={2}>Location</Text>
            <Text dangerouslySetInnerHTML={{ __html: item.addressDescription }}></Text>
            <iframe
              width="100%"
              height="450"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapsAddress}>
            </iframe>
            <Button alignSelf="center" as="a" href={"/neighbourhoods/guide/" + item.neighbourhoodLink} size="m" variant="light" my={4}>Neighbourhood Guide</Button>
          </Flex>

          </Flex>
          <Show above="md">
            <Flex direction="column" grow="1" p={4} m={8} bg="#312A8F" color="#FFFFFF" borderRadius={8} w="380px" maxH="480px" sx={{ position: "sticky", top: "120px" }}>
              <Text pr={2} casing="capitalize">{"Key takeaways"}</Text>
              <Flex direction="column" wrap="wrap" grow="grow">
                <Text variant="ctaBoxTitle" my={2} fontWeight="600">{userCurrency}{" "}{getPriceInUserCurrency(item.price).toLocaleString()}{"+"}</Text>
                <Text mt={2} variant="smallPrintRoboto">Bedrooms</Text>
                <Text mb={2}>{item.minBedrooms}{" to "}{item.maxBedrooms}</Text>
                <Divider />
                <Text mt={2} variant="smallPrintRoboto">{"Built up Area ("}{(userUnits === "american") ? "sq. ft." : "sqm"}{")"}</Text>
                <Text mb={2}>{getAreaInUserUnits(item.minArea)}{" to "}{getAreaInUserUnits(item.maxArea)}</Text>
                <Divider />
                <Text mt={2} variant="smallPrintRoboto">Number of Floors</Text>
                <Text mb={2}>{item.floors}</Text>
                <Divider />
                <Text mt={2} variant="smallPrintRoboto">Number of Units</Text>
                <Text mb={2}>{item.totalUnits}</Text>
                <Divider />
                <Text mt={2} variant="smallPrintRoboto">Types of Units</Text>
                <Text mb={2}>{item.propertyType}</Text>
              
                <Button as="a" href={"/enquiry?reference=" + item.reference} my={4} w="100%">REQUEST INFORMATION</Button>
                <Button as="a" href="https://wa.me/+971564264660" variant="darkNoBackground" w="100%">CLICK TO WHATSAPP</Button>
              </Flex>
            </Flex>
          </Show>
          
          </Flex>
          

          {developer && !!developer.title && <Flex bg="#312A8F" color="#FFFFFF" minH="400px">
            <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" py={8}>
              <Flex align="center" grow="2" p={4}>
                <Image alt={developer.title} src={developer.logo[0].downloadURL} w="290px" maxW="300px" h="auto" />
              </Flex>
              <Flex direction="column" color="#FFFFFF" p={4} justify="center" grow="3">
                <Text fontSize="30px">{developer.title}</Text>

                <Text fontSize="16px" my={4}>{developer.description}</Text>
                <Link href={`/developers/${developer.urlSlug}`}>
                  <Text as="u">{"Browse Other Properties by "}{developer.title}</Text>
                </Link>
              </Flex>
            </Flex>
          </Flex>}

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

