'use client'
import { useState, useEffect } from 'react'
import { Flex, Box, Text, Spacer, Show, Image } from '@chakra-ui/react'
import Link from 'next/link'
import SearchFilters from './search_filters'
import SidebarMenu from './sidebar_menu'
import SearchSecondary from './search_secondary'
import { usePathname, useRouter } from 'next/navigation'
import Head from "../../utils/useHeadSEO"

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isProperty, setIsProperty] = useState(false);
  const [isDevelopment, setIsDevelopment] = useState(false);
  const [isMagazine, setIsMagazine] = useState(false);
  const [isPropertiesPage, setIsPropertiesPage] = useState(false);

  useEffect(() => {
    const propertyMatch = pathname.match("property");
    const developmentMatch = pathname.match("developments");
    const magazineMatch = pathname.match("magazine");
    const propertiesMatch = pathname.match("properties");
    setIsProperty(propertyMatch && propertyMatch.length);
    setIsDevelopment(developmentMatch && developmentMatch.length);
    setIsMagazine(magazineMatch && magazineMatch.length);
    setIsPropertiesPage(propertiesMatch && propertiesMatch.length);
  }, [pathname]);

  return (
    <>
      {!isMagazine && <Head title="Luxury Property Brokers in Dubai | Nordstern Real Estate" metaDescription="Exquisite Homes Meet Inspired Service | Nordstern Real Estate" />}
      <Show above="sm">
        {pathname == "/" && <Flex h="90px" bg="#FDF9F3" color="#312A8F" w='100vw' sx={{ position: 'sticky', top: '0px', left: '0px', 'z-index': '99'}}>
          <Flex w={{ md: "80vw", lg: "946px"}} m="auto" align="center" justify="space-between">
            <Link href="/">
              <Image alt="nordstern logo homepage" src="/logo_nordstern.svg" h="28px" w="auto" />
            </Link>
          <Spacer />
          <Flex justifyContent="flex-end" align="center" grow="1" wrap="wrap" px={4}>
            <Flex _hover={{ cursor: "pointer" }} onClick={() => setIsOpen(true)} align="center">
              <Image alt="Search icon" src="/icon_search.svg" h="20px" w="20px" />
              <Text variant="headerMenuItem" px={1}>SEARCH</Text>
            </Flex>
            <Link href="/properties">
              <Text variant="headerMenuItem" px={3}>PROPERTIES</Text>
            </Link>
            <Link href="/aboutnordstern">
              <Text variant="headerMenuItem" px={3}>AGENTS</Text>
            </Link>
            <Link href="/magazine">
              <Text variant="headerMenuItem" px={3}>MAGAZINE</Text>
            </Link>
            <Link href="/sellwithnordstern">
              <Text variant="headerMenuItem" px={3}>SELL WITH US</Text>
            </Link>
            </Flex>
          </Flex>
          <SearchFilters openFilters={isOpen} onClose={() => setIsOpen(false)} />
        </Flex>}
        {pathname !== "/" && <Flex h="90px" bg="#FDF9F3" color="#312A8F" w='100vw' sx={{ position: 'sticky', top: '0px', left: '0px', 'z-index': '99'}}>
            <Flex w={{ md: "80vw", lg: "946px"}} m="auto" align="center" justify="space-between">
            <Link href="/">
              <Image alt="nordstern logo homepage" src="/logo_nordstern.svg" h="30px" w="auto" />
            </Link>
            <SearchSecondary onClick={() => setIsOpen(true)} />
            <Flex onClick={() => setIsOpenMenu(true)}>
              <Image alt="nordstern menu" src="/icon_menu.svg" h="30px" w="30px" />
            </Flex>
          </Flex>
          <SidebarMenu openSidebarMenu={isOpenMenu} onClose={() => setIsOpenMenu(false)} />
          <SearchFilters openFilters={isOpen} onClose={() => setIsOpen(false)} />
        </Flex>}
      </Show>
      <Show below="md">
        <Flex>
          <Box h="64px" bg="#00000" />
          
          {!isProperty && !isDevelopment && <Flex h="64px" bg="#FDF9F3" justify="space-between" px="24px" py="16px" w="100vw" align="flex-end" grow="1" sx={{ position: 'fixed', top: '0px', left: '0px', 'z-index': '99'}}>
            <Link href="/">
              <Image alt="nordstern logo homepage" src="/logo_nordstern.svg" h="30px" w="auto" />
            </Link>
            <Flex onClick={() => setIsOpenMenu(true)}>
              <Image alt="nordstern menu" src="/icon_menu.svg" h="30px" w="30px" />
            </Flex>
          </Flex>}
          {(!!isProperty || !!isDevelopment) && <Flex h="64px" bg="#FDF9F3" justify="space-between" px="24px" py="16px" w="100vw" align="flex-end" grow="1" sx={{ position: 'fixed', top: '0px', left: '0px', 'z-index': '99'}}>
            <Flex onClick={() => router.back()}>
              <Image alt="nordstern menu" src="/icon_arrow_left_blue.svg" w="30px" h="30px" />
            </Flex>
            <Link href="/">
              <Image alt="nordstern logo homepage" src="/logo_nordstern.svg" h="30px" w="auto" />
            </Link>
            <Flex onClick={() => setIsOpen(true)}>
              <Image alt="nordstern menu" src="/icon_search.svg" w="30px" h="30px" />
            </Flex>
          </Flex>}

          {!isProperty && !isDevelopment && <Flex h="64px" justify="space-around" w="100vw" bg="#312A8F" color="#FDF9F3" align="center" grow="1" sx={{ position: 'fixed', bottom: '0px', left: '0px', 'z-index': '99'}}>
            <Link href="/">
              <Flex direction="column" align="center" justify="center" h="64px" w="64px" borderBottom={pathname == "/" ? "8px solid #F2F2F2" : "" }>
                <Image alt="Scroll right" src="/icon_home_white.svg" w="28px" h="28px" />
                <Text variant="mobileMenuItem" pt="4px">HOME</Text>
              </Flex>
            </Link>

            <Flex direction="column" align="center" justify="center" onClick={() => setIsOpen(true)}>
              <Image alt="Scroll right" src="/icon_search_white.svg" w="28px" h="28px" />
              <Text variant="mobileMenuItem" pt="4px">SEARCH</Text>
            </Flex>
            
            <Link href="/magazine">
              <Flex direction="column" align="center" justify="center" h="64px" w="64px" borderBottom={pathname == "/magazine" ? "8px solid #F2F2F2" : "" }>
                <Image alt="Scroll right" src="/icon_magazine_white.svg" w="28px" h="28px" />
                <Text variant="mobileMenuItem" pt="4px">MAGAZINE</Text>
              </Flex>
            </Link>
            <Link href="/enquiry">
              <Flex direction="column" align="center" justify="center" h="64px" w="64px" borderBottom={pathname == "/enquiry" ? "8px solid #F2F2F2" : "" }>
                <Image alt="Scroll right" src="/icon_phone_white.svg" w="28px" h="28px" />
                <Text variant="mobileMenuItem" pt="4px">CONTACT</Text>
              </Flex>
            </Link>
          </Flex>}
          <SidebarMenu openSidebarMenu={isOpenMenu} onClose={() => setIsOpenMenu(false)} />
          <SearchFilters openFilters={isOpen} onClose={() => setIsOpen(false)} />
        </Flex>
      </Show>
    </>
  )
}