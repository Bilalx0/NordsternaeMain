'use client'
import { useState, useEffect } from 'react'
import { Flex, Button, Text, Input, Image, Box, Link, Divider } from '@chakra-ui/react'
import useFirebaseCollection from "../../utils/useFirebaseCollection"
import { useToast } from '@chakra-ui/react'
import FromThemagazine from '../components/from_the_magazine'
import PropertyListing from '../components/property_listing'

export default function Home() {
  const { items, loadItems } = useFirebaseCollection("properties");
  const [localItems, setLocalItems] = useState([]);
  const { addItem } = useFirebaseCollection("sellerEnquiries");
  const toast = useToast();
  const [name, setName] = useState("Khalil Gibran");
  const [email, setEmail] = useState("khalil@example.com");
  const [phone, setPhone] = useState("+12345678910");
  const [address, setAddress] = useState("general enquiry");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handleAddItem = () => {
    try { 
      addItem({
        name: name,
        email: email,
        phone: phone,
        address: address,
        date: date,
        time: time,
      });
      toast({
          title: 'Thank you for getting in touch!',
          description: "One of our agents will be in touch with you.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      setMessageSent(true);
    }
    catch (e) {
      toast({
          title: "Looks like we could not make that work",
          description: "Our IT department has been automatically notified and will fix this asap. Please try again tomorrow.",
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      setMessageSent(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    setLocalItems(items.filter(x => !!x.sold).slice(0,6));
  }, [items]);

  return (
    <Flex direction="column" w="100vw">
      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" p={4} justify="center">
        <Text mt={4} align="center" variant="articleTitle">Sell With Us</Text>
        <Text align="center" variant="blackSubtitle" my={2}>Give your property the best chance to shine</Text>
        <Flex direction={{ base: "column-reverse", md: "row" }} pt={4}>
          <Flex direction="column" pr={8} justify="center">
            <Text variant="description">Put your property in front of the right clients o the right platform right away. When it comes to selling, we understand that clients need trusted brokers who understand how to market and position their home the correct way, giving it the best chance to shine in front of the right buyers.</Text>
            <Button size="m" as="a" href={"/enquiry?reference="} my={8} variant="bigCTA">LIST YOUR PROPERTY</Button>
          </Flex>
          <Flex minW={{ base: "100%", md: "50%" }}>
            <Box bg="url('/banner_sellwithus.jpg')" bgSize="cover" bgPosition="center" h="420px" w="100%"></Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex bg="#312A8F" my={4} px={8} py={12} justify="center" align="center">
        <Flex w={{ base: "100vw", md: "80vw", lg: "946px"}} direction={{ base: "column", md: "row" }}>
          <Flex direction="column" p={4} pr={12}  mx="auto" color="#FFFFFF">
            <Text fontSize="36px">Why Trust Us With Your Property?</Text>
            <Text mt={2} mb={12}>Exclusively listed properties get the best offers. Need we say more!</Text>
            
            <Text ml={2}fontSize="24px" fontWeight="semibold">Enhanced Local & Global Exposure</Text>
            <Text ml={2}my={2}>Access premium marketing channels and exposure to a wider target audience through global press channels</Text>
            <Divider ml={2} my={8} borderColor="#92959A" alignSelf="center"/>
            
            <Text ml={2} fontSize="24px" fontWeight="semibold">Bespoke Marketing Material</Text>
            <Text ml={2}my={2}>From custom brochures to stunning visuals, our team delivers bespoke marketing materials that showcase the true essence and value of your property.</Text>
            <Divider ml={2} my={8} borderColor="#92959A" alignSelf="center"/>
            
            <Text ml={2} fontSize="24px" fontWeight="semibold">AI Enabled Data Platform</Text>
            <Text ml={2} my={2}>Our AI powered CRM provides data from predictive lead scoring to proactive customer engagement; enabling data driven decision-making.</Text>
          </Flex>
          {!messageSent && <Flex direction="column" bg="#FFFFFF" color="#202020" align="center" my={4} p={4} borderRadius={8}>
              <Input my={4} variant="flushed" placeholder='NAME' _placeholder={{ fontSize: '10px' }} onChange={(e) => setName(e.target.value)} />
              <Input my={4} variant="flushed" placeholder='EMAIL' _placeholder={{ fontSize: '10px' }} onChange={(e) => setEmail(e.target.value)} />
              <Input my={4} variant="flushed" placeholder='PHONE' _placeholder={{ fontSize: '10px' }} onChange={(e) => setPhone(e.target.value)} />
              <Input my={4} variant="flushed" placeholder='PROPERTY ADDRESS' _placeholder={{ fontSize: '10px' }} onChange={(e) => setAddress(e.target.value)} />
              <Input my={4} variant="flushed" placeholder='PREFERRED DATE' _placeholder={{ fontSize: '10px' }} onChange={(e) => setDate(e.target.value)} />
              <Input my={4} variant="flushed" placeholder='PREFERRED TIME' _placeholder={{ fontSize: '10px' }} onChange={(e) => setTime(e.target.value)} />
              <Button size="m" onClick={handleAddItem} my={4} variant="bigCTA" w="100%">GET A CALL BACK</Button>
              <Text color="#888888">By submitting this form, you agree to our <Link href="/termsofuse">Terms & Conditions</Link> and <Link href="/privacy">Privacy Policy</Link>.</Text>
          </Flex>}
          {!!messageSent && <Flex direction="column" justify="center" align="center" p={8}>
            <Text as="b" color="#43f143" variant="robotoNormalTitle">Your message was sent!</Text>
            <Text as="b" color="#F2F2F2">One of our agents will be in touch with you within the next 48 hours.</Text>  
          </Flex>}
        </Flex>
      </Flex>

      <Flex py={4} w={{ base: "100vw", md: "80vw", lg: "1160px"}} mx="auto" my={2} direction="column">
        <Flex p={4} direction="column" justify="center" align="center" w={{ base: "100vw", md: "80vw", lg: "1160px"}}>          
          
          <Text my={2} variant="robotoSearchBigTitle" align="center">Strategy Crafted For Results</Text>
          <Text my={2} align="center">We create extensive local and global presence delivering perfectly coordinated campaigns on all social platforms (YouTube, Facebook & Instagram) targeted towards a wide area of exposure. The engagement from these campaigns then drive re-marketing efforts towards the actively engaging potential clients.</Text>
          <Text my={2} align="center">To top it all, We harness data from all sources of engagement online such as views, clicks, market availability, age of stock, competitive properties; and utilize this with Our innovative AI enabled Proprietary Data Amplification platform that allows us to achieve higher success rates for sellers, buyers, agents, and developers.</Text>
          
          <Flex direction={{ base: "column", md: "row" }} align="center" justify="center" my={4} wrap="wrap">
            <Flex direction="column" justify="center" align="center" mx={4} my={2}>
              <Text variant="robotoSellWithNordBlue">1 Million Views</Text>
              <Text variant="latoSellWithNordSubtext" mt={1}>Average exposure for
an exclusive property</Text>
            </Flex>
            <Flex direction="column" justify="center" align="center" mx={4} my={2}>
              <Text variant="robotoSellWithNordBlue">6x More Leads</Text>
              <Text variant="latoSellWithNordSubtext" mt={1}>for properties listed exclusively</Text>
            </Flex>
            <Flex direction="column" justify="center" align="center" mx={4} my={2}>
              <Text variant="robotoSellWithNordBlue">AI Powered</Text>
              <Text variant="latoSellWithNordSubtext" mt={1}>Smart data driven marketing systems</Text>
            </Flex>
          </Flex>
        </Flex>
        <Box bg="url('/banner_sellWithNordSecondary.jpg')" bgSize="cover" bgPosition="center" h="320px" w="100%" my="50px"></Box>
          

        <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto">
          <Text fontSize="32px" align="center">Recently Sold</Text>
          <Flex direction={{ base: "column", md: "row" }} overflow="scroll" wrap="wrap" align="center" justify="center">
            {localItems.length && localItems.map(item => <PropertyListing vspace={4} key={item.id} reference={item.reference} listing={item} />)}
          </Flex>
        </Flex>
      </Flex>
      <FromThemagazine limit="3" />
    </Flex>
  )
}

