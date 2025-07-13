'use client'
import { useState, useEffect } from 'react'
import { Flex, Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, Text, Input, Button, Center, Checkbox, Stack, FormControl, Image } from '@chakra-ui/react'
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete"
import useCurrency from "../../utils/useCurrency"
import useMetric from "../../utils/useMetric"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import useSearch from "../../utils/useSearch"

export default function SearchFilters({ openFilters = false, onClose, updateResults = null }) {
  const pathname = usePathname();
  const { searchResults, getSearchResults } = useSearch();
  const router = useRouter();
  const { userCurrency, getPriceInAED } = useCurrency();
  const { userUnits, getAreaInUserUnits } = useMetric();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [localItems, setLocalItems] = useState([]);
  const [listingType, setListingType] = useState("sale");
  const [propertyTypes, setPropertyTypes] = useState(['villa', 'apartment', 'loftduplex', 'plot', 'penthouse']);
  const [minPrice, setMinPrice] = useState(10000);
  const [maxPrice, setMaxPrice] = useState(9999999);
  const [bedrooms, setBedrooms] = useState(1);
  const [minArea, setMinArea] = useState(500);
  const [maxArea, setMaxArea] = useState(25000);
  const [amenities, setAmenities] = useState([]);
  const [resultsPath, setResultsPath] = useState("/properties/");
  const [hints, setHints] = useState([]);
  const [searchTerm, setSearchTerm] = useState(" ");
 const [browserAgent, setBrowserAgent] = useState('');
  const [likelySafari, setLikelySafari] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const agent = window.navigator.userAgent.split(" ").pop();
      setBrowserAgent(agent);
      setLikelySafari(agent.match("Safari") && !agent.match("537"));
    }
  }, []);

  useEffect(() => {
    setIsOpenDrawer(openFilters);
    if (!!openFilters) handleSearch(searchTerm);
  }, [openFilters]);

  useEffect(() => {
    if (!!openFilters) handleSearch(searchTerm);
  }, [searchTerm, listingType, propertyTypes, minPrice, maxPrice, bedrooms, minArea, maxArea, amenities]);

  const handleSearch = async (query) => {
    let minPriceConverted = getPriceInAED(minPrice, userCurrency);
    let maxPriceConverted = getPriceInAED(maxPrice, userCurrency);
    let minAreaConverted = (userUnits === 'metric') ? Math.round(minArea*10.7639) : minArea;
    let maxAreaConverted = (userUnits === 'metric') ? Math.round(maxArea*10.7639) : maxArea;

    let filterString = 'isDisabled = false AND listingType = ' + listingType + " AND bedrooms >= " + bedrooms + " AND propertyType IN [" + propertyTypes.join(",") + "] AND price >= " + minPriceConverted + " AND (price <= " + maxPriceConverted + ") AND sqfeetArea >= " + minAreaConverted + " AND (sqfeetArea <= " + maxAreaConverted + ")";
    let localResultsPath =  "/properties/?search=" + encodeURIComponent(searchTerm) + '&listingType=' + listingType + "&bedrooms=" + bedrooms + "&propertyType=" + propertyTypes.join(",") + "&minPrice=" + minPriceConverted + "&maxPrice=" + maxPriceConverted + "&minArea=" + minAreaConverted + "&maxArea=" + maxAreaConverted + "&amenities=" + amenities.join(",") + "&stamp=" + Date.now() ;
    
    
    setResultsPath(localResultsPath);
    getSearchResults(searchTerm, filterString, amenities);
  }

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
    setLocalItems(searchResults);
  }, [searchResults]);

  const handlePropertyType = (e) => {
    let tempPropTypes = [];
    if (!!e.target.checked && propertyTypes.indexOf(e.target.value) === -1) {
      tempPropTypes = propertyTypes.concat([e.target.value]);
    }
    else if (!e.target.checked) {
      tempPropTypes = propertyTypes.filter(type => type !== e.target.value);
    }
    if (tempPropTypes.length >= 1) {
      setPropertyTypes(tempPropTypes);
    }
    else setPropertyTypes(['villa', 'apartment', 'duplex', 'townhouse', 'penthouse']);
  }

  const handleAmenity = (e) => {
    let tempAmen = [];
    if (!!e.target.checked && amenities.indexOf(e.target.value) === -1) {
      tempAmen = amenities.concat([e.target.value]);
    }
    else if (!e.target.checked) {
      tempAmen = amenities.filter(amenity => amenity !== e.target.value);
    }

    if (tempAmen.length >= 1) setAmenities(tempAmen);
    else setAmenities(['Balcony', 'Terrace', 'Swimming Pool', 'Covered Parking', 'Private Gym', 'Private Garden', 'Concierge Service']);
  }

  const resetFilters = () => {
    setSearchTerm("");
    setAmenities([]);
    setPropertyTypes([]);
    setMinPrice(10000);
    setMaxPrice(9999999);
    setBedrooms(1);
    setMinArea(500);
    setMaxArea(25000);
  };

  const handleCTAClose = (e) => {
    e.preventDefault();
    
    if (!!updateResults) {
      updateResults(localItems.sort((a,b) => !!b.isFeatured - !!a.isFeatured));
      onClose();
    }
    else {
      //console.log("We're using search from header so will push the route", pathname);
      router.replace(resultsPath);
      onClose();
    }
  };

  return (
    <Drawer placement='top' onClose={onClose} isOpen={isOpenDrawer}>
    <DrawerOverlay sx={{ position: "absolute", top: "0px", left: "0px", 'z-index': "999" }} />
    <DrawerContent bg="#FDF9F3">
      <Flex mt="24px" align="center" justify="center" py={4} borderBottom="1px solid #202020">
        <Text variant="searchFiltersHeader">Search Properties</Text>
        <Button sx={{ position: 'absolute', right: '20px'}} variant="closeButton" onClick={onClose}><Image alt="close drawer" src="/icon_close.svg" /></Button>
      </Flex>
      <DrawerBody>
        <Flex align="center" justify="center" direction="column" px={2}>
          <Flex direction="column" justify="space-around" w={{ base: "80vw", md: "80vw", lg: "900px"}} mx="auto">
            <Flex m={4} justify="space-around" align="center" alignSelf="center" width="200px">
              <Button variant='linkButton' onClick={() => setListingType('sale')}><Text variant={(listingType === 'sale') ? 'bigSearchMiniButtonTextUnderlined' : 'bigSearchMiniButtonText'} color="#202020" p={2}>Buy</Text></Button>
              <Button variant='linkButton' onClick={() => setListingType('rent')}><Text variant={(listingType === 'rent') ? 'bigSearchMiniButtonTextUnderlined' : 'bigSearchMiniButtonText'} color="#202020" p={2}>Rent</Text></Button>
              <Button variant='linkButton' onClick={() => setListingType('offplan')}><Text variant={(listingType === 'offplan') ? 'bigSearchMiniButtonTextUnderlined' : 'bigSearchMiniButtonText'} color="#202020" p={2}>Off-Plan</Text></Button>
            </Flex>

            <Text variant="searchFilterTitles" my={2}>Location</Text>
            <FormControl color="#202020" mb={6}>
              <AutoComplete openOnFocus color="#202020">
              <AutoCompleteInput variant="outlined" bg="none" border="1px solid #999999" placeholder='AREA, DEVELOPMENT...' _placeholder={{ fontSize: '12px', color: '#999999' }} onChange={(e) => setSearchTerm(e.target.value)} />
                <AutoCompleteList>
                  {hints.map((hint, idx) => (
                    <AutoCompleteItem
                      key={idx}
                      value={hint}
                      textTransform="capitalize"
                      color="#202020"
                      onClick={() => setSearchTerm(hint[0])}
                    >
                      {hint[0]}<Flex justify="center" align="center" mx={8} px={2} borderRadius={2} bg="#DDDDDD" fontSize="10px">{hint[1]}</Flex>
                    </AutoCompleteItem>
                  ))}  
                </AutoCompleteList>
              </AutoComplete>
            </FormControl>

            
            
            <Text variant="searchFilterTitles" my={2}>Type</Text>
            <Flex align="center" wrap="wrap" mb={6}>
              <Checkbox colorScheme="FDF9F3" iconColor="#202020" defaultChecked size="lg" mr={4} mb={2} value="plot" onChange={(e) => handlePropertyType(e)}>
                <Text>Plot</Text>
              </Checkbox>
              <Checkbox colorScheme="FDF9F3" iconColor="#202020" defaultChecked size="lg" mr={4} mb={2} value="apartment" onChange={(e) => handlePropertyType(e)}>
                <Text>Apartment</Text>
              </Checkbox>
              <Checkbox colorScheme="FDF9F3" iconColor="#202020" defaultChecked size="lg" mr={4} mb={2} value="villa" onChange={(e) => handlePropertyType(e)}>
                <Text>Villa</Text>
              </Checkbox>
              <Checkbox colorScheme="FDF9F3" iconColor="#202020" defaultChecked size="lg" mr={4} mb={2} value="penthouse" onChange={(e) => handlePropertyType(e)}>
                <Text>Penthouse</Text>
              </Checkbox>
              <Checkbox colorScheme="FDF9F3" iconColor="#202020" defaultChecked size="lg" mr={4} mb={2} value="loftduplex" onChange={(e) => handlePropertyType(e)}>
                <Text>Loft & Duplex</Text>
              </Checkbox>
            </Flex>

            <Flex align="center"><Text variant="searchFilterTitles" my={2}>Price</Text><Text mx={2}>({userCurrency})</Text></Flex>
            <Flex mb={6} align="center">
              <Stack>
                <Text variant='finePrint'>Min Price</Text>
                <Input type="number" value={minPrice} step="1000" onChange={(e) => setMinPrice(e.target.value)} />
              </Stack>
              <Text mt={4} mx={4}>{"-"}</Text>
              <Stack>
                <Text variant='finePrint'>Max Price</Text>
                <Input type="number" value={maxPrice} step="1000" onChange={(e) => setMaxPrice(e.target.value)} />
              </Stack>
            </Flex>

            <Text variant="searchFilterTitles" my={2}>Bedrooms</Text>
            <Flex wrap="wrap" mb={6}>
              <Button mr={2} w="60px" h="36px" variant={(bedrooms === 1) ? "bigCTA" : "whiteBigCTA"} onClick={() => setBedrooms(1)}>ANY</Button>
              <Button mr={2} w="60px" h="36px" variant={(bedrooms === 2) ? "bigCTA" : "whiteBigCTA"} onClick={() => setBedrooms(2)}> 2+ </Button>
              <Button mr={2} w="60px" h="36px" variant={(bedrooms === 3) ? "bigCTA" : "whiteBigCTA"} onClick={() => setBedrooms(3)}> 3+ </Button>
              <Button mr={2} w="60px" h="36px" variant={(bedrooms === 4) ? "bigCTA" : "whiteBigCTA"} onClick={() => setBedrooms(4)}> 4+ </Button>
            </Flex>

            <Flex align="center"><Text variant="searchFilterTitles" my={2}>Size</Text><Text mx={2}>({(userUnits === 'american') ? 'sq ft' : 'sqm'})</Text></Flex>
            <Flex mb={6} align="center">
              <Stack>
                <Text variant='finePrint'>Min Area</Text>
                <Input type="number" value={minArea} step="10" onChange={(e) => setMinArea(e.target.value)} />
              </Stack>
              <Text mt={4} mx={4}>{"-"}</Text>
              <Stack>
                <Text variant='finePrint'>Max Area</Text>
                <Input type="number" value={maxArea} step="10" onChange={(e) => setMaxArea(e.target.value)} />
              </Stack>
            </Flex>

            <Text variant="searchFilterTitles" my={2}>Features</Text>
            <Flex mb={6} justify={{ base: "space-between", md: "start" }} align="center" wrap="wrap"  pb={16}>
              <Flex direction="column">
                <Checkbox py={2} value='Balcony' onChange={(e) => handleAmenity(e)}>Balcony</Checkbox>
                <Checkbox py={2} value='Covered Parking' onChange={(e) => handleAmenity(e)}>Covered parking</Checkbox>
                <Checkbox py={2} value='Parking' onChange={(e) => handleAmenity(e)}>Parking</Checkbox>
                <Checkbox py={2} value='Private Gym' onChange={(e) => handleAmenity(e)}>Private Gym</Checkbox>
              </Flex>
              <Flex direction="column" ml={{ md: "8" }}>
                <Checkbox py={2} value='Terrace' onChange={(e) => handleAmenity(e)}>Terrace</Checkbox>
                <Checkbox py={2} value='Private Garden' onChange={(e) => handleAmenity(e)}>Private Garden</Checkbox>
                <Checkbox py={2} value='Swimming Pool' onChange={(e) => handleAmenity(e)}>Swimming Pool</Checkbox>
                <Checkbox py={2} value='Concierge' onChange={(e) => handleAmenity(e)}>Concierge Service</Checkbox>
              </Flex>
            </Flex>
        </Flex>
        <Flex justify="space-between" align="center" w="100vw" direction={{ base: "column-reverse", md: "row" }} sx={{ position: "sticky", bottom: "0", left: "0" }} bg="#FDF9F3" boxShadow="rgb(0 0 0 / 20%) 0px -2px 4px;" grow="grow" p={4}>
            <Button my={2} variant='linkButton' onClick={resetFilters}><Flex align="center"><Image alt="close drawer" src="/icon_close.svg" border="1px solid #202020" borderRadius="50%" w="14px" h="14px" /><Text variant="clearFiltersButtonUnderlined" mx={2}>Clear Selection</Text></Flex></Button>
            {!likelySafari && <Button my={2} variant='bigCTA' onClick={handleCTAClose}>{localItems && localItems.length ? <Text variant="buttonText">{'SHOW '}{localItems.length}{' PROPERTIES'}</Text> : "SEARCH"}</Button>}
            {!!likelySafari && <Button my={2} variant='bigCTA' as="a" target="_blank" href={resultsPath}>{localItems && localItems.length ? <Text variant="buttonText">{'SHOW '}{localItems.length}{' PROPERTIES'}</Text> : "SEARCH"}</Button>}
          </Flex>
        </Flex>
      </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}