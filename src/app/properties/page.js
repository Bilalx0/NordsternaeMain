import { Suspense } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import TotalProperties from '../components/total_properties';

export default function PropertiesPage() {
  return (
    <Suspense fallback={
        <Flex direction="column" justify="center" align="center" h="100vh">
            <Text>Loading property filters...</Text> 
        </Flex>
    }>
      <TotalProperties />
    </Suspense>
  );
}