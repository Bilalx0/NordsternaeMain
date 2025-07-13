'use client'
import { Flex, Box, Text } from '@chakra-ui/react'
import BannerCarousel from './components/banner_one_carousel'
import BannerRealEstateExperts from './components/banner_two_experts'
import SearchBig from './components/search_big'
import FeaturedVillas from './components/featured_villas'
import FeaturedApartments from './components/featured_apartments'
import ListYourProperty from './components/list_your_property'
import FeaturedDevelopments from './components/featured_developments'
import FromThemagazine from './components/from_the_magazine'

export default function Home() {
  return (
    <Box>
      <BannerCarousel />
      <Flex justify="space-around" bg="#312A8F" >
        <Flex alignSelf="center" align="center" justify="space-around" color="#FFFFFF" w={{ base: "100vw", md: "80vw", lg: "1080px"}} direction={{ base: "column", md: "row"}} overflow="visible" p={4}>
          <Text variant="robotoSearchBigTitle" align="center" m={2}>Embrace a luxury lifestyle with extraordinary homes</Text>
          <SearchBig />
        </Flex>
      </Flex>
      <BannerRealEstateExperts />
      <FeaturedVillas />
      <FeaturedApartments />
      <ListYourProperty />
      <FeaturedDevelopments />
      <FromThemagazine limit="3" />
    </Box>
  )
}
