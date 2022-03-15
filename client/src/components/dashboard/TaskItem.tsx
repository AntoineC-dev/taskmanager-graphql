import { DeleteIcon } from "@chakra-ui/icons";
import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
  StackDivider,
  StackProps,
  Switch,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDeleteTaskMutation, useToggleTaskMutation, useUpdateTaskMutation } from "../../hooks";
import { Task } from "../../models";

interface TaskItemProps extends Omit<StackProps, "divider"> {
  task: Task;
}

export const TaskItem = ({ task, ...props }: TaskItemProps) => {
  const [title, setTitle] = useState(task.title);
  const [deleteTask] = useDeleteTaskMutation({ variables: { id: task.id } });
  const [toggleTask] = useToggleTaskMutation({ variables: { id: task.id } });
  const [updateTask] = useUpdateTaskMutation();
  const onSubmit = (next: string) => {
    const trimmed = next.trim();
    if (trimmed.length === 0 || trimmed === task.title) {
      setTitle(task.title);
      return;
    }
    updateTask({ variables: { id: task.id, title: trimmed } });
  };
  return (
    <HStack divider={<StackDivider />} {...props}>
      <Switch isChecked={task.completed} onChange={() => toggleTask()} />
      <Editable
        flex={1}
        fontSize="lg"
        defaultValue={task.title}
        value={title}
        onChange={(next) => setTitle(next)}
        onSubmit={onSubmit}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <IconButton
        aria-label={`delete ${task.title}`}
        onClick={() => deleteTask()}
        icon={<DeleteIcon />}
        variant="ghost"
        color="current"
      />
    </HStack>
  );
};
