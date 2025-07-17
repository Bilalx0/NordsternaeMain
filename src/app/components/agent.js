'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Image, Link } from '@chakra-ui/react'

export default function Agent({ agent, vspace = "4", withIcons = false }) {
  const [agentPhoto, setAgentPhoto] = useState("url('/villa_placeholder_3.jpeg')");

  useEffect(() => {
    if (agent) {
      const photoUrl =
        agent.headShot||
        agent.photo;
      setAgentPhoto(photoUrl);
      console.log(`[Agent Photo] Set photo for agent ${agent.name || 'unknown'}: ${photoUrl}`);
    } else {
      setAgentPhoto("/villa_placeholder_3.jpeg");
      console.log('[Agent Photo] No agent data, using placeholder');
    }
  }, [agent]);

  if (!agent) {
    console.warn('[Agent Component] No agent data provided');
    return (
      <Box m={4} my={vspace}>
        <Text color="gray.500">No agent information available.</Text>
      </Box>
    );
  }

  return (
    <Link href={agent.licenseNumber ? `/agent?licenseNumber=${agent.licenseNumber}` : '#'} pointerEvents={agent.licenseNumber ? 'auto' : 'none'}>
      <Box 
        width="320px" 
        borderRadius={4}
        m={4}
        my={vspace}
        p={2} 
        _hover={{
          boxShadow: agent.licenseNumber ? "rgb(0 0 0 / 10%) 0px 0px 10px 5px" : "none",
        }}
      >
        <Box textAlign="left" maxW="400px">
          <Box 
            bgImage={agentPhoto} 
            bgSize="cover" 
            bgPosition="center" 
            h="280px" 
            w="304px" 
            borderRadius="md"
          />
          <Text my={2} variant="agentInfo" fontSize="22px">{agent.name || 'Unknown Agent'}</Text>
          <Text my={2} variant="agentInfo">{agent.jobTitle || 'Not specified'}</Text>
          <Text my={2} variant="agentInfo">
            {agent.experience ? `${agent.experience}+ Years of Experience` : 'Experience not specified'}
          </Text>
          <Flex my={4}>
            {agent.email ? (
              <Link as="a" mr={4} href={`mailto:${agent.email}`} isExternal>
                <Image alt="email agent" src="/icon_email.svg" width="28px" height="28px" />
              </Link>
            ) : (
              <Text mr={4} color="gray.500">Email not available</Text>
            )}
            {agent.linkedin ? (
              <Link as="a" mr={4} href={agent.linkedin} isExternal>
                <Image alt="agent on linkedin" src="/icon_linkedin_black.svg" width="28px" height="28px" />
              </Link>
            ) : (
              <Text mr={4} color="gray.500">LinkedIn not available</Text>
            )}
          </Flex>
          {!withIcons && (
            <Text 
              variant="agentInfo" 
              fontWeight="normal" 
              dangerouslySetInnerHTML={{ __html: agent.introduction || 'No introduction available' }} 
            />
          )}
        </Box>
      </Box>
    </Link>
  );
}