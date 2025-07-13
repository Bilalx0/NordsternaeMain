'use client'
import { useState, useEffect } from 'react'
import { Flex, Button, Text, Image } from '@chakra-ui/react'
import useFirebaseCollection from "../../utils/useFirebaseCollection"
import { useSearchParams } from 'next/navigation';
import PropertyListing from '../components/property_listing'

export default function Home() {
  const searchParams = useSearchParams();
  const agentRef = searchParams.get("licenseNumber");
  const { agent, loadAgent } = useFirebaseCollection("agents");
  const { items, loadItems } = useFirebaseCollection("properties");
  const [localItems, setLocalItems] = useState([]);
  const [chosenImage, setChosenImage] = useState("url('/banner_sell_with_us.jpg')");

  useEffect(() => {
    loadAgent("licenseNumber", agentRef);
    loadItems();
  }, []);

  useEffect(() => {
    if (agent && agent.hasOwnProperty("photo")) {
      setChosenImage(agent.photo[0].downloadURL);
    }
  }, [agent]);

  useEffect(() => {
    setLocalItems(items.filter(x => x.agent[0].id === agent.id));
  }, [items]);

  return (
    <Flex direction="column" w="100vw">
      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" p={4} justify="center">
        <Text mt={4} align="center" variant="articleTitle">{agent.name}</Text>
        <Text align="center" variant="blackSubtitle">{agent.jobTitle}</Text>
        <Flex direction={{ base: "column", md: "row" }} my={8}>
          <Flex minW={{ base: "100%", md: "440px" }} maxW="444px">
            <Image src={chosenImage} w="100%" h="100%" maxW="440px" />
          </Flex>
          <Flex direction="column" p={4} align="center">
            <Flex direction="column" alignSelf="flex-start">
              <Text variant="latoBoldText">{"BRN no. "}{agent.licenseNumber}</Text>
              <Text variant="latoBoldText">{"Real Estate Experience: "}{agent.experience}{" years"}</Text>
              <Flex>
                <Text variant="latoBoldText">{"Languages: "}</Text>
                {agent.languages && agent.languages.length && agent.languages.map((lang, idx) => (
                    <Text key={lang} variant="latoBoldText" px={1}>{lang}{(idx < (agent.languages.length - 1)) ? "," : ""}</Text>
                  )
                )}
              </Flex>
            </Flex>
            <Text dangerouslySetInnerHTML={{ __html: agent.introduction }} />
            <Flex color="#000000" wrap="wrap" alignSelf="flex-start">
                <Button my={2} as="a" href={`tel:${agent.phone}`} size="m" variant="bigCTA">CONTACT {agent.name}</Button>
              </Flex>
          </Flex>
          
        </Flex>
      </Flex>

      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto">
        <Text fontSize="32px" align="center">Agent Properties</Text>
        <Flex direction={{ base: "column", md: "row" }} wrap="wrap" p={2} align="center" justify="center">
          {localItems.length && localItems.map(item => <PropertyListing wide={{ base: "true", md: "false" }} vspace={4} key={item.id} reference={item.reference} listing={item} />)}
        </Flex>
      </Flex>
    </Flex>
  )
}

