'use client'
import { useState, useEffect } from 'react'
import { Flex, Button, Text, Box, AspectRatio } from '@chakra-ui/react'
import useFirebaseCollection from "../../utils/useFirebaseCollection"
import Agent from '../components/agent'

export default function Home() {
  const { items, loadItems } = useFirebaseCollection("agents");
  const [localItems, setLocalItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  return (
    <Flex direction="column" w="100vw">
      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" p={4} justify="center">
        <Text mt={4} align="center" variant="articleTitle">Careers At Nordstern</Text>
        <Text align="center" variant="blackSubtitle" my={2}>READY TO ELEVATE YOUR FUTURE</Text>
        <Flex direction={{ base: "column-reverse", md: "row" }}  pt={4}>
          <Flex direction="column" p={4} justify="center">
            <Text variant="description" mb={4}>Are you ready to be part of a team that values excellence, innovation, and unparalleled service? Look no further.</Text>
            <Text variant="description" mb={4}>Join our prestigious team and embark on a rewarding journey where your skills and dedication will be recognized and celebrated.</Text>
            <Button size="m" as="a" href={"#joinForm"} my={4} variant="bigCTA">Send us your CV</Button>  
          </Flex>
          <Flex minW={{ base: "100%", md: "50%" }}>
            <Box bg="url('/banner_image_careers_top.jpg')" bgSize="cover" bgPosition="center" h="420px" w="100%" ></Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex grow="1" bg='#312A8F' color="#FFFFFF" align="center" justify="center">
        <Flex direction="column" justify="center" align="center" pt={4} w={{ base: "100vw", md: "80vw", lg: "1160px"}} overflow="scroll">
            <Text mt={16} variant="robotoExpertBannerTitlesWhite" align="center">A Culture Of Trust & Collaboration</Text>
            <Text m={4} variant="largetext" align="center">At Nordstern, we foster a vibrant and inclusive culture that embraces innovation and 
            teamwork. Our team members are the driving force behind our success, and we empower them 
            to reach their full potential.</Text>
            <Text mb={16} variant="largetext" align="center">We provide numerous opportunities for personal and professional growth, value mutual respect and
            open communication, and strive to create an environment where every individual feels 
            a sense of belonging and camaraderie.</Text>
          </Flex>
      </Flex>
      <Flex grow="1" bg='#312A8F' direction="column" justify="center" align="center" pt={4} overflow="hidden">
            <Flex justify="center" align="center" w="100vw" wrap="wrap">
                <Box m={1} bg="url('/company_highlight_1.jpg')" bgSize="cover" bgPosition="center" h="320px" w={{ base:"94vw", md: "480px" }} display={{ base: "none", md: "block"}} ></Box>
                <Box m={1} bg="url('/company_highlight_3.jpg')" bgSize="cover" bgPosition="center" h="320px" w={{ base:"94vw", md: "480px" }} ></Box>
                <Box m={1} bg="url('/company_highlight_2.jpg')" bgSize="cover" bgPosition="center" h="320px" w={{ base:"94vw", md: "480px" }} display={{ base: "none", md: "block"}}></Box>
              </Flex>
              <Flex justify="center" align="center" wrap="wrap">
                <Box m={2} bg="url('/company_highlight_4.jpg')" bgSize="cover" bgPosition="center" h={{ base: "180px", md: "230px" }} w={{ base:"46vw", md: "360px" }} ></Box>
                <Box m={2} bg="url('/company_highlight_7.jpg')" bgSize="cover" bgPosition="center" h={{ base: "180px", md: "230px" }} w={{ base:"46vw", md: "360px" }} ></Box>
                <Box m={2} bg="url('/company_highlight_6.jpg')" bgSize="cover" bgPosition="center" h={{ base: "180px", md: "230px" }} w={{ base:"46vw", md: "360px" }} ></Box>
                <Box m={2} bg="url('/company_highlight_5.jpg')" bgSize="cover" bgPosition="center" h={{ base: "180px", md: "230px" }} w={{ base:"46vw", md: "360px" }} ></Box>
              </Flex>
      </Flex>

      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "1160px"}} maxW="100vw" mx="auto" my={2} py={4} align="center" justify="center" overflow="wrap" wrap="wrap">
        <Text fontSize="30px" align="center">Enabling Our Team For Success</Text>
          <Text fontSize="16px" align="center" my={4}>At Nordstern, we foster a culture of excellence and strive to push the boundaries of innovation in everything we do. Together, we want create extraordinary experiences and set new standards of service as well as support. Not only for our clients, but specially for 
our hand-picked team of Consultants.</Text>
          <Text fontSize="16px" align="center" my={4}>We believe in rewarding hard work and effort. Join us for competitive earning potential, thrilling incentives, and continuous support from mentors and everything else you need to help you reach your goals.</Text>
        

        <Flex direction={{ base: "column", md: "row" }} align="center" justify="center" my={4} wrap="wrap">
              <Flex direction="column"  justify="center" align="center" m={4}>
                <Text variant="robotoCareersHighlightBlue">10+ Years</Text>
                <Text variant="latoCareersHighlightSubtextGray" mt={2}>Experienced management team</Text>
              </Flex>
              <Flex direction="column" justify="center" align="center" m={4}>
                <Text variant="robotoCareersHighlightBlue">Flexible</Text>
                <Text variant="latoCareersHighlightSubtextGray" mt={2}>Working hours for efficiency</Text>
              </Flex>
              <Flex direction="column"  justify="center" align="center" m={4}>
                <Text variant="robotoCareersHighlightBlue">360 Marketing</Text>
                <Text variant="latoCareersHighlightSubtextGray" mt={2}>Leads, Listings, Trainings, Content & More</Text>
              </Flex>
              <Flex direction="column"  justify="center" align="center" m={4}>
                <Text variant="robotoCareersHighlightBlue">Up to 70%</Text>
                <Text variant="latoCareersHighlightSubtextGray" mt={2}>Commission & incentives for top performers</Text>
              </Flex>
              <Flex direction="column"  justify="center" align="center" m={4}>
                <Text variant="robotoCareersHighlightBlue">VISA + RERA</Text>
                <Text variant="latoCareersHighlightSubtextGray" mt={2}>Paid for by the company</Text>
              </Flex>
              <Flex direction="column"  justify="center" align="center" m={4}>
                <Text variant="robotoCareersHighlightBlue">Conveyance</Text>
                <Text variant="latoCareersHighlightSubtextGray" mt={2}>Complete admin support for listings & DEALS</Text>
              </Flex>
            </Flex>
            <Button size="m" as="a" href={"#joinForm"} my={4} variant="light">join us</Button>  
      </Flex>

      <Flex id="joinForm" bg="#FDF9F3" w="100vw" mx="auto" pb={4} direction="column" align="center" justify="center">
        <Box bg="url('/banner_image_careers_fullwidth.jpg')" bgSize="cover" bgPosition="center" h="420px" w="100%" ></Box>
        <Text  fontSize="30px" align="center" my={4}>Join us and embark on the next chapter
of your success story</Text>
          <Box as="iframe" bg="none" w={{ base: "100vw", md: "80vw", lg: "840px" }} sx={{ minHeight: '860px', border: 'none', bg: 'none' }} src='https://forms.zohopublic.com/nordstern/form/Careers/formperma/LjuXvOrWvXYQEbBVxPjtqnWmLg1VoCgc7P5s4nLi9hE'></Box>
      </Flex>
    </Flex>
  )
}

