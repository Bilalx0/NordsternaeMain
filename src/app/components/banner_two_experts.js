import { Box, Flex, Text, Button } from '@chakra-ui/react'

export default function BannerRealEstateExperts() {
  const imageURL = "url('/banner_image_realestateexperts.jpg')";
  return (
    <Flex bg='#FDF9F3' align="center" justify="center">
      <Flex direction={{ base: "column", md: "row"}} justify="center" align="center" py={8} w={{ base: "100vw", md: "80vw", lg: "946px"}}>          
          <Flex>
            <Box bg={imageURL} bgSize="cover" bgPosition="center" w={{ base: "360px", md: "400px"}} h={{ base: "200px", md: "480px"}}></Box>
          </Flex>
          <Flex p={4} ml={4} direction="column" color="#383838">
            <Text variant="robotoExpertBannerTitles" align="left">Exquisite Homes Meet Inspired Service</Text>
            <Text variant="largetext" align="left">Nordstern is a tech-enabled luxury real estate brokerage redefining the real estate experience by prioritizing the unique lifestyle needs and aspirations of our clients.</Text>
           
            <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" my={4} wrap="wrap">
              <Flex direction="column"  justify="center" align="center" my={2}>
                <Text variant="robotoExpertBannerTitles">2 Bln+</Text>
                <Text fontSize="10px" mt={1}>TRANSACTION VALUE</Text>
              </Flex>
              <Flex direction="column" justify="center" align="center" my={2}>
                <Text variant="robotoExpertBannerTitles">1 Mln+</Text>
                <Text fontSize="10px" mt={1}>DIGITAL VIEWS</Text>
              </Flex>
              <Flex direction="column"  justify="center" align="center" my={2}>
                <Text variant="robotoExpertBannerTitles">150+</Text>
                <Text fontSize="10px" mt={1}>ACCESS TO PROJECTS</Text>
              </Flex>
            </Flex>
            <Button alignSelf="center" variant="light" my={8} as="a" href="/enquiry">ENQUIRE NOW</Button>
          </Flex>
        </Flex>
      </Flex>
  )
}