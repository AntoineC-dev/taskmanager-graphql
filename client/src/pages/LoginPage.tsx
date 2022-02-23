import { Button, Code, Heading, VStack } from "@chakra-ui/react";
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
  const [loginUser, { loading }] = useLoginMutation();
  const onSubmit = (formData: LoginFormInput) => {
    loginUser({
      variables: formData,
    }).then(({ data }) => {
      if (data) {
        console.log(data);
        // TODO: navigate to login page
        console.log("Navigate to dashboard page");
      }
    });
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
