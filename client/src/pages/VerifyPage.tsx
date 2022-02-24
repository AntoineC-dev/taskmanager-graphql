import { Center, Heading, Spinner, useToast, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyQuery } from "../graphql";
import { APP_ROUTES } from "../navigation";

export const VerifyPage = () => {
  const { id, verificationCode } = useParams();
  const variables = { id: String(id), verificationCode: String(verificationCode) };
  const toast = useToast();
  const navigate = useNavigate();
  useVerifyQuery(variables, {
    onCompleted: (data) => {
      toast({
        title: "Account verified",
        description: data,
        status: "success",
        isClosable: true,
      });
      navigate(APP_ROUTES.login);
    },
    onError: (_) => navigate(APP_ROUTES.login),
  });
  return (
    <Center h="100vh">
      <VStack spacing={12}>
        <Heading size="lg">Sending verification request...</Heading>
        <Spinner size="xl" thickness="4px" speed="0.8s" />
      </VStack>
    </Center>
  );
};
