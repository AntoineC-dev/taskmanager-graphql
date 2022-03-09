import { Center, Code, Link, Text, VStack } from "@chakra-ui/react";
import { ChevronRightIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { RotatingLogo, RouterButton } from "../../components";
import { APP_ROUTES, GITHUB_LINK } from "../../navigation";

export const HomePage = () => {
  return (
    <Center h="100%">
      <VStack spacing={8}>
        <RotatingLogo h="40vmin" pointerEvents="none" />
        <Text fontSize="xl">
          Welcome on my <Code fontSize="inherit">Graphql / React</Code> task manager.
        </Text>
        <Text fontSize="lg">
          You can find the source code as well as the API on my{" "}
          <Link href={GITHUB_LINK} isExternal textDecor="underline">
            Github
            <ExternalLinkIcon mx="4px" />
          </Link>
        </Text>
        <RouterButton to={APP_ROUTES.register} textTransform="uppercase" rightIcon={<ChevronRightIcon />}>
          Start the Process
        </RouterButton>
      </VStack>
    </Center>
  );
};
