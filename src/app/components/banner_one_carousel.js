'use client'
import { useState, useEffect, useRef } from 'react';
import { Flex, Text, Button } from '@chakra-ui/react';
import { useBannerHighlights } from '../../utils/useCMSHooks'; // Adjust the import path as needed

export default function BannerCarousel() {
  const { data: banners = [], isLoading } = useBannerHighlights();
  const [showIndex, setShowIndex] = useState(0);
  const timerID = useRef(null);

  useEffect(() => {
    if (banners.length) {
      setShowIndex(0); // Reset index when new banners are loaded
      forceChangeBanner(0);
    }

    return () => {
      clearTimeout(timerID.current); // Clear timer on component unmount
    };
  }, [banners]);

  const forceChangeBanner = (index) => {
    clearTimeout(timerID.current);
    timerID.current = setTimeout(autoChangeBanner, 6000);
  };

  const autoChangeBanner = () => {
    setShowIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const bannerRow = () =>
    banners
      .filter(banner => banner.isActive)
      .map((content, index) => (
        <Flex
          key={index}
          opacity={index === showIndex ? 1 : 0}
          w="100%"
          h={540}
          transition="opacity 2s ease-in-out"
          direction="column"
          justify="center"
          grow="1"
          bg={`${content.image}`}
          bgSize="cover"
          bgPosition="center"
          display={index === showIndex ? 'flex' : 'none'}
        >
          <Flex direction="column" alignSelf="center" w={{ base: "100vw", md: "80vw", lg: "1160px"}}>
            <Text variant="robotoNormalTitle" align="center" color="#FFFFFF">{content.title}</Text>
            <Text variant="robotoCarouselTitle" align="center" color="#FFFFFF">{content.headline}</Text>
            <Text variant="robotoNormalTitle" align="center" color="#FFFFFF">{content.subheading}</Text>
            <Button alignSelf="center" variant="bright" as="a" href={content.ctaLink} mt={16}>
              {content.cta ? content.cta.toUpperCase() : 'Learn More'}
            </Button>
          </Flex>
        </Flex>
      ));

  if (isLoading) {
    return <Flex justify="center" align="center" h="540px">Loading...</Flex>;
  }

  return (
    <Flex maxW='100vw' height="540px" p={0} overflow="hidden" direction="column">
      {bannerRow()}
      <Flex justify="center" align="center" mt={-10}>
        {banners && banners.length && banners
          .filter(banner => banner.isActive)
          .map((item, idx) => (
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