'use client'
import { useState, useEffect } from 'react'
import { Box, Flex, Text, Spacer, Button, Select, Show } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'
import useFirebaseCollection from "../../utils/useFirebaseCollection"

export default function FooterLinks() {
  const [userCurrency, setUserCurrency] = useState("AED");
  const [userUnits, setUserUnits] = useState("american");
  const { items, loadItems } = useFirebaseCollection("neighborhoods");
  const [neighborhoodLinks, setNeighborhoodLinks] = useState([]);

  const setLocalUnits = (units) => {
    setUserUnits(units);
    window.localStorage.setItem("userUnits", units);
    window.location.reload(false);
  };

  const setLocalCurrency = (currency) => {
    setUserCurrency(userCurrency);
    window.localStorage.setItem("userCurrency", currency.toUpperCase());
    window.location.reload(false);
  };

  useEffect(() => {
    loadItems("showOnFooter", "true");
    let storedCurrency = window.localStorage.getItem("userCurrency");
    if (storedCurrency === "") setUserCurrency("AED")
    else setUserCurrency(storedCurrency);

    let storedUnits = window.localStorage.getItem("userUnits");
    if (storedCurrency === "") setUserUnits("american")
    else setUserUnits(storedUnits);
  }, []);

  useEffect(() => {
    setNeighborhoodLinks(items.filter(x => !!x.showOnFooter));
  },[items]);

  return (
    <Flex grow="1" bg="#202020" color="#FEFEFE" px={2} direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto">
    <Show above="md">
      <Flex justify="space-between" wrap="wrap" mt="50px"> 
        <Flex direction="column" mx={2}>
          <Text variant="footerLinkItemHeader" p={1}>Search Properties In</Text>
          <Link href="/properties?search=Palm Jumeirah">
            <Text variant="footerLinkItem" p={1}>Palm Jumeirah</Text>
          </Link>
          <Link href="/properties?search=Zabeel First">
            <Text variant="footerLinkItem" p={1}>Zabeel First</Text>
          </Link>
          <Link href="/properties?search=Downtown Dubai">
            <Text variant="footerLinkItem" p={1}>Downtown Dubai</Text>
          </Link>
          <Link href="/properties?search=Dubai Hills">
            <Text variant="footerLinkItem" p={1}>Dubai Hills</Text>
          </Link>
          <Link href="/properties?search=Dubai Creek Harbour">
            <Text variant="footerLinkItem" p={1}>Dubai Creek Harbour</Text>
          </Link>
        </Flex>
        <Flex direction="column" mx={2}>
          <Text variant="footerLinkItemHeader" p={1}>Neighbourhood Guides</Text>
          {neighborhoodLinks.length && neighborhoodLinks.map(item => 
            <Link key={item.urlSlug} href={`/neighbourhoods/guide/${item.urlSlug}`}>
              <Text variant="footerLinkItem" p={1}>{item.title}</Text>
            </Link>)}
        </Flex>
        <Flex direction="column" mx={2}>
          <Text variant="footerLinkItemHeader" p={1}>Explore</Text>
          <Link href="/neighbourhoods">
            <Text variant="footerLinkItem" p={1}>Neighbourhood Guides</Text>
          </Link>
          <Link href="/properties?exclusiveProperties=true">
            <Text variant="footerLinkItem" p={1}>Exclusive Properties</Text>
          </Link>
          <Link href="/developments">
            <Text variant="footerLinkItem" p={1}>Off-Plan Projects in Dubai</Text>
          </Link>
        </Flex>
        <Flex direction="column" fontSize="12px" mx={2}>
          <Text variant="footerLinkItemHeader" p={1}>Company</Text>
          <Link href="/aboutnordstern">
            <Text variant="footerLinkItem" p={1}>About</Text>
          </Link>
          <Link href="/sellwithnordstern">
            <Text variant="footerLinkItem" p={1}>List your Home</Text>
          </Link>
          <Link href="/careers">
            <Text variant="footerLinkItem" p={1}>Careers</Text>
          </Link>
        </Flex>
        </Flex>
        </Show>
        <Show below="md">
          <Accordion my={4} allowMultiple>
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Text variant="footerLinkItemHeader">Search Properties In</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Flex direction="column" fontSize="16px">
                  <Link href="/properties?search=Palm Jumeirah">
                    <Text variant="footerLinkItem" p={1}>Palm Jumeirah</Text>
                  </Link>
                  <Link href="/properties?search=Zabeel First">
                    <Text variant="footerLinkItem" p={1}>Zabeel First</Text>
                  </Link>
                  <Link href="/properties?search=Downtown Dubai">
                    <Text variant="footerLinkItem" p={1}>Downtown Dubai</Text>
                  </Link>
                  <Link href="/properties?search=Dubai Hills">
                    <Text variant="footerLinkItem" p={1}>Dubai Hills</Text>
                  </Link>
                  <Link href="/properties?search=Dubai Creek Harbour">
                    <Text variant="footerLinkItem" p={1}>Dubai Creek Harbour</Text>
                  </Link>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Text variant="footerLinkItemHeader">Neighbourhood Guides</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Flex direction="column" fontSize="14px">
                  {neighborhoodLinks.length && neighborhoodLinks.map(item => 
                  <Link key={item.urlSlug} href={`/neighbourhoods/guide/${item.urlSlug}`}>
                    <Text variant="footerLinkItem" p={1}>{item.title}</Text>
                  </Link>)}
                </Flex>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Text variant="footerLinkItemHeader">Explore</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Flex direction="column" fontSize="14px">
                  <Link href="/neighbourhoods">
                    <Text variant="footerLinkItem" p={1}>Neighbourhood Guides</Text>
                  </Link>
                  <Link href="/properties?exclusiveProperties=true">
                    <Text variant="footerLinkItem" p={1}>Exclusive Properties</Text>
                  </Link>
                  <Link href="/developments">
                    <Text variant="footerLinkItem" p={1}>Off-Plan Projects in Dubai</Text>
                  </Link>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Text variant="footerLinkItemHeader">Company</Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <Flex direction="column">
                  <Link href="/">
                    <Text variant="footerLinkItem" p={1}>About</Text>
                  </Link>
                  <Link href="/sellwithnordstern">
                    <Text variant="footerLinkItem" p={1}>List your Home</Text>
                  </Link>
                  <Link href="/careers">
                    <Text variant="footerLinkItem" p={1}>Careers</Text>
                  </Link>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Show>
        <Flex direction={{ base: "column", md: "row"}} mt={4}>
          <Flex direction={{ base: "column", md: "row"}} m={2} align={{ md: "center" }}>
            <Text variant="footerLinkItemHeader">Want to get in touch?</Text>
            <Show below="md">
            <Flex>
              <Link style={{ marginRight: '16px', marginTop: '8px' }} href="tel:+971(0)42889093">
                <Image alt="call nordstern" src="/icon_phone_white.svg" width="24" height="24" />
              </Link>
              <Link style={{ marginRight: '16px', marginTop: '8px' }} href="https://wa.me/971564264660">
                <Image alt="whatsapp nordstern" src="/icon_whatsapp_white.svg" width="24" height="24" />
              </Link>
              <Link style={{ marginRight: '16px', marginTop: '8px' }} href="mailto:leads@nordstern.ae">
                <Image alt="email nordstern" src="/icon_email_white.svg" width="24" height="24" />
              </Link>
            </Flex>
            </Show>
            <Show above="md">
              <Flex>
                <Button as="a" href="tel:+971(0)42889093" w="80px" h="30px" variant="darkNoBackground" mx={2}>CALL</Button>
                <Button as="a" href="mailto:leads@nordstern.ae" w="80px" h="30px" variant="darkNoBackground" mx={2}>EMAIL</Button>
                <Button as="a" href="https://wa.me/971564264660" w="80px" h="30px" variant="darkNoBackground" mx={2}>WHATSAPP</Button>
              </Flex>
            </Show>
          </Flex>
          <Spacer />
          <Flex direction={{ base: "column", md: "row"}} m={2} align={{ md: "center" }}>
            <Text variant="footerLinkItemHeader" mr={2}>Dimensions</Text>
            <Select onChange={(e) => setLocalUnits(e.target.value)} value={userUnits} mt={{ base: '2', md: '0' }} w={100} bg='#FDF9F3' color='#202020' borderColor='#FDF9F3' fontSize="10px" h="30px">
              <option value='metric'>SQM</option>
              <option value='american'>SQ. FT.</option>
            </Select>
          </Flex>
          <Flex direction={{ base: "column", md: "row"}} m={2} align={{ md: "center" }}>
            <Text variant="footerLinkItemHeader" mr={2}>Currency</Text>
            <Select onChange={(e) => setLocalCurrency(e.target.value)} value={userCurrency} mt={{ base: '2', md: '0' }} w={100} bg='#FDF9F3' color='#202020' borderColor='#FDF9F3' fontSize="10px" h="30px">
              <option value='AED'>AED</option>
              <option value='USD'>US $</option>
              <option value='EUR'>EURO</option>
            </Select>
          </Flex>
        </Flex>
      </Flex>
  )
}