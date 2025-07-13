'use client'
import { useState } from 'react'
import { Flex, Image, Input, Center, InputGroup, InputRightElement } from '@chakra-ui/react'
import SearchFilters from './search_filters'

export default function SearchSecondary() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Center width="100%" color='white'>

      <Flex onClick={() => setIsOpen(true)}>
          <InputGroup>  
            <Input size="md" placeholder='Palm Jumeirah' _placeholder={{ fontSize: '12px' }} />
            <InputRightElement bg="#312A8F" borderRightRadius="8px">
              <Image alt="Search Icon" src="/icon_search_white.svg" width="16px" height="16px" />
            </InputRightElement>
        </InputGroup>
      </Flex>
      
      <SearchFilters openFilters={isOpen} onClose={() => setIsOpen(false)} />
    </Center>
  )
}