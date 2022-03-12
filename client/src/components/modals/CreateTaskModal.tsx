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
  useToast,
} from "@chakra-ui/react";
import { ME_QUERY } from "../../graphql";
import { useCreateTaskMutation, useResolverForm } from "../../hooks";
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
  const toast = useToast();
  const [create] = useCreateTaskMutation({
    refetchQueries: [ME_QUERY],
    onCompleted: ({ createTask }) => {
      toast({ ...createTask, status: "success", isClosable: true });
      onCloseReset();
    },
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
