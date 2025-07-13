'use client'
import { useState, useEffect } from 'react'
import { Box, Text } from '@chakra-ui/react'
import Link from 'next/link'

export default function MagazineArticleTile({ article, featured, vspace = "4", mobileTile = false, desktopPrimary = false, desktopSecondary = false, desktopTertiary = false }) {
  const [imageURL, setImageURL] = useState("url('/villa_placeholder_3.jpeg')");
  useEffect(() => {
    if (article && article.slug && article.tileImage) {
      setImageURL("url('" + article.tileImage[0].downloadURL + "')");
    }    
  }, [article]);

  return (
    <Link href={`/magazine/${article.slug}`}>
      {article && mobileTile && <Box 
        w="280px"
        mx="12px"
        my={vspace}
        >
        <Box bg={imageURL} bgSize="cover" w="280px" h="220px"></Box>
        {article && (
          <Box textAlign="left" minW="240" my={4}>
            <Text my={2} variant="blackSubtitle" fontWeight="600">{article.category}</Text>
            <Text my={2} variant="tileItemTitle">{article.title}</Text>
            
            <Text my={1} variant="tileItemText" noOfLines={3}>{article.excerpt}</Text>
            <Text my={2} variant="blackSubtitle" fontWeight="600">{article.readingTime}{" minutes read"}</Text>
          </Box>
        )}
        
      </Box>}
      {desktopPrimary && <Box 
        w="560px"
        mr="26px"
        my={vspace}
        p={2}
        _hover={{
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 5px",
          borderRadius: "2px",
        }}>
        <Box bg={imageURL} bgSize="cover" w="544px" h="580px"></Box>
        {article && (
          <Box textAlign="left" minW="240" my={4}>
            <Text my={2} variant="blackSubtitle" fontWeight="600">{article.category}</Text>
            <Text my={2} variant="robotoDevTileTitle">{article.title}</Text>
            
            <Text my={2} noOfLines={3}>{article.excerpt}</Text>
            <Text my={2} variant="blackSubtitle" fontWeight="600">{article.readingTime}{" minutes read"}</Text>
          </Box>
        )}
        
      </Box>}
      {desktopSecondary && <Box 
        w="330px"
        my={vspace}
        p={2}
        _hover={{
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 5px",
          borderRadius: "2px",
        }}>
        <Box bg={imageURL} bgSize="cover" w="316px" h="200px"></Box>
        {article && (
          <Box textAlign="left" minW="240" my={4}>
            <Text my={2} variant="blackSubtitle" fontWeight="600">{article.category}</Text>
            <Text my={2} variant="robotoDevTileTitle">{article.title}</Text>
            
            <Text my={2} noOfLines={3}>{article.excerpt}</Text>
            <Text my={2} variant="blackSubtitle" fontWeight="600">{article.readingTime}{" minutes read"}</Text>
          </Box>
        )}
        
      </Box>}
      {desktopTertiary && <Box 
        w="290px"
        mx="12px"
        my={vspace}
        p={2}
        _hover={{
          boxShadow: "rgb(0 0 0 / 10%) 0px 0px 10px 5px",
          borderRadius: "2px",
        }}>
        <Box bg={imageURL} bgSize="cover" w="274px" h="380px"></Box>
        {article && (
          <Box textAlign="left" minW="240" my={4}>
            <Text my={2} variant="blackSubtitle" fontWeight="600">{article.category}</Text>
            <Text my={2} variant="robotoDevTileTitle">{article.title}</Text>
            
            <Text my={2} noOfLines={3}>{article.excerpt}</Text>
            <Text my={2} variant="blackSubtitle" fontWeight="600">{article.readingTime}{" minutes read"}</Text>
          </Box>
        )}
        
      </Box>}
    </Link>
  )
}