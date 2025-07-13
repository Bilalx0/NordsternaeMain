'use client'
import { useState, useEffect, useRef } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import useFirebaseCollection from "../../utils/useFirebaseCollection"

export default function BannerCarousel() {
  const { items, loadItems } = useFirebaseCollection("bannerhighlights");
  const [showIndex, setShowIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const timerID = useRef(null);

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (items && items.length) {
      setBanners(items.filter(banner => banner.isActive));
      setShowIndex(0); // Reset index when new items are loaded
    }
  }, [items]);

  useEffect(() => {
    if (banners.length) {
      forceChangeBanner(showIndex);
    }

    return () => {
      clearTimeout(timerID.current); // Clear timer on component unmount or when banners change
    };
  }, [banners, showIndex]);

  const forceChangeBanner = (index) => {
    clearTimeout(timerID.current);
    timerID.current = setTimeout(autoChangeBanner, 6000); // Uncommented this line
  }

  const autoChangeBanner = () => {
    setShowIndex((prevIndex) => (prevIndex + 1) % banners.length);
  }

  const bannerRow = () =>
    banners.map((content, index) => (
      <Flex
        key={index}
        opacity={index === showIndex ? 1 : 0}
        w="100%"
        h={540}
        transition="opacity 2s ease-in-out"
        direction="column"
        justify="center"
        grow="1"
        bg={`url(${content.image[0]?.downloadURL || '/homepage_banner_background_2.jpeg'})`}
        bgSize="cover"
        bgPosition="center"
        display={index === showIndex ? 'flex' : 'none'}
      >
        <Flex direction="column" alignSelf="center" w={{ base: "100vw", md: "80vw", lg: "1160px"}}>
          <Text variant="robotoNormalTitle" align="center" color="#FFFFFF">{content.title || 'Exclusive Property'}</Text>
          <Text variant="robotoCarouselTitle" align="center" color="#FFFFFF">{content.headline || 'ORLA'}</Text>
          <Text variant="robotoNormalTitle" align="center" color="#FFFFFF">{content.subheading || 'Palm Jumeirah'}</Text>
          <Button alignSelf="center" variant="bright" as="a" href={content.ctaLink || "/property?reference=NS-S-004"} mt={16}>
            {content.cta ? content.cta.toUpperCase() : 'Learn More'}
          </Button>
        </Flex>
      </Flex>
    ));

  return (
    <Flex maxW='100vw' height="540px" p={0} overflow="hidden" direction="column">
      {bannerRow()}
      <Flex justify="center" align="center" mt={-10}>
        {banners && banners.length && banners.map((item, idx) => (
          <Button
            p={0}
            m={2}
            variant="carousel"
            key={idx}
            backgroundColor={showIndex === idx ? "#D9D9D9" : "#6A6A6A"}
            w={showIndex === idx ? "12px" : "8px"}
            h={showIndex === idx ? "12px" : "8px"}
            onClick={() => setShowIndex(idx)}
          ></Button>
        ))}
      </Flex>
    </Flex>
  );
}