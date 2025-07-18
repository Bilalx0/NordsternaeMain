// enquiry/page.jsx
import { Suspense } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import PropertyDetailPage from '../components/property_detail_page';

export default function PropertyPage() {
  return (
    <Suspense fallback={
      <Flex direction="column" justify="center" align="center" minH="100vh" bg="#FDF9F3">
        <Text>Loading enquiry form...</Text>
      </Flex>
    }>
      <PropertyDetailPage />
    </Suspense>
  );
}