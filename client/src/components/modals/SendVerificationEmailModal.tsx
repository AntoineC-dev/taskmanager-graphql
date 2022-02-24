import {
  Button,
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
import { EmailIcon } from "@chakra-ui/icons";
import { useResolverForm, useSendVerificationEmailLazyQuery } from "../../hooks";
import { EmailFormInput, emailFormSchema } from "../../validators";
import { HookFormInput } from "../HookFormInput";

export const SendVerificationEmailModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { control, handleSubmit, reset } = useResolverForm<EmailFormInput>({
    schema: emailFormSchema,
    defaultValues: { email: "" },
  });
  const onCloseReset = () => {
    reset();
    onClose();
  };
  const toast = useToast();
  const [sendEmail] = useSendVerificationEmailLazyQuery({
    onCompleted: ({ sendVerificationEmail }) => {
      toast({ title: sendVerificationEmail, status: "success", isClosable: true });
      onCloseReset();
    },
    onError: (_) => onCloseReset(),
  });
  const onSubmit = (variables: EmailFormInput) => sendEmail({ variables });
  return (
    <>
      <Button onClick={onOpen} variant="ghost" size="sm" rightIcon={<EmailIcon />}>
        Send verification email
      </Button>
      <Modal isOpen={isOpen} onClose={onCloseReset}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Send verification mail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HookFormInput control={control} name="email" type="email" />
          </ModalBody>
          <ModalFooter>
            <Button type="submit">Send email</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
