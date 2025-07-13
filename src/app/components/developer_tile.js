'use client'
import { Flex, Box, Text, Image, Link } from '@chakra-ui/react'

export default function DeveloperTile({ developer, slug, vspace = "4", withIcons = false }) {

  return (
    <Link href={`/developers/${slug}`}>
      <Box 
        w={{ base: "360px", md: "290px"}}
        borderRadius={4}
        my={vspace}
        _hover={{
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 5px",
        }}>
        {developer && (
          <Flex direction="column" maxW="400px">
            <Flex bg="#000000" align="center" justify="center" w={{ base: "360px", md: "290px"}} h="260px">
              <Box bg={`url('${developer.logo[0].downloadURL}')`} bgSize="cover" bgPosition="center" w="200px" h="auto" />
            </Flex>
            <Text variant="tileItemTitle">{developer.title}</Text>
          </Flex>
        )}
      </Box>
    </Link>
  )
}