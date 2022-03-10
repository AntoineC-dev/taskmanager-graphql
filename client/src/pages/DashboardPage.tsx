import { Center, Heading, Spinner } from "@chakra-ui/react";
import { useMeQuery } from "../hooks";
import { CreateTaskModal, Dashboard } from "../components";

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
      <CreateTaskModal />
    </>
  ) : (
    <Center h="100%">
      <Heading>We could not access the server... Please contact the support!</Heading>
    </Center>
  );
};
