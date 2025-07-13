'use client'
import { useState, useEffect } from 'react'
import { Flex, Text, Input, Button, Image } from '@chakra-ui/react'
import useFirebaseCollection from "../../utils/useFirebaseCollection"
import { useToast } from '@chakra-ui/react'

export default function NewsletterSignup() {
  const toast = useToast();
  const { item, addItem } = useFirebaseCollection("newsletterSubscribers");
  const [email, setEmail] = useState("test@example.com");
  const [subscriberSent, setSubscriberSent] = useState(false);

  useEffect(() => {
    const subscriber = window.localStorage.getItem("newsletterSubscribed");
    if (!!subscriber && subscriber !== "") {
      setEmail(subscriber);
      setSubscriberSent(true);
    }
  }, []);

  useEffect(() => {
    if (subscriberSent) window.localStorage.setItem("newsletterSubscribed", email);
  }, [subscriberSent]);

  const handleAddItem = () => {
    try { 
      addItem({
        email: email,
        signupDate: (new Date()).toGMTString(),
      });
      toast({
          title: 'Thank you for subscribing!',
          description: "We'll keep you posted on all the latest updates on the property market!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      setSubscriberSent(true);
    }
    catch (e) {
      toast({
          title: "Looks like we could not make that work",
          description: "Our IT department has been automatically notified and will fix this asap. Please try again later.",
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      setSubscriberSent(false);
    }
  };

  return (
    <>
      {!subscriberSent && <Flex bg="#FDF9F3" color="#383838" py="50px" px={2} align="center" borderTop="1px solid #DEDEDE">
        <Flex direction="column" w={{ base: "90vw", md: "80vw", lg: "946px" }} mx="auto">
          <Text variant="robotoNewsletter" align="center">Stay in the loop.</Text>
          <Text variant="robotoNewsletter" align="center">Sign up to our weekly newsletter for market updates</Text>
          <Flex mt={4} direction="column" alignSelf="center" justify="center" align="center" w="340px">
            <Input variant="flushed" placeholder='NAME@EXAMPLE.COM' _placeholder={{ fontSize: '10px', textAlign: 'center' }} onChange={(e) => setEmail(e.target.value)} />
            <Button as="a" href="#" variant="dark" mt={2} onClick={handleAddItem}>
              SIGN UP
              <Image mx={4} alt="Scroll right" src="/icon_arrow_right_white.svg" width="22" height="22" />
            </Button>
          </Flex>
        </Flex>
      </Flex>}
      {!!subscriberSent && <Flex bg="#FDF9F3" color="#383838" py="50px" px={2} align="center" borderTop="1px solid #DEDEDE">
        <Flex direction="column" w={{ base: "90vw", md: "80vw", lg: "946px" }} mx="auto">
        <Text variant="robotoNewsletter" align="center">Thank you for subscribing to the magazine!</Text>
        <Text variant="robotoNewsletter" align="center">{"We'll keep you posted on all the latest updates on the property market!"}</Text>
        {email && <Text variant="finePrint" align="center">{"Subscriber Email Address: "}{email}</Text>}
        </Flex>
      </Flex>}
    </>
  )
}