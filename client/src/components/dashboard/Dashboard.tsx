import { MinusIcon } from "@chakra-ui/icons";
import {
  Center,
  Code,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  StackDivider,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { ME_QUERY } from "../../graphql";
import { useDeleteTaskMutation } from "../../hooks";
import { Task } from "../../models";

interface DashboardProps {
  username: string;
  tasks: Task[];
}

export const Dashboard = ({ tasks, username }: DashboardProps) => {
  const toast = useToast();
  const [delTask] = useDeleteTaskMutation({
    onCompleted: ({ deleteTask }) => {
      toast({ ...deleteTask, status: "success", isClosable: true });
    },
    refetchQueries: [ME_QUERY],
  });
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
            <VStack divider={<StackDivider />}>
              {tasks.map((task) => (
                <HStack key={task.id} divider={<StackDivider />}>
                  <Text>{`${task.title} - ${task.description}`}</Text>
                  <IconButton
                    aria-label={`delete ${task.title}`}
                    onClick={() => delTask({ variables: { id: task.id } })}
                    icon={<MinusIcon />}
                    size="sm"
                    variant="ghost"
                    color="current"
                  />
                </HStack>
              ))}
            </VStack>
          </Center>
        )}
      </GridItem>
    </Grid>
  );
};
