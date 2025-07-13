'use client'
import { useState } from 'react'
import { Flex, Text, Input, Button, Textarea, Select, Image, Box, Link } from '@chakra-ui/react'

import useFirebaseCollection from "../../utils/useFirebaseCollection"
import { useToast } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams();
  const { addItem } = useFirebaseCollection("enquiries");
  const toast = useToast();
  const propRef = searchParams.get("reference");
  const [name, setName] = useState("Khalil Gibran");
  const [email, setEmail] = useState("khalil@example.com");
  const [phone, setPhone] = useState("+12345678910");
  const [subject, setSubject] = useState("general enquiry");
  const [message, setMessage] = useState("");
  const [propertyReference, setPropertyReference] = useState(propRef);
  const [messageSent, setMessageSent] = useState(false);

  const handleAddItem = () => {
    try { 
      addItem({
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message,
        propertyReference: propertyReference,
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

  return (
    <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" color="#000000" justify="center" align="center">
        <Flex direction={{ base: "column", md: "row" }} justify="center" py={8}>
        <Flex direction="column" px={4} w={{ base: "100%", md: "570px"}}>
          <Text variant="articleTitle" textAlign="center" my={4}>Contact Us</Text>
          <Text my={2}>Please complete the form below, and one of our representatives will get back to you within 24 hours regarding your inquiry.</Text>
          <Text my={2}>If you require immediate assistance, please don&apos;t hesitate to reach us on <Link href="tel:+971 (0) 4 288 9093"><u>+971 (0) 4 288 9093</u></Link></Text>
        

          {!messageSent && <Flex my={8} direction="column">
            <Text variant="finePrint">Your Full Name</Text>
            <Input my={2} variant='outline' placeholder='FULL NAME' _placeholder={{ fontSize: '10px' }} onChange={e => setName(e.target.value)} />
            <Text variant="finePrint">Your Email Address</Text>
            <Input my={2} variant='outline' type="email" placeholder='NAME@EXAMPLE.COM' _placeholder={{ fontSize: '10px' }} onChange={e => setEmail(e.target.value)} />
            <Text variant="finePrint">Your Contact Number</Text>
            <Input my={2} variant='outline' type="tel" placeholder='PHONE NUMBER (+971 X XXX XXXX)' _placeholder={{ fontSize: '10px' }} onChange={e => setPhone(e.target.value)} />
            <Text variant="finePrint">Subject</Text>
            <Select my={2} placeholder='Select option' defaultValue="consult" onChange={e => setSubject(e.target.value)}>
              <option value='buy'>I would like to buy a property</option>
              <option value='consult'>I would like a consultation call</option>
              <option value='rent'>I would like to rent a property</option>
            </Select>
            <Text variant="finePrint">Your Message</Text>
            <Textarea my={2} variant='outline' placeholder='How can we help?' _placeholder={{ fontSize: '12px' }} onChange={e => setMessage(e.target.value)}/>
            <Button onClick={handleAddItem} my={4} variant="bigCTA">SUBMIT ENQUIRY</Button>
          </Flex>}
          {!!messageSent && <Flex direction="column" align="center" p={8}>
            <Text as="b" color="#43f143" variant="robotoNormalTitle">Your message was sent!</Text>
            <Text as="b">One of our agents will be in touch with you within the next 48 hours.</Text>  
          </Flex>}
          <Flex direction="column" alignSelf="flex-start">
            <Text variant="latoBoldText" align="left">Need Immediate Assitance?</Text>
            <Flex my={2}>
              <Button my={2} as="a" href="mailto:leads@nordstern.ae" size="s" w="150px" variant="light" mr={4}>EMAIL</Button>
              <Button my={2} as="a" href="https://wa.me/971564264660" size="s" w="150px" variant="light">WHATSAPP</Button>
            </Flex>
            <Text variant="footerLinkItem">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</Text>
          </Flex>
          </Flex>  
          <Flex direction="column" alignSelf="flex-start" justify="center" align="left" p={4} mt={14}>
            <Text variant="latoBoldText">Office</Text>
            <Text mt={4}>Office 3703B,</Text>
            <Text>Business Central Towers,</Text>
            <Text>Dubai Media City,</Text>
            <Text>Dubai, UAE</Text>
            <Text>PO Box 392504</Text>
            <Link mt={4} href="https://maps.app.goo.gl/YXHzvFpKi9idzKBQ9" isExternal><Text as="u">View on Google Maps</Text></Link>
          </Flex>
        </Flex>
        <Flex direction="column" bg="#FDF9F3" w="100vw">
          <Text variant="robotoNormalTitle" alignSelf="center" my={4}>Let&apos;s do business together</Text>
          <Flex direction={{ base: "column", md: "row" }} w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" p={4} justify="space-between">
            <Flex direction="column">
              <Box bg="url('/banner_enquirypageOne.jpg')" bgSize="cover" bgPosition="center"  w="420px" h="290px"></Box>
              <Flex direction="column" p={4} justify="center" align="center" maxW="440px">
                <Text fontSize="20px">Find your agent</Text>
                <Text fontSize="16px" align="center" my={4}>Our team offers a diversity of experience and expertise.</Text>
                <Link href="/aboutnordstern" ><Text variant="selected" fontSize="12px" fontWeight="bold">MEET THE SALES TEAM</Text></Link>
              </Flex>
            </Flex>

            <Flex direction="column">
              <Box bg="url('/banner_enquirypageTwo.jpg')" bgSize="cover" bgPosition="center"  w="420px" h="290px"></Box>
              <Flex direction="column" p={4} justify="center" align="center" maxW="440px">
                <Text fontSize="20px">Sell your property with us</Text>
                <Text fontSize="16px" align="center" my={4}>We&apos;ll match you with a Specialist that knows your area best.</Text>
                <Link href="/sellwithus" ><Text variant="selected" fontSize="12px" fontWeight="bold">SELL YOUR PROPERTY</Text></Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
  )
}
