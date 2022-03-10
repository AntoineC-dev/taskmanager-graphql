import { Center, Code, Grid, GridItem, Heading, HStack, Text } from "@chakra-ui/react";
import { Task } from "../../models";

interface DashboardProps {
  username: string;
  tasks: Task[];
}

export const Dashboard = ({ tasks, username }: DashboardProps) => {
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
            <Heading>No task created yet...</Heading>
          </Center>
        ) : (
          <>
            <Heading>All tasks</Heading>
            {tasks.map((task) => (
              <Text>{task.title}</Text>
            ))}
          </>
        )}
      </GridItem>
    </Grid>
  );
};
