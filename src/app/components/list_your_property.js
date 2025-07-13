import { Flex, Text, Button, Image } from '@chakra-ui/react'

export default function ListYourProperty() {
  return (
    <Flex direction="column" justify="center" bg="#312A8F" color="#FDF9F3">
      <Flex direction="column" justify="center" align="center" w={{ base: "100vw", md: "80vw", lg: "1160px"}} m="auto" py="50px" px={2}>
        <Text variant="robotoSearchBigTitle" textAlign="center">List Your Property</Text>
        <Text variant="listYourPropBody" textAlign="center" my={2}>Give Your Property The Right Exposure On The Market</Text>
        <Flex justify="center" m={4} alignSelf="center" wrap="wrap">
          <Flex m={2}>
            <Image alt="list your property" src="/icon_checkmark_white.svg" w="16px" h="16px" />
            <Text variant="listYourPropBodyBold" px={2}>Dedicated Broker</Text>
          </Flex>
          <Flex m={2}>
            <Image alt="list your property" src="/icon_checkmark_white.svg" w="16px" h="16px" />
            <Text variant="listYourPropBodyBold" px={2}>Bespoke Content Creation</Text>
          </Flex>
          <Flex m={2}>
            <Image alt="list your property" src="/icon_checkmark_white.svg" w="16px" h="16px" />
            <Text variant="listYourPropBodyBold" px={2}>Premium Listings</Text>
          </Flex>
          <Flex m={2}>
            <Image alt="list your property" src="/icon_checkmark_white.svg" w="16px" h="16px" />
            <Text variant="listYourPropBodyBold" px={2}>Local & Global Exposure</Text>
          </Flex>
          <Flex m={2}>
            <Image alt="list your property" src="/icon_checkmark_white.svg" w="16px" h="16px" />
            <Text variant="listYourPropBodyBold" px={2}>AI Powered Insights</Text>
          </Flex>
          <Flex m={2}>
            <Image alt="list your property" src="/icon_checkmark_white.svg" w="16px" h="16px" />
            <Text variant="listYourPropBodyBold" px={2}>End-to-End Conveyancing</Text>
          </Flex>
        </Flex>
        <Button variant="bright" as="a" href="/enquiry" mt={8}>BOOK VALUATION</Button>
      </Flex>
    </Flex>
  )
}