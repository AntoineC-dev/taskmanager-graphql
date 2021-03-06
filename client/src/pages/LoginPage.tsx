import { Button, Center, Code, Heading, HStack, StackDivider, useToast, VStack } from "@chakra-ui/react";
import { LoginFormInput, loginFormSchema } from "../validators";
import { HookFormInput, ResetCodeEmailModal, VerificationEmailModal } from "../components";
import { useLoginMutation, useResolverForm } from "../hooks";
import { login } from "../utils";

export const LoginPage = () => {
  const { control, handleSubmit } = useResolverForm<LoginFormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    schema: loginFormSchema,
  });
  const toast = useToast();
  const [loginUser, { loading }] = useLoginMutation({
    onCompleted: ({ login: { message, ...tokens } }) => {
      login(tokens);
      toast({ ...message, status: "success", isClosable: true });
    },
  });
  const onSubmit = (formData: LoginFormInput) => {
    loginUser({ variables: formData });
  };

  return (
    <Center h="100%">
      <VStack maxW="container.sm" w="100%" justifySelf="center" spacing={4}>
        <Heading>Login to your Account</Heading>
        <Code fontSize="md" px="2">
          GQLMutation: LOGIN_MUTATION
        </Code>
        <VStack as="form" w="100%" onSubmit={handleSubmit(onSubmit)}>
          <HookFormInput control={control} name="email" type="email" />
          <HookFormInput control={control} name="password" type="password" />
          <Button type="submit" disabled={loading}>
            Register Now
          </Button>
        </VStack>
        <HStack divider={<StackDivider />}>
          <VerificationEmailModal />
          <ResetCodeEmailModal />
        </HStack>
      </VStack>
    </Center>
  );
};
