import { Center, Code, Grid, GridItem, Heading, HStack, Spinner, StackDivider, Text, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTasksQuery } from "../../hooks";
import { TaskItem } from "./TaskItem";

interface DashboardProps {
  username: string;
}

export const Dashboard = ({ username }: DashboardProps) => {
  const { data, loading } = useTasksQuery();
  const tasks = useMemo(() => data?.tasks ?? [], [data?.tasks]);
  if (loading)
    return (
      <Center h="100%">
        <Spinner size="xl" thickness="4px" speed="0.8s" />
      </Center>
    );
  return (
    <Grid h="100%" templateRows="auto 1fr" gap={4}>
      <GridItem rowSpan={1} as={HStack} justifyContent="space-between">
        <Heading as="h2" size="md">
          Manage your Tasks
        </Heading>
        <Text fontSize="sm">
          Welcome back - <Code fontSize="inherit">{username}</Code>
        </Text>
      </GridItem>
      <GridItem rowSpan={1}>
        {tasks.length === 0 ? (
          <Center h="100%">
            <Heading size="md">No task created yet...</Heading>
          </Center>
        ) : (
          <Center h="100%">
            <VStack divider={<StackDivider />} w="100%" maxW="container.md">
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task} w="100%" />
              ))}
            </VStack>
          </Center>
        )}
      </GridItem>
    </Grid>
  );
};
