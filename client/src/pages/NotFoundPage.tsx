import { Center, Code, Heading, Text, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { RouterButton } from "../components";
import { APP_ROUTES } from "../navigation";

export const NotFoundPage = () => {
  const location = useLocation();
  return (
    <Center h="100vh">
      <VStack maxW="container.sm" w="100%" spacing={12}>
        <Heading size="lg">Oops! Page not found...</Heading>
        <Text fontSize="sm">
          The page with url: <Code fontSize="inherit">{location.pathname}</Code> does not exist
        </Text>
        <RouterButton to={APP_ROUTES.home}>Go to Homepage</RouterButton>
      </VStack>
    </Center>
  );
};
