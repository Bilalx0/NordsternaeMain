'use client'
import { Flex, Box, Center, Text } from '@chakra-ui/react'
import FeaturedVillas from '../components/featured_villas'
import FeaturedApartments from '../components/featured_apartments'
import FeaturedDevelopments from '../components/featured_developments'

export default function Home() {
  return (
    <Box>

      <Center p={4}>
        <Text fontSize="xl">Find a home that suits your lifestyle!</Text>
      </Center>

      <FeaturedVillas />
      <FeaturedApartments />


      <FeaturedDevelopments />

    </Box>
  )
}
