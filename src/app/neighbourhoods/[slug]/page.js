'use client'
import { useState, useEffect } from 'react'
import { Flex, Text, Button, Divider } from '@chakra-ui/react'
import PropertyListing from '../../components/property_listing'
import useFirebaseCollection from "../../../utils/useFirebaseCollection"
import { useParams } from 'next/navigation'


export default function Home() {
  const params = useParams();
  const { items, loadItems } = useFirebaseCollection("properties");
  const { item, getItemByFieldValue } = useFirebaseCollection("neighborhoods");
  
  const [images, setImages] = useState([
    "/villa_placeholder_2.jpeg",
    "/apartment_placeholder_1.jpeg",
    "/apartment_placeholder_3.jpeg",
    "/villa_placeholder_1.jpeg",
    "/development_placeholder_2.jpeg",
    ]);

  useEffect(() => {
    loadItems();
    getItemByFieldValue("urlSlug", params.slug);
  }, []);

  useEffect(() => {
    if (item.title) {
      if (item.agent) {
        loadAgent("name", item.agent);
      }
      item.images.forEach(image => {
        images.unshift(image.downloadURL);
        images.pop();
      });
    }
  }, [item]);

  const neighbourhoodHasProperties = () => {
    let np = [];
    if (item.title && items.length) {
      np = items.filter(x => x.neighbourhood === item.title);
    }
    if (np.length >= 1) return true;
    else return false;
  }

  return (
    <Flex direction="column" w={{ base: "100vw", md: "80vw", lg: "946px" }} mx="auto" my={8}>
      {item.title && <Flex direction="column" align="center" justify="center">
        <Text my={2} variant="articleTitle" align="center">{item.title}</Text>
        <Text my={2} variant="blackSubtitle" align="center">{item.subtitleBlurb}</Text>
        
        {items && (items.filter(x => x.neighbourhood === item.title).length >= 1) && <>
          <Text variant="robotoNormalTitle">Properties in the Neighbourhood</Text>
          <Text my={2}>{item.availableProperties}{' Properties Available'}</Text>
          <Flex direction={{ base: "column", md: "row" }} wrap="wrap" justify="center" align="center" my={2}>
            {items.filter(x => x.neighbourhood === item.title).map(listing => <PropertyListing key={listing.reference} listing={listing} reference={listing.reference} />)}
          </Flex>
        </>}

        <Divider my={4} />
        <Text my={2} variant="largetext" dangerouslySetInnerHTML={{ __html: item.neighbourhoodDetails }}></Text>
        <Text my={4} variant="latoBoldText">{"What to expect in "}{item.title}</Text>
        <Text my={2} variant="largetext" dangerouslySetInnerHTML={{ __html: item.neighbourhoodExpectation }}></Text>

        <Button size="m" variant="bigCTA" as="a" href={"/enquiry?reference=" + item.urlSlug} my={4}>Download Brochure</Button>  
        <Button size="m" variant="dark" as="a" href={`/neighbourhoods/guide/${item.urlSlug}`} my={4}>View Neighbourhood Guide</Button>        

      </Flex>}
    </Flex>
  )
}

