'use client'
import { useState, useEffect } from 'react'
import { Image, Flex, Drawer, DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton, Text, Button, Container, Link } from '@chakra-ui/react'

export default function SidebarMenu({ openSidebarMenu = false, onClose }) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    setIsOpenMenu(openSidebarMenu);
  }, [openSidebarMenu]);

  return (
    <Drawer placement='right' size={{ md: "sm", lg: "md" }} onClose={onClose} isOpen={isOpenMenu}>
      <DrawerOverlay sx={{ position: "absolute", top: "0px", left: "0px", 'z-index': "999" }} />
        <DrawerContent bg="#312A8F" color="#FDF9F3">
          <DrawerCloseButton />
            <DrawerBody py={16}>
            <Flex direction="column" justify="space-between" h="100%">
              <Flex direction="column" justify="center" textAlign="right" pt={16}>
                <Link href="/properties" onClick={() => onClose()}>
                  <Text variant="sidebarMenuItem" px={4}>PROPERTIES</Text>
                </Link>
                <Link href="/aboutnordstern#agentTeam" onClick={() => onClose()}>
                  <Text variant="sidebarMenuItem" px={4}>AGENTS</Text>
                </Link>
                <Link href="/magazine" onClick={() => onClose()}>
                  <Text variant="sidebarMenuItem" px={4}>MAGAZINE</Text>
                </Link>
                <Link href="/sellwithnordstern" onClick={() => onClose()}>
                  <Text variant="sidebarMenuItem" px={4}>SELL WITH US</Text>
                </Link>
              </Flex>
              <Flex direction="column" justify="center" alignSelf="flex-end">
                <Text mb={2} align="right">Want to get in touch?</Text>
                <Button alignSelf="flex-end" as="a" w="144px" href="/enquiry" variant="bright" onClick={() => onClose()}>
                  GET A CALL BACK
                </Button>
                <Flex my={4} alignSelf="flex-end">
                  <Link mr={4} href="tel:+971(0)42889093">
                    <Image alt="call nordstern" src="/icon_phone_white.svg" width="24px" height="24px" />
                  </Link>
                  <Link href="https://wa.me/971564264660">
                    <Image alt="whatsapp nordstern" src="/icon_whatsapp_white.svg" width="24px" height="24px" />
                  </Link>
                </Flex>
                <Text mt={4} mb={2} align="right">Follow us</Text>
                <Flex align="center" justify="space-between">
                  <Link href="https://www.facebook.com/profile.php?id=61554490632004&mibextid=LQQJ4d" isExternal onClick={() => onClose()}>
                    <Image alt="nordstern on facebook" src="/icon_facebook.svg" w="30px" h="30px" />
                  </Link>
                  <Link href="https://www.instagram.com/nordsternuae" isExternal onClick={() => onClose()}>
                    <Image alt="nordstern on instagram" src="/icon_instagram.svg" w="30px" h="30px" />
                  </Link>
                  <Link href="https://www.linkedin.com/company/nordstern-real-estate/" isExternal onClick={() => onClose()}>
                    <Image alt="nordstern on linkedin" src="/icon_linkedin.svg" w="30px" h="30px" />
                  </Link>
                  <Link href="https://www.youtube.com/@NordsternRealEstate" isExternal onClick={() => onClose()}>
                    <Image alt="nordstern on youtube" src="/icon_youtube.svg" w="30px" h="30px" />
                  </Link>
                </Flex>
                <Flex align="center" justify="space-between" my={8} textAlign="right">
                  <Link href="/terms" onClick={() => onClose()}>
                    <Text variant="finePrint">Terms of Use</Text>
                  </Link>
                  <Text mx={2}>|</Text>
                  <Link href="/privacy" onClick={() => onClose()}>
                    <Text variant="finePrint">Privacy Policy</Text>
                  </Link>
                </Flex>
              </Flex>
              </Flex>
            </DrawerBody>
          </DrawerContent>
    </Drawer>
  )
}