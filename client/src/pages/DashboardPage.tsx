import { Center, Heading, IconButton, Spinner, Tooltip } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { useMeQuery } from "../hooks";
import { Dashboard } from "../components";

export const DashboardPage = () => {
  const { data, loading } = useMeQuery();
  if (loading)
    return (
      <Center h="100%">
        <Spinner size="xl" thickness="4px" speed="0.8s" />
      </Center>
    );
  return data ? (
    <>
      <Dashboard username={data.me.username} tasks={data.me.tasks} />
      <Tooltip label="Create a new task">
        <IconButton
          aria-label="create new task"
          size="md"
          fontSize="lg"
          variant="solid"
          color="current"
          icon={<PlusSquareIcon />}
          pos="absolute"
          right="4"
          bottom="4"
        />
      </Tooltip>
    </>
  ) : (
    <Center h="100%">
      <Heading>We could not access the server... Please contact the support!</Heading>
    </Center>
  );
};
