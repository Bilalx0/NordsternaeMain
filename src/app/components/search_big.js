'use client'
import { useState, useEffect, useRef } from 'react'
import { Flex, Image, Text, Button, Box, InputGroup, InputLeftElement, InputRightElement, Show, FormControl } from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useRouter } from 'next/navigation'
import useSearch from "../../utils/useSearch"

export default function SearchBig() {
  const { searchResults, getSearchResults } = useSearch();
  const router = useRouter();
  const boxRef = useRef(null);
  const [listingType, setListingType] = useState("sale");
  const [searchTerm, setSearchTerm] = useState("");
  const [localItems, setLocalItems] = useState([]);
  const [hints, setHints] = useState([]);

  useEffect(() => {
    setLocalItems(searchResults);
    
    let comms = {};
    searchResults.forEach(hit => {
      if (comms.hasOwnProperty(hit.community)) comms[hit.community] += 1;
      else comms[hit.community] = 1;
      if (comms.hasOwnProperty(hit.address)) comms[hit.address] += 1;
      else comms[hit.address] = 1;
    });
    let resultsCount = Object.entries(comms);
    setHints(resultsCount);
  }, [searchResults]);

  const handleSearch = async (query) => {
    getSearchResults(query, 'isDisabled = false AND listingType = ' + listingType, []);
  }

  useEffect(() => {
    getSearchResults(searchTerm, 'isDisabled = false AND listingType = ' + listingType, []);
  }, [listingType]);

  const goToResults = (prop) => {
    if (prop.trim() !== "") router.push(`/properties?search=${encodeURIComponent(prop)}&listingType=${listingType}`);
    else router.push("/properties?search=%20&listingType="+listingType);
  };

  return (
    <Box>
      <Flex direction="column" maxW="290px">
        <Show above="sm">
          <Flex pb={2} justify="start">
            <Button variant='linkButton' onClick={() => setListingType('sale')}><Text variant={(listingType === 'sale') ? 'bigSearchMiniButtonTextUnderlined' : 'bigSearchMiniButtonText'}>Buy</Text></Button>
            <Button variant='linkButton' onClick={() => setListingType('rent')}><Text variant={(listingType === 'rent') ? 'bigSearchMiniButtonTextUnderlined' : 'bigSearchMiniButtonText'}>Rent</Text></Button>
            <Button variant='linkButton' onClick={() => setListingType('offplan')}><Text variant={(listingType === 'offplan') ? 'bigSearchMiniButtonTextUnderlined' : 'bigSearchMiniButtonText'}>Off-Plan</Text></Button>
          </Flex>
        </Show>
                
        <FormControl color="#202020" onSubmit={() => goToResults(searchTerm)}>
          <AutoComplete openOnFocus color="#202020" onSelectOption={(e) => goToResults(e.item.value)}>
          <InputGroup>
            <InputLeftElement>
              <Image alt="search properties" src="/icon_search_white.svg" width="22" height="22" />
            </InputLeftElement>
            <AutoCompleteInput position="relative" ref={boxRef} color="#FDFDFD" variant="flushed" placeholder='Palm Jumeirah' _placeholder={{ fontSize: '12px' }} onChange={(e) => handleSearch(e.target.value)} />
            <InputRightElement onClick={() => goToResults(searchTerm)}>
              <Image alt="search properties" src="/icon_arrow_right_white.svg" width="22" height="22" />
            </InputRightElement>
          </InputGroup>
            <AutoCompleteList>
              {hints.map((hint, idx) => (
                <AutoCompleteItem
                  key={idx}
                  value={hint[0]}
                  textTransform="capitalize"
                  color="#202020"
                  onClick={() => goToResults(hint[0])}
                >
                  {hint[0]}<Flex justify="center" align="center" mx={8} px={2} borderRadius={2} bg="#DDDDDD" fontSize="10px">{hint[1]}</Flex>
                </AutoCompleteItem>
              ))}  
            </AutoCompleteList>
          </AutoComplete>
        </FormControl>
      </Flex>
    </Box>
  )
}