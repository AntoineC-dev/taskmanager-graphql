import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export const SendVerificationEmailModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Send verification email</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form">
          <ModalHeader>Send verification mail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Modal Body</Text>
          </ModalBody>
          <ModalFooter>
            <Button>Send email</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
