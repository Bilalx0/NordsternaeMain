'use client'
import { useEffect } from 'react'
import { Flex, Button, Text, Box } from '@chakra-ui/react'
import { useAgents } from '../../utils/useCMSHooks'
import Agent from '../components/agent'

export default function Home() {
  const { data: agents, isLoading, error } = useAgents();

  useEffect(() => {
    if (agents) {
      console.log('[Home] Fetched agents:', agents);
    }
    if (error) {
      console.error('[Home] Error fetching agents:', error.message);
    }
  }, [agents, error]);

  return (
    <Flex direction="column" w="100vw">
      <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" p={4} justify="center">
        <Text mt={4} align="center" variant="articleTitle">Our Story</Text>
        <Text align="center" variant="blackSubtitle" my={2}>A LIFESTYLE ORIENTED FULL SERVICE REAL ESTATE BROKERAGE</Text>
        <Flex direction={{ base: "column-reverse", md: "row" }} pt={4}>
          <Flex direction="column" p={4} justify="center">
            <Text variant="description">Nordstern is a tech-enabled luxury real estate brokerage specialising in matching individuals and families with properties that resonate with their desired lifestyles, whether its a serene beachfront mansion, a vibrant urban apartment, or a golf view villa.</Text>
            <Button size="m" as="a" href="/enquiry?reference=" my={4} variant="bigCTA">CONNECT WITH US</Button>  
          </Flex>
          <Flex minW={{ base: "100%", md: "50%" }}>
            <Box bg="url('/banner_aboutnordstern.jpg')" bgSize="cover" bgPosition="center" h="420px" w="100%" ></Box>
          </Flex>
        </Flex>
      </Flex>

      <Flex grow="1" bg='#312A8F' color="#FFFFFF" align="center" justify="center">
        <Flex direction="column" justify="center" align="center" p={4} w={{ base: "100vw", md: "80vw", lg: "1160px"}} overflow="scroll">
          <Text mt={4} variant="robotoExpertBannerTitlesWhite" align="center">Expertise Meets Exceptional Service</Text>
          <Text variant="largetext" align="center">With years of experience in real estate, we know where to find, market and sell the best properties</Text>

          <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" my={4} wrap="wrap">
            <Flex direction="column" justify="center" align="center" m={4}>
              <Text variant="robotoExpertBannerTitlesWhite">2 Bln+</Text>
              <Text fontSize="10px" mt={2}>TRANSACTIONS VALUE</Text>
            </Flex>
            <Flex direction="column" justify="center" align="center" m={4}>
              <Text variant="robotoExpertBannerTitlesWhite">1 Mln+</Text>
              <Text fontSize="10px" mt={2}>DIGITAL VIEWS ONLINE</Text>
            </Flex>
            <Flex direction="column" justify="center" align="center" m={4}>
              <Text variant="robotoExpertBannerTitlesWhite">150+</Text>
              <Text fontSize="10px" mt={2}>ACCESS TO PROJECTS</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex id="agentTeam" py={4} w={{ base: "100vw", md: "80vw", lg: "1160px"}} mx="auto" my={2} direction="column" align="center" justify="center">
        <Flex direction="column" p={4} justify="center">
          <Text fontSize="30px" align="center">Meet the Team</Text>
          <Text fontSize="16px" align="center" my={4}>We are a team of passionate and dedicated real estate professionals committed to understanding and embracing the diverse lifestyles of our clients.</Text>
        </Flex>

        <Flex direction={{ base: "column", md: "row" }} w={{ base: "100vw", md: "80vw", lg: "1100px" }} mx="auto" align="center" justify="start" wrap="wrap" p={2}>
          {isLoading ? (
            <Text>Loading agents...</Text>
          ) : error ? (
            <Text color="red.500">Error loading agents: {error.message}</Text>
          ) : agents && agents.length > 0 ? (
            agents.map(agent => (
              <Agent key={agent.id} agent={agent} vspace={4} withIcons={true} />
            ))
          ) : (
            <Text>No agents found.</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}