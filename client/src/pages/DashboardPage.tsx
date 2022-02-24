import { Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useMeQuery } from "../hooks";

export const DashboardPage = () => {
  const { data, loading } = useMeQuery();
  return (
    <VStack spacing={8}>
      {loading ? (
        <Spinner size="xl" thickness="4px" speed="0.8s" />
      ) : (
        <>
          <Heading>Dashboard</Heading>
          <Text>{`Id: ${data?.me.id}`}</Text>
          <Text>{`Username: ${data?.me.username}`}</Text>
          <Text>{`Email: ${data?.me.email}`}</Text>
        </>
      )}
    </VStack>
  );
};
