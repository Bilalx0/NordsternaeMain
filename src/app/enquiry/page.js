// enquiry/page.jsx
import { Suspense } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import EnquiryForm from '../components/enquiry_form';

export default function EnquiryPage() {
  return (
    <Suspense fallback={
      <Flex direction="column" justify="center" align="center" minH="100vh" bg="#FDF9F3">
        <Text>Loading enquiry form...</Text>
      </Flex>
    }>
      <EnquiryForm />
    </Suspense>
  );
}