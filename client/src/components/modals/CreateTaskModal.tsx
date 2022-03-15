import { gql } from "@apollo/client";
import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useCreateTaskMutation, useResolverForm } from "../../hooks";
import { CORE_TASK_FIELDS } from "../../models";
import { CreateTaskInput, createTaskSchema } from "../../validators";
import { HookFormInput } from "../HookFormInput";

export const CreateTaskModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { control, handleSubmit, reset } = useResolverForm<CreateTaskInput>({
    schema: createTaskSchema,
    defaultValues: { title: "" },
  });
  const onCloseReset = () => {
    reset();
    onClose();
  };
  const [create] = useCreateTaskMutation({
    update(cache, { data }) {
      cache.modify({
        fields: {
          tasks(existingTasks = []) {
            const newTaskRef = cache.writeFragment({
              data: data?.createTask,
              fragment: CORE_TASK_FIELDS,
            });
            return [...existingTasks, newTaskRef];
          },
        },
      });
    },
    onCompleted: (_) => onCloseReset(),
    onError: (_) => onCloseReset(),
  });
  const onSubmit = (variables: CreateTaskInput) => create({ variables });
  return (
    <>
      <IconButton
        aria-label="create new task"
        onClick={onOpen}
        size="md"
        fontSize="lg"
        variant="solid"
        color="current"
        icon={<PlusSquareIcon />}
        pos="absolute"
        right="4"
        bottom="4"
      />

      <Modal isOpen={isOpen} onClose={onCloseReset}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HookFormInput control={control} name="title" />
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Create task</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
