'use client';

import { useState, useEffect } from 'react';
import { Flex, Button, Text, Image } from '@chakra-ui/react';
import { useAgentByLicenseNumber, useProperties } from '../../utils/useCMSHooks'
import PropertyListing from '../components/property_listing'

export default function Home({ params }) {
  const agentRef = params.licenseNumber;
  const { data: agent, isLoading: isLoadingAgent, error: agentError } = useAgentByLicenseNumber(agentRef);
  const { data: properties, isLoading: isLoadingProperties, error: propertiesError } = useProperties();
  const [agentProperties, setAgentProperties] = useState([]);
  const [chosenImage, setChosenImage] = useState('/banner_sell_with_us.jpg');

  // Log agent and set image
  useEffect(() => {
    if (agent) {
      console.log(`[AgentProfile] Fetched agent for licenseNumber=${agentRef}:`, agent);
      const photoUrl = agent.headShot || agent.photo;
      setChosenImage(photoUrl);
      console.log(`[AgentProfile] Set chosenImage for agent ${agent.name || 'unknown'}: ${photoUrl}`);
    }
    if (agentError) {
      console.error(`[AgentProfile] Error fetching agent for licenseNumber=${agentRef}:`, agentError.message);
    }
  }, [agent, agentError]);

  // Filter properties by agent id
  useEffect(() => {
    if (properties && agent?.id) {
      const filteredProperties = properties.filter(x => x.agent?.[0]?.id === agent.id);
      setAgentProperties(filteredProperties);
      console.log(`[AgentProfile] Filtered ${filteredProperties.length} properties for agent id=${agent.id}`);
    }
    if (propertiesError) {
      console.error('[AgentProfile] Error fetching properties:', propertiesError.message);
    }
  }, [properties, agent, propertiesError]);

  // Handle loading state
  if (isLoadingAgent || isLoadingProperties) {
    return (
      <Flex direction="column" justify="center" align="center" minH="100vh" bg="#FDF9F3">
        <Text>Loading agent details for licenseNumber: {agentRef}...</Text>
      </Flex>
    );
  }

  // Handle error or missing agent
  if (agentError || !agent) {
    return (
      <Flex direction="column" justify="center" align="center" minH="100vh" bg="#FDF9F3" gap={4}>
        <Text fontSize="xl" fontWeight="bold">Agent not found for licenseNumber: {agentRef}</Text>
        <Text color="gray.500">The agent you are looking for may not exist or is temporarily unavailable.</Text>
        {agentError && <Text color="red.500">Error: {agentError.message}</Text>}
        <Button as="a" href="/agents" variant="bigCTA" size="lg">
          Back to Agents
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column" w="100vw">
      <Flex direction="column" w={{ base: '100vw', md: '80vw', lg: '946px' }} mx="auto" p={4} justify="center">
        <Text mt={4} align="center" variant="articleTitle">{agent.name || 'Unknown Agent'}</Text>
        <Text align="center" variant="blackSubtitle">{agent.jobTitle || 'Not specified'}</Text>
        <Flex direction={{ base: 'column', md: 'row' }} my={8}>
          <Flex minW={{ base: '100%', md: '440px' }} maxW="444px">
            <Image
              src={chosenImage}
              w="100%"
              h="100%"
              maxW="440px"
              alt={`Photo of ${agent.name || 'agent'}`}
            />
          </Flex>
          <Flex direction="column" p={4} align="center">
            <Flex direction="column" alignSelf="flex-start">
              <Text variant="latoBoldText">BRN no. {agent.licenseNumber || 'Not specified'}</Text>
              <Text variant="latoBoldText">
                Real Estate Experience: {agent.experience ? `${agent.experience} years` : 'Not specified'}
              </Text>
              <Flex>
                <Text variant="latoBoldText">Languages: </Text>
                {agent.languages && Array.isArray(agent.languages) && agent.languages.length > 0 ? (
                  agent.languages.map((lang, idx) => (
                    <Text key={lang} variant="latoBoldText" px={1}>
                      {lang}
                      {idx < agent.languages.length - 1 ? ',' : ''}
                    </Text>
                  ))
                ) : (
                  <Text variant="latoBoldText" px={1}>Not specified</Text>
                )}
              </Flex>
            </Flex>
            <Text dangerouslySetInnerHTML={{ __html: agent.introduction || 'No introduction available' }} />
            <Flex color="#000000" wrap="wrap" alignSelf="flex-start">
              <Button
                my={2}
                as="a"
                href={agent.phone ? `tel:${agent.phone}` : '#'}
                size="m"
                variant="bigCTA"
                isDisabled={!agent.phone}
              >
                CONTACT {agent.name || 'Agent'}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex direction="column" w={{ base: '100vw', md: '80vw', lg: '946px' }} mx="auto">
        <Text fontSize="32px" align="center">Agent Properties</Text>
        <Flex direction={{ base: 'column', md: 'row' }} wrap="wrap" p={2} align="center" justify="center">
          {propertiesError ? (
            <Text color="red.500">Error loading properties: {propertiesError.message}</Text>
          ) : agentProperties.length > 0 ? (
            agentProperties.map(item => (
              <PropertyListing
                key={item.reference}
                reference={item.reference}
                listing={item}
                wide={{ base: 'true', md: 'false' }}
                vspace={4}
              />
            ))
          ) : (
            <Text>No properties found for this agent.</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}