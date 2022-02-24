import { Center, Heading, Spinner, useToast, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyQuery } from "../hooks";
import { APP_ROUTES } from "../navigation";

export const VerifyPage = () => {
  const { id, verificationCode } = useParams();
  const toast = useToast();
  const navigate = useNavigate();
  useVerifyQuery(
    { id: id!, verificationCode: verificationCode! },
    {
      onCompleted: ({ verify }) => {
        toast({
          title: "Account verified",
          description: verify,
          status: "success",
          isClosable: true,
        });
        navigate(APP_ROUTES.login);
      },
      onError: (_) => navigate(APP_ROUTES.login),
    }
  );
  return (
    <Center h="100vh">
      <VStack spacing={12}>
        <Heading size="lg">Sending verification request...</Heading>
        <Spinner size="xl" thickness="4px" speed="0.8s" />
      </VStack>
    </Center>
  );
};
