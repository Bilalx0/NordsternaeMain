'use client'
import { Box, Flex, Text, Spacer, Center, Image } from '@chakra-ui/react'
import Link from 'next/link'
import FooterLinks from './footer_links'
import NewsletterSignup from './newsletter_signup'

export default function Footer() {
  return (
    <Box bg="#202020" pb="36px">
      <NewsletterSignup />
      <FooterLinks />
      <Box width="100vw" bg='#FFFFFF' borderTop="1px solid #666666" my="24px" />
      <Flex minH="20" color="#FEFEFE" px={4} wrap="wrap" direction={{base: "column", md: "row" }} w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto">
        <Box>
          <Link href="/">
            <Image alt="nordstern logo homepage" src="/logo_nordstern_white.svg" w="120px" h="46px" />
          </Link>
          <Box fontSize="12px" my={2}>©2023 NORDSTERN REAL ESTATE LLC. NORDSTERN IS A REGISTERED TRADEMARK.</Box>
        </Box>
        <Spacer />
        <Flex fontSize={{base: "10px", md: "12px", lg: "14px" }} align="center" wrap="wrap" pb={12}>
          <Link href="/termsofuse">
            Terms of Use
          </Link>
          <Text px={2}>|</Text>
          <Link href="/privacy">
            Privacy Policy
          </Link>
          <Text px={2}>|</Text>
          <Link href="/sitemap">
            Sitemap
          </Link>
          <Text px={2}>|</Text>
          <Link href="/archive">
            Archive
          </Link>
        </Flex>
      </Flex>
    </Box>
  )
}