import { Button, Code, Heading, useToast, VStack } from "@chakra-ui/react";
import { LoginFormInput, loginFormSchema } from "../validators";
import { HookFormInput } from "../components";
import { useLoginMutation } from "../graphql";
import { useResolverForm } from "../hooks";

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
    onCompleted: ({ login }) => {
      toast({ title: login.message, status: "success", isClosable: true });
      localStorage.setItem("token", login.accessToken);
      localStorage.setItem("refresh", login.refreshToken);
      // TODO: navigate to dashboard
    },
  });
  const onSubmit = (formData: LoginFormInput) => {
    loginUser({ variables: formData });
  };

  return (
    <VStack as="form" maxW="container.sm" w="100%" justifySelf="center" spacing={4} onSubmit={handleSubmit(onSubmit)}>
      <Heading>Login to your Account</Heading>
      <Code fontSize="md" px="2">
        GQLMutation: LOGIN_MUTATION
      </Code>
      <HookFormInput control={control} name="email" type="email" />
      <HookFormInput control={control} name="password" type="password" />
      <Button type="submit" disabled={loading}>
        Register Now
      </Button>
    </VStack>
  );
};
