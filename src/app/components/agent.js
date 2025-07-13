'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Image, Link } from '@chakra-ui/react'

export default function Agent({ agent, vspace = "4", withIcons = false }) {
  const [agentPhoto, setAgentPhoto] = useState("url('/villa_placeholder_3.jpeg')");

    useEffect(() => {
      if (agent && !!agent.headShot) setAgentPhoto(agent.headShot[0].downloadURL);
      else setAgentPhoto(agent.photo[0].downloadURL);
    }, [agent]);

  return (
    <Link href={`/agent?licenseNumber=${agent.licenseNumber}`}>
      <Box 
        width="320px" 
        borderRadius={4}
        m={4}
        my={vspace}
        p={2} 
        _hover={{
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 5px",
        }}>
        
        {agent && (
          <Box textAlign="left" maxW="400px">
            <Box bg={`url('${agentPhoto}')`} bgSize="cover" bgPosition="center" h="280px" w="304px" ></Box>
            <Text my={2} variant="agentInfo" fontSize="22px">{agent.name}</Text>
            <Text my={2} variant="agentInfo">{agent.jobTitle}</Text>
            <Text my={2} variant="agentInfo">{agent.experience}{"+ Years of Experience"}</Text>
              
            <Flex my={4}>
              <Link as="a" mr={4} href={`mailto:${agent.email}`} isExternal>
                <Image alt="email agent" src="/icon_email.svg" width="28px" height="28px" />
              </Link>
              <Link as="a" mr={4} href={agent.linkedin} isExternal>
                <Image alt="agent on linkedin" src="/icon_linkedin_black.svg" width="28px" height="28px" />
              </Link>
            </Flex>
            {!withIcons && <Text variant="agentInfo" fontWeight="normal" dangerouslySetInnerHTML={{ __html: agent.introduction }} />}
          </Box>
        )}
        
      </Box>
    </Link>
  )
}