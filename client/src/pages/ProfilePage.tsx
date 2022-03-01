import { Center, Grid, GridItem, Heading, Spinner, Text, VStack } from "@chakra-ui/react";
import { useMeQuery } from "../hooks";

export const ProfilePage = () => {
  const { data, loading } = useMeQuery();
  if (loading)
    return (
      <Center h="100%">
        <Spinner size="xl" thickness="4px" speed="0.8s" />
      </Center>
    );
  return (
    <Grid h="100%" templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)">
      <GridItem as={Center} colSpan={1}>
        <VStack>
          <Heading as="h3" size="md">
            Update username:
          </Heading>
          <Text>{data?.me.username}</Text>
        </VStack>
      </GridItem>
      <GridItem as={Center} colSpan={1}>
        <VStack>
          <Heading as="h3" size="md">
            Email:
          </Heading>
          <Text>{data?.me.email}</Text>
        </VStack>
      </GridItem>
      <GridItem as={Center} colSpan={2}>
        <VStack>
          <Heading as="h3" size="md">
            Password:
          </Heading>
        </VStack>
      </GridItem>
    </Grid>
  );
};
