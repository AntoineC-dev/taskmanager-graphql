import { DeleteIcon } from "@chakra-ui/icons";
import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
  Spacer,
  StackProps,
  Switch,
} from "@chakra-ui/react";
import { ME_QUERY } from "../../graphql";
import { useDeleteTaskMutation } from "../../hooks";
import { useToggleTaskMutation } from "../../hooks/mutations/useToggleTaskMutation";
import { Task } from "../../models";

interface TaskItemProps extends Omit<StackProps, "divider"> {
  task: Task;
}

export const TaskItem = ({ task, ...props }: TaskItemProps) => {
  const [deleteTask] = useDeleteTaskMutation({ variables: { id: task.id }, refetchQueries: [ME_QUERY] });
  const [toggleTask] = useToggleTaskMutation({ variables: { id: task.id }, refetchQueries: [ME_QUERY] });
  return (
    <HStack spacing={4} {...props}>
      <Switch isChecked={task.completed} onChange={() => toggleTask()} />
      <Editable defaultValue={task.title}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Spacer />
      <IconButton
        aria-label={`delete ${task.title}`}
        onClick={() => deleteTask()}
        icon={<DeleteIcon />}
        size="sm"
        variant="ghost"
        color="current"
      />
    </HStack>
  );
};
