// agent/page.jsx (server component)
import { Suspense } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import AgentProfile from '../components/agent_profile';

export default function AgentPage() {
  return (
    <Suspense fallback={
      <Flex direction="column" justify="center" align="center" minH="100vh" bg="#FDF9F3">
        <Text>Loading agent profile...</Text>
      </Flex>
    }>
      <AgentProfile />
    </Suspense>
  );
}